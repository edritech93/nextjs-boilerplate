export type JoinBodyType = {
  fullName: string;
  email: string;
  passCode: string;
};

export type JoinResType = {
  token: string;
  refreshToken: string;
  expiresIn: number;
  roomId: string;
};
