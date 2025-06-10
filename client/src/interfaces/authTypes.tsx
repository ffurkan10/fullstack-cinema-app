export interface LoginRequest{
    email: string;
    password: string;
}

export interface RegisterRequest{
    name: string;
    email: string;
    password: string;
    passwordConfirm: string;
}

export interface UserPayload {
  id: string
  role: string
  iat?: number
  exp?: number
}

interface User {
  id: string
  name: string
  email: string
}

export interface AuthState {
  isLoadingRegister: boolean;
  isErrorRegister: boolean;
  isLoading: boolean;
  isError: boolean;
  user: User | null
}