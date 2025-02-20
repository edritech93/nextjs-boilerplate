"use client";
import TableSchedule from "@/components/TableSchedule";
import { ItemScheduleType } from "@/types/ScheduleType";

export default function Dashboard() {
  const data: ItemScheduleType[] = Array(10).fill({
    id: 0,
    fullName: "Yudi Edri Alviska",
    email: "yudiedrialviska@gmail.com",
    phoneNumber: "082171864935",
    schedule: new Date().getTime(),
    status: "Entry",
    createdAt: new Date().getTime(),
    updatedAt: null,
  });

  return (
    <div className="p-4 flex flex-1 flex-col">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <p className="text-sm text-red-500 mb-4">
        The data from booking schedule
      </p>
      <TableSchedule data={data} />
    </div>
  );
}
