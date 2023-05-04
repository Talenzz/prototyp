export interface User {
    id?: string;
    username?: string;
    email?: string;
    emailVisibility?: boolean;
    password: string;
    passwordConfirm: string;
    verified?: boolean;
    name?: string;
    avatar?: File;
}
