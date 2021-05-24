import { User } from './user.model';

export class Token {
    success: boolean;
    token: string;
    user: User;
}

export class DecodedToken {
    exp: number;
    iat: number;
    data: User;
}
