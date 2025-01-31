import { UserNotFoundException } from '@exceptions/userExceptions/userNotFoundException';
import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { UsersEntity } from '@users_modules/entity/user.entity';
import { UserVerificationEntity } from '@users_modules/entity/userVerification.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  /**
   * Fetches all user entities from the database.
   * @returns {Promise<UsersEntity[]>} A promise that resolves to an array of all user entities.
   */
  async findAll(): Promise<UsersEntity[]> {
    return await this.dataSource.getRepository(UsersEntity).find();
  }

  /**
   * Fetches a user entity by its unique identifier.
   * @param {string} id - The unique identifier of the user.
   * @returns {Promise<UsersEntity>} A promise that resolves to the user entity with the given ID.
   */
  async findOneById(id: string): Promise<UsersEntity> {
    return await this.dataSource
      .getRepository(UsersEntity)
      .findOne({ where: { id } });
  }

  /**
   * Fetches a user entity by its email address.
   * Uses a query builder to perform a custom query on the database.
   * @param {string} email - The email address of the user.
   * @returns {Promise<UsersEntity | null>} A promise that resolves to the user entity with the given email, or null if not found.
   */
  async findOneByEmail(email: string): Promise<UsersEntity | null> {
    return this.dataSource
      .getRepository(UsersEntity)
      .createQueryBuilder('user')
      .where("user.useremail ->> 'email' = :email", { email }) // Filters by the 'email' key in the 'useremail' JSON column.
      .getOne();
  }

  /**
   * Fetches a user entity by its phone number.
   * Uses a query builder to perform a custom query on the database.
   * @param {string} phone - The phone number of the user.
   * @returns {Promise<UsersEntity | null>} A promise that resolves to the user entity with the given phone, or null if not found.
   */
  async findOneByPhone(phone: string): Promise<UsersEntity | null> {
    return this.dataSource
      .getRepository(UsersEntity)
      .createQueryBuilder('user')
      .where('user.phone = :phone', { phone }) // Filters by the 'phone' key in the 'phone' column.
      .getOne();
  }

  /**
   * Adds a trusted IP address to the user's trusted IP list.
   * @param userId - The ID of the user to update.
   * @param ip - The IP address to add.
   * @returns Updated user entity.
   * @throws NotFoundException if the user is not found.
   */
  async addTrustedIp(userId: string, ip: string): Promise<UsersEntity> {
    const user = await this.dataSource
      .getRepository(UsersEntity)
      .findOne({ where: { id: userId } });

    if (!user) {
      throw new UserNotFoundException();
    }

    // Check if the IP is already trusted
    const isAlreadyTrusted = user.trusted_ip_address.some(
      (entry) => entry.ip === ip,
    );

    if (isAlreadyTrusted) {
      return user;
    }
    user.trusted_ip_address.push({ ip, trusted: true });
    return await this.dataSource.getRepository(UsersEntity).save(user);
  }

  async getUserVerificationToken(
    userId: string,
    verificationType: string,
  ): Promise<UserVerificationEntity> {
    return await this.dataSource.getRepository(UserVerificationEntity).findOne({
      where: { user_id: userId, verification_type: verificationType },
      relations: ['user'],
    });
  }
}
