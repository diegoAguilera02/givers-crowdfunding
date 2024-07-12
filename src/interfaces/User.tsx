export interface User {
    rut?: string;
    checkDigit?: string;
    name: string;
    lastnamePaternal?: string;
    lastnameMaternal?: string;
    email: string;
    profile: string;
    status: boolean;
}