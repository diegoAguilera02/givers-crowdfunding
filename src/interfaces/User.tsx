export interface User {
    googleUID?: string;
    rut?: string;
    checkDigit?: string;
    name: string;
    lastnamePaternal?: string;
    lastnameMaternal?: string;
    email: string;
    profile: string;
    photoURL?: string;
    status: boolean;
}