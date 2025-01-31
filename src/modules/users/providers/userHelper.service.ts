import { EmailAlreadyExistException } from '@exceptions/commonExceptions/EmailAlreadyExistException';
import { PhoneAlredyExistException } from '@exceptions/commonExceptions/PhoneAlredyExistException';
import { Injectable } from '@nestjs/common';
import { UsersEntity } from '@users_modules/entity/user.entity';
import { UsersService } from '@users_modules/providers/users.service';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource, QueryRunner } from 'typeorm';
import { GeneralHelperFunctions } from '@common/helper/generalHelperFunctions';
import { RegisterDto } from '@auth_modules/dto/register.dto';
import { UserSession } from '@users_modules/entity/userSession.entity';
import { DateFormatterHelperFunction } from '@common/helper/DateFormatterHelperFunction';
import { CreateUserSessionDto } from '@users_modules/dto/createUserSession.dto';
import { VerificationType } from '@constants/verification-type';
import { UserVerificationEntity } from '@users_modules/entity/userVerification.entity';

@Injectable()
export class UserHelperService {
  constructor(
    private readonly userservice: UsersService,
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  /**
   * Validates a user by email or phone.
   * @param {Object} data - The data to validate.
   * @param {string} data.validate - The type of validation ('email', 'phone', or 'both').
   * @param {string} [data.email] - The email to validate.
   * @param {string} [data.phone] - The phone number to validate.
   * @returns {Promise<UsersEntity | UsersEntity[] | null>} The validated user data.
   * @throws {EmailAlreadyExistException} If the email already exists.
   * @throws {PhoneAlredyExistException} If the phone number already exists.
   */
  async validateUserByEmailOrPhone(data: {
    validate: string;
    email?: string;
    phone?: string;
  }): Promise<UsersEntity | UsersEntity[] | null> {
    const validateEmail = async (): Promise<
      UsersEntity | UsersEntity[] | null
    > => {
      // CHECK IF USER EXISTS
      const emailExist = await this.userservice.findOneByEmail(data.email);
      if (emailExist) {
        throw new EmailAlreadyExistException();
      }
      return emailExist;
    };

    const validatePhone = async () => {
      // CHECK IF ANY USER EXISTS WITH THE SAME PHONE NUMBER
      const phoneExist = await this.userservice.findOneByPhone(data.phone);
      if (phoneExist && phoneExist.useremail.email !== data.email) {
        throw new PhoneAlredyExistException();
      }
      return phoneExist;
    };

    switch (data.validate) {
      case 'email':
        const emailData = await validateEmail();
        return emailData;
      case 'phone':
        const phoneData = await validatePhone();
        return phoneData;
      case 'both':
        const caseBothEmailData = await validateEmail();
        const caseBothPhoneData = await validatePhone();
        return caseBothEmailData && caseBothPhoneData
          ? [
              caseBothEmailData,
              ...(Array.isArray(caseBothPhoneData)
                ? caseBothPhoneData
                : [caseBothPhoneData]),
            ]
          : null;
      default:
        break;
    }
  }

  /**
   * Creates a new user.
   * @param {RegisterDto} data - The user registration data.
   * @param {string} ip - The IP address of the user.
   * @param {string} timezone - The timezone of the user.
   * @returns {Promise<UsersEntity>} The created user.
   */
  async createUser(
    data: RegisterDto,
    ip: string,
    timezone: string,
    queryRunner: QueryRunner,
  ): Promise<UsersEntity> {
    // CREATE USER ACCOUNT
    const user = new UsersEntity();
    user.useremail = {
      email: data.email,
      is_verified: false,
      is_primary: true,
      webeze_newsletter: true,
    };
    user.password = await GeneralHelperFunctions.generateSaltedPassword(
      data.password,
    );
    user.trusted_ip_address = [
      {
        ip,
        trusted: true,
      },
    ];
    user.timezone = timezone;
    return await queryRunner.manager.save(user);
  }

  /**
   * Updates the user's refresh token.
   * @param {string} user_id - The ID of the user.
   * @param {string} refreshToken - The new refresh token.
   * @returns {Promise<void>}
   */
  async updateUserRefreshToken(
    user_id: string,
    refreshToken: string,
  ): Promise<void> {
    // UPDATE USER REFRESH TOKEN
    await this.dataSource.getRepository(UserSession).update(user_id, {
      refresh_token: {
        token: refreshToken,
        expiry:
          refreshToken !== null &&
          DateFormatterHelperFunction.addDaysToCurrentTimestamp(7),
      },
    });
  }

  /**
   * Updates the user's refresh token.
   * @param {string} user_id - The ID of the user.
   * @param {string} refreshToken - The new refresh token.
   * @returns {Promise<void>}
   */
  async updateUserAuthToken(
    createUserSessionDto: CreateUserSessionDto,
  ): Promise<UserSession> {
    // UPDATE USER REFRESH TOKEN
    // TODO: Check if the user session exists before updating it. If session is created with different ip address, then create a new session.and send alert main to user.
    await this.dataSource
      .getRepository(UserSession)
      .update(createUserSessionDto.user_id, {
        refresh_token: {
          token: createUserSessionDto.refreshToken,
          expiry:
            createUserSessionDto.refreshToken !== null &&
            DateFormatterHelperFunction.addDaysToCurrentTimestamp(7),
        },
        session_token: {
          token: createUserSessionDto.sessionToken,
          expiry:
            createUserSessionDto.sessionToken !== null &&
            DateFormatterHelperFunction.addHoursToCurrentTimestamp(1),
        },
        ip: createUserSessionDto.ip,
        user_agent: createUserSessionDto.user_agent,
      });

    return await this.dataSource.getRepository(UserSession).findOne({
      where: {
        user_id: createUserSessionDto.user_id,
        ip: createUserSessionDto.ip,
      },
    });
  }

  /**
   * Creates a new user session.
   * @param {CreateUserSessionDto} createUserSessionDto - The user session data.
   * @returns {Promise<UserSession>} The created user session.
   */
  async createUserSession(
    createUserSessionDto: CreateUserSessionDto,
    queryRunner: QueryRunner,
  ): Promise<UserSession> {
    // CREATE USER SESSION
    const userSession = new UserSession();
    userSession.user_id = createUserSessionDto.user_id;
    userSession.ip = createUserSessionDto.ip;
    userSession.session_token = {
      token: createUserSessionDto.sessionToken,
      expiry: DateFormatterHelperFunction.addHoursToCurrentTimestamp(1),
    };
    userSession.refresh_token = {
      token: createUserSessionDto.refreshToken,
      expiry: DateFormatterHelperFunction.addDaysToCurrentTimestamp(7),
    };
    userSession.user_agent = createUserSessionDto.user_agent;
    return await queryRunner.manager.save(userSession);
  }

  /**
   * Revokes all user sessions.
   * @param {string} user_id - The ID of the user.
   * @returns {Promise<void>}
   */
  async revokeAllUserSession(user_id: string): Promise<void> {
    // REVOKE ALL USER SESSION
    await this.dataSource
      .getRepository(UserSession)
      .createQueryBuilder()
      .delete()
      .where('user_id = :user_id', { user_id })
      .execute();
  }

  /**
   * Revokes a specific user session.
   * @param {string} user_id - The ID of the user.
   * @param {string} session_id - The ID of the session to revoke.
   * @returns {Promise<void>}
   */
  async revokeSpecificUserSession(
    user_id: string,
    session_id: string,
  ): Promise<void> {
    // REVOKE SPECIFIC USER SESSION
    await this.dataSource
      .getRepository(UserSession)
      .createQueryBuilder()
      .delete()
      .where('user_id = :user_id', { user_id })
      .andWhere('id = :session_id', { session_id })
      .execute();
  }

  async createUserVerificationToken(
    user: UsersEntity,
    token: string,
    otp: string,
  ) {
    const verificationToken = new UserVerificationEntity();
    verificationToken.user_id = user.id;
    verificationToken.verification_code = otp;
    verificationToken.verification_token = token;
    verificationToken.verification_type = VerificationType.TWO_FACTOR_AUTH;
    return await this.dataSource
      .getRepository(UserVerificationEntity)
      .save(verificationToken);
  }
}
