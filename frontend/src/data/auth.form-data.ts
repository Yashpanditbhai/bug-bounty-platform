import type { Rule } from "antd/es/form";

/* ===============================
   INITIAL VALUES
================================ */

interface AuthField {
  id: number;
  name: string;
  label: string;
  type: string;
  placeholder: string;
  rules: Rule[];
}

export const initialValuesForRegister = {
  name: "",
  email: "",
  password: "",
};

export const initialValuesForLogin = {
  email: "",
  password: "",
};

/* ===============================
   INPUT FIELDS CONFIG
================================ */

export const RegisterInputFields: AuthField[] = [
  {
    id: 1,
    name: "name",
    label: "Name",
    type: "text",
    placeholder: "John Doe",
    rules: [
      { required: true, message: "Name is required" },
      { min: 2, message: "Name must be at least 2 characters" },
    ],
  },
  {
    id: 2,
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "john@example.com",
    rules: [
      { required: true, message: "Email is required" },
      { type: "email", message: "Invalid email address" },
    ],
  },
  {
    id: 3,
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "••••••••",
    rules: [
      { required: true, message: "Password is required" },
      { min: 6, message: "Password must be at least 6 characters" },
    ],
  },
];

export const LoginInputFields: AuthField[] = [
  {
    id: 1,
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "you@example.com",
    rules: [
      { required: true, message: "Email is required" },
      { type: "email", message: "Invalid email format" },
    ],
  },
  {
    id: 2,
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "••••••••",
    rules: [{ required: true, message: "Password is required" }],
  },
];
