import { formatDate, formatPhoneNumber } from './index';

describe('formatDate', () => {
    it('formats a valid date correctly', () => {
        const date = new Date(2023, 9, 5); // October 5, 2023
        expect(formatDate(date)).toBe('05/10/2023');
    });

    it('handles invalid date input gracefully', () => {
        expect(() => formatDate(new Date('invalid'))).toThrow();
    });
});

describe('formatPhoneNumber', () => {
    it('formats a mobile number with country code correctly', () => {
        const phoneNumber = '5511998765432';
        expect(formatPhoneNumber(phoneNumber)).toBe('+55 (11) 99876-5432');
    });

    it('formats a landline number with country code correctly', () => {
        const phoneNumber = '551132165432';
        expect(formatPhoneNumber(phoneNumber)).toBe('+55 (11) 3216-5432');
    });

    it('formats a mobile number without country code correctly', () => {
        const phoneNumber = '11998765432';
        expect(formatPhoneNumber(phoneNumber)).toBe('(11) 99876-5432');
    });

    it('formats a landline number without country code correctly', () => {
        const phoneNumber = '1132165432';
        expect(formatPhoneNumber(phoneNumber)).toBe('(11) 3216-5432');
    });

    it('returns the original input for invalid phone numbers', () => {
        const phoneNumber = '12345';
        expect(formatPhoneNumber(phoneNumber)).toBe('12345');
    });

    it('handles empty phone number input gracefully', () => {
        const phoneNumber = '';
        expect(formatPhoneNumber(phoneNumber)).toBe('');
    });

    it('handles non-numeric characters in phone number gracefully', () => {
        const phoneNumber = 'abc123';
        expect(formatPhoneNumber(phoneNumber)).toBe('abc123');
    });
});