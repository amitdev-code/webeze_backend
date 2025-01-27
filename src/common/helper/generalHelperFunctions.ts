import * as bcrypt from 'bcrypt';

export const GeneralHelperFunctions = {
  generateSixDigitOTP: (): string => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  },
  generateSaltedPassword: async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
  },
};
