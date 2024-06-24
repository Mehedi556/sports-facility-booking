export type TSignup = {
    name: string;
    email: string;
    password: string;
    phone: string;
    role: "admin" | "user";
    address: string;
  }
  
  export type TLogin = {
    email: string;
    password: string;
  }

  export type TUserRoles = "user" | "admin"