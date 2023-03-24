import { UserLogin, User} from './UserTypes'

export interface LoginPageProps {
    handleSubmit: (user: UserLogin) => Promise<void>;
}

export interface SignupPageProps {
    handleSubmit: (user: User) => Promise<void>;
}