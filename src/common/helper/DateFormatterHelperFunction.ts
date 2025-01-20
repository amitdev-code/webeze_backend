import moment from 'moment-timezone';

export class DateFormatterHelperFunction {
  static formatToReadableDate(date: Date, timeZone: string): string {
    return moment(date).tz(timeZone).format('MMMM DD, YYYY hh:mm:ss A z');
  }

  static formatToISO(date: Date, timeZone: string): string {
    return moment(date).tz(timeZone).format();
  }
}
