// Tipos del modelo User

export type UserId = number;
export type UserEmail = `${string}@${string}.${string}` | string;
export type UserName = string;
export type UserPassword = string;
export type UserRole = "user" | "admin" | "economia" | "rec. humanos";
export type UserImage = string;

export type UserFormLogin = {
  email: UserEmail;
  password: UserPassword;
};

export type User = {
  id: UserId;
  email: UserEmail;
  name: UserName;
  password: UserPassword;
  role: UserRole;
  image?: UserImage;
};

export type NewUser = {
  name: UserName;
  email: UserEmail;
  password: UserPassword;
  role: UserRole;
  image?: UserImage;
};
