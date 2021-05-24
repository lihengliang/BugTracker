export class RegisterUser {
    firstName: string;
    LastName: string;
    email: string;
    role: string;
    password1: string;
    password2: string;
}

export class User {
    firstName: string;
    LastName: string;
    email: string;
    role: Array<string>;
}
