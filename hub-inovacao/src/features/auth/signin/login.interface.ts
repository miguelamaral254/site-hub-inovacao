export interface LoginRequest {
    email: string;
    password: string;
  }
  
  export interface LoginResponse {
    token: string;
    email: string;
    role: string;
    message: string;
    idUser: number
  }