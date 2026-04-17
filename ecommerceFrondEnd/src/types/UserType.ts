export interface Address{
    ld?: number;
    name: string;
    mobile: string;
    pinCode:string;
    address:string;
    locality:string;
    city: string;
    state:string;
}


// Instead of enum
export type UserRole = 'ROLE_CUSTOMER' | 'ROLE_ADMIN' | 'ROLE_SELLER';

export interface User{
    id?:number;
    password?: string;
    email: string;
    fullName: string;
    role: UserRole;
    addresses?: Address[];
}

