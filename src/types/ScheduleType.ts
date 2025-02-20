export type ItemScheduleType = {
  id: number;
  fullName: string;
  email: string;
  phoneNumber: string;
  schedule: number;
  status: string;
  createdAt: number;
  updatedAt: number | null;
};

export type ScheduleBodyType = {
  fullName: string;
  email: string;
  phoneNumber: string;
  schedule: string;
};

export type ResponseLoginType = {
  token: string;
  refreshToken: string;
  expiresIn: number;
  roomId: string;
};
