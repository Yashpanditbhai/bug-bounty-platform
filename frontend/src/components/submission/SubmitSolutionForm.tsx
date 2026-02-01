import { Form, Input, Button, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { submitSolution, resetSubmitSolutionState } from "@/store/submissions/submit-solution-slice";

const { TextArea } = Input;

interface Props {
  bugCode: string;
  onSuccess?: () => void;
}

const SubmitSolutionForm = ({ bugCode, onSuccess }: Props) => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const { isLoading, isSuccess } = useAppSelector((state) => state.submitSolution);

  const onFinish = (values: any) => {
    const files = values.attachments?.map((f: any) => f.originFileObj) || [];

    dispatch(
      submitSolution({
        bugCode,
        description: values.description,
        attachments: files,
      }),
    );
  };

  useEffect(() => {
    if (isSuccess) {
      form.resetFields();
      dispatch(resetSubmitSolutionState());
      onSuccess?.(); // 👈 close modal + refresh
    }
  }, [isSuccess, dispatch, form, onSuccess]);

  return (
    <Form layout="vertical" form={form} onFinish={onFinish} className="pt-2">
      <Form.Item
        label="Solution Description"
        name="description"
        rules={[{ required: true, message: "Please explain your solution" }]}
      >
        <TextArea
          rows={5}
          placeholder="Explain how you fixed or exploited the bug. Include steps, proof, or reasoning."
        />
      </Form.Item>

      <Form.Item
        label="Attachments (optional)"
        name="attachments"
        valuePropName="fileList"
        getValueFromEvent={(e) => e?.fileList}
      >
        <Upload beforeUpload={() => false} multiple>
          <Button icon={<UploadOutlined />}>Upload files (image / pdf / zip)</Button>
        </Upload>
      </Form.Item>

      <div className="flex justify-end gap-2">
        <Button type="primary" htmlType="submit" loading={isLoading} className="!bg-[#FF4500]">
          Submit Solution
        </Button>
      </div>
    </Form>
  );
};

export default SubmitSolutionForm;
