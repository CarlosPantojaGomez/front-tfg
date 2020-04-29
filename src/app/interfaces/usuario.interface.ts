export interface Usuario{
    id?: number;
    name: string;
    firstLastName: string;
    secondLastName: string;
    email: string;
    nickname: string;
    password: string;
    userType?: number;
    tlf?: number;
    city?: string;
    address?: string;
    zipcode?: number;
    profilePicture?: string;
    flagActive: number;
}