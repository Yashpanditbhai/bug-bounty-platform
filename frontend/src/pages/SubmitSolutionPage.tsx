import { Form, Input, Button, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { submitSolution, resetSubmitSolutionState } from "@/store/submissions/submit-solution-slice";
import { useEffect } from "react";

const { TextArea } = Input;

const SubmitSolutionPage = () => {
  const { bugCode } = useParams<{ bugCode: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { isLoading, isSuccess } = useAppSelector((state) => state.submitSolution);

  const [form] = Form.useForm();

  // redirect after success
  useEffect(() => {
    if (isSuccess && bugCode) {
      dispatch(resetSubmitSolutionState());
      navigate(`/bugs/${bugCode}`);
    }
  }, [isSuccess, bugCode, navigate, dispatch]);

  const onFinish = (values: any) => {
    if (!bugCode) return;

    const files: File[] = values.attachments?.fileList?.map((f: any) => f.originFileObj) || [];

    dispatch(
      submitSolution({
        bugCode,
        description: values.description,
        attachments: files,
      }),
    );
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-lg font-semibold mb-4">Submit Solution</h1>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Solution Description"
            name="description"
            rules={[{ required: true, message: "Description is required" }]}
          >
            <TextArea rows={5} placeholder="Explain how you fixed or exploited the bug…" />
          </Form.Item>

          <Form.Item
            label="Attachments (optional)"
            name="attachments"
            valuePropName="fileList"
            getValueFromEvent={(e) => e}
          >
            <Upload
              beforeUpload={() => false} // prevent auto upload
              multiple
            >
              <Button icon={<UploadOutlined />}>Upload files (Image / PDF / ZIP)</Button>
            </Upload>
          </Form.Item>

          <Button type="primary" htmlType="submit" loading={isLoading} disabled={isLoading}>
            Submit Solution
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default SubmitSolutionPage;
