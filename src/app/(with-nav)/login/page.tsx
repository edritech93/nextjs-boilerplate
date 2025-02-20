"use client";
import React, { useEffect } from "react";
import { Button, FloatingLabel } from "flowbite-react";
import { LoginBodyType } from "@/types/LoginType";
import { STORAGE } from "@/constants/define";
import { useRouter } from "next/navigation";
import { object, string } from "yup";
import { useFormik } from "formik";
import useAuthService from "@/services/auth/services";
import BgAuth from "@/components/BgAuth";
import Image from "next/image";

export default function Login() {
  const { profile, loadingAuth, loginRequest } = useAuthService();
  const router = useRouter();

  useEffect(() => {
    localStorage.removeItem(STORAGE.TOKEN);
  }, []);

  useEffect(() => {
    if (profile) {
      // router.push("room");
    }
  }, [profile, router]);

  const validationSchema = object().shape({
    email: string().email().required("Email is required"),
    password: string()
      .required("Password is required")
      .min(6, "Password is too short - should be 6 chars minimum"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values: LoginBodyType) => {
      // loginRequest(values);
      router.push("dashboard");
    },
  });

  return (
    <div className="flex flex-1 justify-center min-h-svh">
      <BgAuth />
      <div className="flex flex-col justify-center w-96 p-4 bg-white">
        <form
          className="flex min-w-72 max-w-sm flex-col gap-4"
          onSubmit={formik.handleSubmit}
        >
          <Image
            src={require("@/assets/images/tanyo-logo.png")}
            alt={"tanyo-logo"}
            width={150}
            height={150}
          />
          <p className="text-sm text-blue-400 mb-4">
            Please input your credential to login
          </p>
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
            id={"password"}
            type={"password"}
            variant={"outlined"}
            label={"Password"}
            required={true}
            helperText={formik.errors.password}
            color={formik.errors.password ? "error" : "default"}
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <Button
            type={"submit"}
            isProcessing={loadingAuth}
            disabled={loadingAuth}
          >
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}
