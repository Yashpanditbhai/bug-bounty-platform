import { Form, Input, Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/hooks/hooks";
import { registerUser, resetRegisterState } from "@/store/auth/register-slice";
import { initialValuesForRegister, RegisterInputFields } from "@/data/auth.form-data";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import { useEffect } from "react";
import antdBugImg from "@/assets/ant-bug.jpg";

const RegisterPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { isLoading, isSuccess } = useSelector((state: RootState) => state.register);

  const onFinish = (values: typeof initialValuesForRegister) => {
    if (isLoading) return;
    dispatch(registerUser(values));
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(resetRegisterState());
      navigate("/login", { replace: true });
    }
  }, [isSuccess, navigate, dispatch]);

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-[#F6F7F8]">
      {/* LEFT BRAND SECTION */}
      <div className="hidden md:flex items-center justify-center bg-[#FF4500]">
        <div className="max-w-md px-10 text-white">
          <h1 className="text-4xl font-bold mb-4">Join the community 🚀</h1>
          <p className="text-lg opacity-90 leading-relaxed">
            Create your account to report vulnerabilities, collaborate with organizations, and earn rewards through
            responsible disclosure.
          </p>

          <img src={antdBugImg} alt="Bug bounty illustration" className="mt-10 w-full" />
        </div>
      </div>

      {/* RIGHT FORM SECTION */}
      <div className="flex items-center justify-center px-4 sm:px-6">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-md border border-[#EDEFF1] p-8">
          <h2 className="text-2xl font-semibold text-[#1A1A1B]">Create an account</h2>
          <p className="text-[#7C7C7C] mb-6">It only takes a minute</p>

          <Form layout="vertical" initialValues={initialValuesForRegister} onFinish={onFinish} disabled={isLoading}>
            {RegisterInputFields.map((field) => (
              <Form.Item key={field.id} name={field.name} label={field.label} rules={field.rules}>
                {field.type === "password" ? (
                  <Input.Password size="large" placeholder={field.placeholder} />
                ) : (
                  <Input size="large" type={field.type} placeholder={field.placeholder} />
                )}
              </Form.Item>
            ))}

            <Button
              htmlType="submit"
              size="large"
              loading={isLoading}
              block
              style={{
                backgroundColor: "#FF4500",
                borderColor: "#FF4500",
                color: "#fff",
                fontWeight: 600,
              }}
            >
              Register
            </Button>
          </Form>

          <p className="text-sm mt-6 text-center text-[#7C7C7C]">
            Already have an account?{" "}
            <Link to="/login" className="font-medium" style={{ color: "#FF4500" }}>
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
