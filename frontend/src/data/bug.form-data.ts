import type { Rule } from "antd/es/form";

export const initialValuesForCreateBug = {
  title: "",
  description: "",
  bounty: undefined,
};

export const CreateBugInputFields: {
  id: number;
  name: keyof typeof initialValuesForCreateBug;
  label: string;
  type: "text" | "textarea" | "number";
  placeholder: string;
  rules: Rule[];
}[] = [
  {
    id: 1,
    name: "title",
    label: "Bug Title",
    type: "text",
    placeholder: "Authentication bypass vulnerability",
    rules: [{ required: true, message: "Bug title is required" }],
  },
  {
    id: 2,
    name: "description",
    label: "Bug Description",
    type: "textarea",
    placeholder: "Explain the issue, steps to reproduce, impact...",
    rules: [{ required: true, message: "Description is required" }],
  },
  {
    id: 3,
    name: "bounty",
    label: "Reward Amount (₹)",
    type: "number",
    placeholder: "5000",
    rules: [{ required: true, message: "Bounty amount is required" }],
  },
];
