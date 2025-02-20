export type LoginBodyType = {
  email: string;
  password: string;
};

export type LoginResType = {
  token: string;
  refreshToken: string;
  expiresIn: number;
  roomId: string;
};
