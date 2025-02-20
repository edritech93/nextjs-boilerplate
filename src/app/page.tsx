"use client";
import React from "react";
import { Button, Card, FloatingLabel } from "flowbite-react";
import { ScheduleBodyType } from "@/types/ScheduleType";
import { object, string } from "yup";
import { useFormik } from "formik";
import useAuthService from "@/services/auth/services";
import Link from "next/link";
import Layout from "@/components/Layout";

export default function App() {
  const { loadingAuth, loginRequest } = useAuthService();

  const validationSchema = object().shape({
    fullName: string().required("Full Name is required"),
    email: string().email().required("Email is required"),
    phoneNumber: string()
      .required("Phone Number is required")
      .min(8, "Phone Number is too short - should be 8 chars minimum"),
    schedule: string().required("Schedule is required"),
  });

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      schedule: "",
    },
    validationSchema,
    onSubmit: (values: ScheduleBodyType) => {},
  });

  return (
    <Layout>
      <div className="flex flex-1 flex-col justify-center items-center min-h-svh">
        <Card>
          <form
            className="flex min-w-72 max-w-sm flex-col gap-4"
            onSubmit={formik.handleSubmit}
          >
            <span className="text-2xl font-semibold">Submit your schedule</span>
            <p className="text-sm text-red-500">
              Please input your schedule, we will contact you after input
              correct data
            </p>
            <FloatingLabel
              id={"fullName"}
              type={"text"}
              variant={"outlined"}
              label={"Full Name"}
              required={true}
              helperText={formik.errors.fullName}
              color={formik.errors.fullName ? "error" : "default"}
              value={formik.values.fullName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <FloatingLabel
              id={"email"}
              type={"email"}
              variant={"outlined"}
              label={"Email"}
              required={true}
              helperText={formik.errors.email}
              color={formik.errors.email ? "error" : "default"}
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <FloatingLabel
              id={"phoneNumber"}
              type={"tel"}
              variant={"outlined"}
              label={"Phone Number"}
              required={true}
              helperText={formik.errors.phoneNumber}
              color={formik.errors.phoneNumber ? "error" : "default"}
              value={formik.values.phoneNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <FloatingLabel
              id={"schedule"}
              type={"datetime-local"}
              variant={"outlined"}
              label={"Schedule"}
              required={true}
              helperText={formik.errors.schedule}
              color={formik.errors.schedule ? "error" : "default"}
              value={formik.values.schedule}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <Button
              type={"submit"}
              isProcessing={loadingAuth}
              disabled={loadingAuth}
            >
              Submit
            </Button>
            <span className="self-center text-sm">
              Already have Schedule,
              <Link href={"/join"} className=" text-blue-400">
                {" "}
                Join Here
              </Link>
            </span>
          </form>
        </Card>
      </div>
    </Layout>
  );
}
