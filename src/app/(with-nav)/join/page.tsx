"use client";
import React from "react";
import { Button, Card, FloatingLabel } from "flowbite-react";
import { JoinBodyType } from "@/types/JoinType";
import { object, string } from "yup";
import { useFormik } from "formik";
import useAuthService from "@/services/auth/services";

export default function Join() {
  const { loadingAuth, loginRequest } = useAuthService();

  const validationSchema = object().shape({
    fullName: string().required("Full Name is required"),
    email: string().email().required("Email is required"),
    passCode: string()
      .required("PassCode is required")
      .min(5, "PassCode is too short - should be 5 chars minimum"),
  });

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      passCode: "",
    },
    validationSchema,
    onSubmit: (values: JoinBodyType) => {},
  });

  return (
    <div className="flex flex-1 flex-col justify-center items-center min-h-svh">
      <Card>
        <span className="text-2xl font-semibold">Join Room</span>
        <p className="text-sm text-red-500">
          Please input your data to join meeting
        </p>
        <form
          className="flex min-w-72 max-w-sm flex-col gap-4"
          onSubmit={formik.handleSubmit}
        >
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
            id={"passCode"}
            type={"text"}
            variant={"outlined"}
            label={"Pass Code"}
            required={true}
            helperText={formik.errors.passCode}
            color={formik.errors.passCode ? "error" : "default"}
            value={formik.values.passCode}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <Button
            type={"submit"}
            isProcessing={loadingAuth}
            disabled={loadingAuth}
          >
            Join
          </Button>
        </form>
      </Card>
    </div>
  );
}
