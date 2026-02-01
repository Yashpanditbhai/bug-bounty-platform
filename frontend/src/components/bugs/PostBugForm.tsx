import { Form, Input, InputNumber, Button, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { createBug, resetCreateBugState } from "@/store/bugs/create-bug-slice";
import { CreateBugInputFields, initialValuesForCreateBug } from "@/data/bug.form-data";

interface Props {
  onSuccess?: () => void;
}

const PostBugForm = ({ onSuccess }: Props) => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const { isLoading, isSuccess } = useAppSelector((state) => state.addBug);

  const onFinish = (values: any) => {
    const formData = new FormData();

    Object.entries(values).forEach(([key, value]: any) => {
      if (key === "attachments") {
        value?.forEach((f: any) => formData.append("attachments", f.originFileObj));
      } else {
        formData.append(key, value);
      }
    });

    dispatch(createBug(formData));
  };

  useEffect(() => {
    if (isSuccess) {
      form.resetFields();
      dispatch(resetCreateBugState());
      onSuccess?.();
    }
  }, [isSuccess, dispatch, form, onSuccess]);

  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">🐞 Post a Bug</h2>
        <p className="text-sm text-gray-500 mt-1">Report a vulnerability and help improve platform security.</p>
      </div>

      <Form form={form} layout="vertical" initialValues={initialValuesForCreateBug} onFinish={onFinish}>
        {/* DYNAMIC FIELDS */}
        {CreateBugInputFields.map((field) => (
          <Form.Item key={field.id} name={field.name} label={field.label} rules={field.rules}>
            {field.type === "textarea" ? (
              <Input.TextArea rows={6} placeholder={field.placeholder} className="bg-gray-50" />
            ) : field.type === "number" ? (
              <InputNumber className="w-full" size="large" placeholder={field.placeholder} />
            ) : (
              <Input size="large" placeholder={field.placeholder} />
            )}
          </Form.Item>
        ))}

        {/* ATTACHMENTS */}
        <Form.Item
          label="Attachments (optional)"
          name="attachments"
          valuePropName="fileList"
          getValueFromEvent={(e) => e?.fileList}
        >
          <Upload multiple beforeUpload={() => false}>
            <Button icon={<UploadOutlined />}>Upload files</Button>
          </Upload>
        </Form.Item>

        {/* FOOTER */}
        <div className="flex justify-end gap-3 mt-6 border-t pt-4">
          <Button onClick={onSuccess}>Cancel</Button>

          <Button type="primary" htmlType="submit" loading={isLoading} className="btn-primary">
            Post Bug
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default PostBugForm;
