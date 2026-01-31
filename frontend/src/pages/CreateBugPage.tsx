import { Form, Input, InputNumber, Button, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { createBug, resetCreateBugState } from "@/store/bugs/create-bug-slice";
import { initialValuesForCreateBug, CreateBugInputFields } from "@/data/bug.form-data";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CreateBugPage = () => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { isSuccess } = useAppSelector((state) => state.addBug);

  const onFinish = (values: any) => {
    const formData = new FormData();

    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("bounty", values.bounty);

    values.attachments?.forEach((file: any) => {
      formData.append("attachments", file.originFileObj);
    });

    dispatch(createBug(formData));
  };

  // ✅ handle success
  useEffect(() => {
    if (isSuccess) {
      form.resetFields(); // reset form
      dispatch(resetCreateBugState()); // reset redux state
      navigate("/"); // redirect to home
    }
  }, [isSuccess, form, dispatch, navigate]);

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-xl font-semibold mb-4">Post a Bug</h1>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <Form layout="vertical" initialValues={initialValuesForCreateBug} onFinish={onFinish}>
          {CreateBugInputFields.map((field) => (
            <Form.Item key={field.id} name={field.name} label={field.label} rules={field.rules}>
              {field.type === "textarea" ? (
                <Input.TextArea rows={6} placeholder={field.placeholder} />
              ) : field.type === "number" ? (
                <InputNumber className="w-full" placeholder={field.placeholder} />
              ) : (
                <Input placeholder={field.placeholder} />
              )}
            </Form.Item>
          ))}

          {/*  Attachments */}
          <Form.Item
            label="Attachments (optional)"
            name="attachments"
            valuePropName="fileList"
            getValueFromEvent={(e) => e?.fileList}
          >
            <Upload multiple beforeUpload={() => false} accept="*">
              <Button icon={<UploadOutlined />}>Upload files (image, video, pdf, zip)</Button>
            </Upload>
          </Form.Item>

          <Button type="primary" htmlType="submit">
            Post Bug
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default CreateBugPage;
