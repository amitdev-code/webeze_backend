import { EmailAlreadyExistException } from '@exceptions/commonExceptions/EmailAlreadyExistException';
import { PhoneAlredyExistException } from '@exceptions/commonExceptions/PhoneAlredyExistException';
import { Injectable } from '@nestjs/common';
import { UsersEntity } from '@users_modules/entity/user.entity';
import { UsersService } from '@users_modules/providers/users.service';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { GeneralHelperFunctions } from '@common/helper/generalHelperFunctions';
import { RegisterDto } from '@auth_modules/dto/register.dto';

@Injectable()
export class UserHelperService {
  constructor(
    private readonly userservice: UsersService,
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  async validateUserByEmailOrPhone(data: {
    validate: string;
    email?: string;
    phone?: string;
  }) {
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
        return [caseBothEmailData, caseBothPhoneData];
      default:
        break;
    }
  }

  async createUser(
    data: RegisterDto,
    ip: string,
    timezone: string,
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
    return await this.dataSource.getRepository(UsersEntity).save(user);
  }
}
