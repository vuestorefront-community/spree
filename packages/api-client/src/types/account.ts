export type ChangePasswordParams = {
  newPassword: string;
};

export type RegisterUserParams = {
  email: string
  password: string
  firstName: string
  lastName: string
};

export type UpdateUserParams = {
  email: string
  firstName: string
  lastName: string
};
