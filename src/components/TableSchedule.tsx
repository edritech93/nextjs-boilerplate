"use client";
import { ItemScheduleType } from "@/types/ScheduleType";
import { Table } from "flowbite-react";

interface ITableSchedule {
  data: ItemScheduleType[];
}

export default function TableSchedule(props: ITableSchedule) {
  const { data } = props;

  return (
    <div className="overflow-x-auto">
      <Table>
        <Table.Head>
          <Table.HeadCell>Full Name</Table.HeadCell>
          <Table.HeadCell align={"center"}>Email</Table.HeadCell>
          <Table.HeadCell align={"center"}>Phone Number</Table.HeadCell>
          <Table.HeadCell align={"center"}>Schedule</Table.HeadCell>
          <Table.HeadCell align={"center"}>Action</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {data.map((item: ItemScheduleType, index: number) => (
            <Table.Row
              key={index}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {item.fullName}
              </Table.Cell>
              <Table.Cell align={"center"}>{item.email}</Table.Cell>
              <Table.Cell align={"center"}>{item.phoneNumber}</Table.Cell>
              <Table.Cell align={"center"}>{item.schedule}</Table.Cell>
              <Table.Cell align={"center"}>
                <a
                  href="#"
                  className="font-medium text-green-400 hover:underline dark:text-green-500 mr-4"
                >
                  Approve
                </a>
                <a
                  href="#"
                  className="font-medium text-red-600 hover:underline dark:text-red-500 mr-4"
                >
                  Reject
                </a>
                <a
                  href="#"
                  className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                >
                  Join
                </a>
              </Table.Cell>
            </Table.Row>
          ))}

          {/* <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              Microsoft Surface Pro
            </Table.Cell>
            <Table.Cell>White</Table.Cell>
            <Table.Cell>Laptop PC</Table.Cell>
            <Table.Cell>$1999</Table.Cell>
            <Table.Cell>
              <a
                href="#"
                className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
              >
                Edit
              </a>
            </Table.Cell>
          </Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              Magic Mouse 2
            </Table.Cell>
            <Table.Cell>Black</Table.Cell>
            <Table.Cell>Accessories</Table.Cell>
            <Table.Cell>$99</Table.Cell>
            <Table.Cell>
              <a
                href="#"
                className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
              >
                Edit
              </a>
            </Table.Cell>
          </Table.Row> */}
        </Table.Body>
      </Table>
    </div>
  );
}
