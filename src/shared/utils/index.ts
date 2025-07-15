export function formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    };
    return new Intl.DateTimeFormat('pt-BR', options).format(date);
}

export const formatPhoneNumber = (phoneNumber: string): string => {
    const cleaned = ('' + phoneNumber).replace(/\D/g, '');

    const matchMobileWithCountry = cleaned.match(/^(\d{2})(\d{2})(\d{5})(\d{4})$/);
    if (matchMobileWithCountry) {
        return `+${matchMobileWithCountry[1]} (${matchMobileWithCountry[2]}) ${matchMobileWithCountry[3]}-${matchMobileWithCountry[4]}`;
    }

    const matchLandlineWithCountry = cleaned.match(/^(\d{2})(\d{2})(\d{4})(\d{4})$/);
    if (matchLandlineWithCountry) {
        return `+${matchLandlineWithCountry[1]} (${matchLandlineWithCountry[2]}) ${matchLandlineWithCountry[3]}-${matchLandlineWithCountry[4]}`;
    }

    const matchMobile = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);
    if (matchMobile) {
        return `(${matchMobile[1]}) ${matchMobile[2]}-${matchMobile[3]}`;
    }

    const matchLandline = cleaned.match(/^(\d{2})(\d{4})(\d{4})$/);
    if (matchLandline) {
        return `(${matchLandline[1]}) ${matchLandline[2]}-${matchLandline[3]}`;
    }

    return phoneNumber;
};

export function processSearchTerm(term: string): string {
    const trimmedTerm = term.trim();

    const dateMatch = trimmedTerm.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
    if (dateMatch) {
        const day = dateMatch[1];
        const month = dateMatch[2];
        const year = dateMatch[3];
        return `${year}-${month}-${day}`;
    }

    const digits = (trimmedTerm.match(/\d/g) || []).length;
    const letters = (trimmedTerm.match(/[a-zA-Z]/g) || []).length;

    if (digits > 0 && letters <= 2) {
        return trimmedTerm.replace(/\D/g, '');
    }

    return trimmedTerm;
}