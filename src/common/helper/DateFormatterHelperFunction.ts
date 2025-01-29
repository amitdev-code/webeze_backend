import moment from 'moment-timezone';

export class DateFormatterHelperFunction {
  /**
   * Formats a date to a readable string in the specified time zone.
   * @param {Date} date - The date to format.
   * @param {string} timeZone - The time zone to use for formatting.
   * @returns {string} The formatted date string.
   */
  static formatToReadableDate(date: Date, timeZone: string): string {
    return moment(date).tz(timeZone).format('MMMM DD, YYYY hh:mm:ss A z');
  }

  /**
   * Formats a date to ISO 8601 string in the specified time zone.
   * @param {Date} date - The date to format.
   * @param {string} timeZone - The time zone to use for formatting.
   * @returns {string} The formatted ISO 8601 date string.
   */
  static formatToISO(date: Date, timeZone: string): string {
    return moment(date).tz(timeZone).format();
  }

  /**
   * Adds the specified number of hours to the current timestamp.
   * @param {number} hours - The number of hours to add.
   * @returns {Date} The new date with the added hours.
   */
  static addHoursToCurrentTimestamp(hours: number): Date {
    return moment().add(hours, 'hours').toDate();
  }

  /**
   * Adds the specified number of minutes to the current timestamp.
   * @param {number} minutes - The number of minutes to add.
   * @returns {Date} The new date with the added minutes.
   */
  static addMinutesToCurrentTimestamp(minutes: number): Date {
    return moment().add(minutes, 'minutes').toDate();
  }

  /**
   * Adds the specified number of days to the current timestamp.
   * @param {number} days - The number of days to add.
   * @returns {Date} The new date with the added days.
   */
  static addDaysToCurrentTimestamp(days: number): Date {
    return moment().add(days, 'days').toDate();
  }
}
