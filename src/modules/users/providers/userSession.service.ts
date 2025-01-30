import { SessionStatus } from '@constants/session-type';
import { userNoActiveSessionFoundException } from '@exceptions/userExceptions/userNoActiveSessionFoundException';
import { UserNotFoundException } from '@exceptions/userExceptions/userNotFoundException';
import { Injectable } from '@nestjs/common';
import { UserSession } from '@users_modules/entity/userSession.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class UserSessionService {
  constructor(private readonly dataSource: DataSource) {}

  /**
   * Retrieves all active sessions for a user by their unique identifier.
   *
   * @param {string} userId - The unique identifier of the user.
   * @returns {Promise<UserSession[]>} A promise that resolves to an array of active user sessions.
   * @throws {UserNotFoundException} If the user with the specified ID is not found in the database.
   */
  async getActiveSessionsByUserId(userId: string): Promise<UserSession[]> {
    const userSessionList = await this.dataSource
      .getRepository(UserSession)
      .find({
        where: { id: userId },
      });

    if (!userSessionList) {
      throw new UserNotFoundException();
    }

    return userSessionList;
  }

  /**
   * Deletes all active sessions for a given user ID.
   * @param userId - The ID of the user whose active sessions should be deleted.
   * @returns The number of sessions deleted.
   * @throws NotFoundException if no active sessions are found for the user.
   */
  async deleteActiveSessionsByUserId(userId: string): Promise<number> {
    // Fetch all active sessions for the user
    const activeSessions = await this.dataSource
      .getRepository(UserSession)
      .createQueryBuilder('session')
      .where('session.userId = :userId', { userId })
      .andWhere('session.status = :status', { status: SessionStatus.ACTIVE })
      .getMany();

    // If no active sessions are found, throw an exception
    if (activeSessions.length === 0) {
      throw new userNoActiveSessionFoundException();
    }

    // Delete the active sessions
    const deleteResult = await this.dataSource
      .getRepository(UserSession)
      .createQueryBuilder()
      .delete()
      .from(UserSession)
      .where('id IN (:...ids)', {
        ids: activeSessions.map((session) => session.id),
      })
      .execute();

    // Return the number of sessions deleted
    return deleteResult.affected || 0;
  }

  /**
   * Deletes a session for a specific user based on IP address.
   * @param userId - The ID of the user whose session should be deleted.
   * @param ip - The IP address of the session to be deleted.
   * @returns The number of sessions deleted.
   * @throws NotFoundException if no session is found for the given user and IP address.
   */
  async deleteSessionByUserIdForIp(
    userId: string,
    ip: string,
  ): Promise<number> {
    // Attempt to delete the session(s) with the matching userId and IP
    const deleteResult = await this.dataSource
      .getRepository(UserSession)
      .createQueryBuilder()
      .delete()
      .from(UserSession)
      .where('userId = :userId', { userId })
      .andWhere('ip = :ip', { ip })
      .execute();

    // If no sessions were deleted, throw a NotFoundException
    if (deleteResult.affected === 0) {
      throw new userNoActiveSessionFoundException();
    }

    // Return the number of sessions deleted
    return deleteResult.affected || 0;
  }
}
