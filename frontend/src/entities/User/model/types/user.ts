import { UserRole } from '../consts/userConsts';

export interface User {
    id: string;
    token: string;
    username: string;
    avatar?: string;
    roles?: UserRole[];
}

export interface UserSchema {
    authData?: User;

    _inited: boolean;
}
