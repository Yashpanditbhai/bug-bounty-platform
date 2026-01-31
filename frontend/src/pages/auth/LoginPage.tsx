import { Form, Input, Button } from "antd";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { useAppDispatch } from "@/hooks/hooks";
import type { RootState } from "@/store";
import { loginUser, resetLoginState } from "@/store/auth/login-slice";
import { initialValuesForLogin, LoginInputFields } from "@/data/auth.form-data";
import antdBugImg from "@/assets/bug-img.png";

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { isSuccess, isLoading } = useSelector((state: RootState) => state.login);
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  useEffect(() => {
    if (isSuccess && isAuthenticated) {
      dispatch(resetLoginState());
      navigate("/", { replace: true });
    }
  }, [isSuccess, isAuthenticated, dispatch, navigate]);

  const onFinish = (values: typeof initialValuesForLogin) => {
    if (isLoading) return;
    dispatch(loginUser(values));
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-[#F6F7F8]">
      {/* LEFT BRAND SECTION */}
      <div className="hidden md:flex items-center justify-center bg-[#f57243]">
        <div className="max-w-md px-10 text-white">
          <h1 className="text-4xl font-bold mb-4">Welcome back</h1>
          <p className="text-lg opacity-90 leading-relaxed">
            Log in to manage vulnerabilities, track reports, and collaborate securely on your Bug Bounty platform.
          </p>

          <img src={antdBugImg} alt="Bug bounty illustration" className="mt-10 w-full" />
        </div>
      </div>

      {/* RIGHT FORM SECTION */}
      <div className="flex items-center justify-center px-4 sm:px-6">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-md border border-[#EDEFF1] p-8">
          <h2 className="text-2xl font-semibold text-[#1A1A1B]">Login</h2>
          <p className="text-[#7C7C7C] mb-6">Continue to BugBounty</p>

          <Form layout="vertical" initialValues={initialValuesForLogin} onFinish={onFinish} disabled={isLoading}>
            {LoginInputFields.map((field) => (
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
              Login
            </Button>
          </Form>

          <p className="text-sm mt-6 text-center text-[#7C7C7C]">
            Don’t have an account?{" "}
            <Link to="/register" className="font-medium" style={{ color: "#FF4500" }}>
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
