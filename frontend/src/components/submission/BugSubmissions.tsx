import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/store";
import { approveSubmission } from "@/store/submissions/approve-submission-slice";
import { getSubmissionsByBug } from "@/store/submissions/get-submission-by-bug-slice";
import { Button, Tag, Divider, Modal } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import { SubmissionAttachments } from "./SubmissionAttachments";
import { openRewardModal, closeRewardModal } from "@/store/ui/ui-slice";

interface Props {
  bugCode: string;
  bugStatus: string;
  isBugOwner: boolean;
}

const BugSubmissions = ({ bugCode, bugStatus, isBugOwner }: Props) => {
  const dispatch = useDispatch<AppDispatch>();

  const { submissions, isLoading } = useSelector((state: RootState) => state.getSubmissionsByBug);
  const { isSuccess } = useSelector((state: RootState) => state.approveSubmission);

  const { showRewardModal, activeSubmissionCode } = useSelector((state: RootState) => state.ui);

  const [expanded, setExpanded] = useState<string | null>(null);

  const selectedSubmission = submissions.find((s) => s.submissionCode === activeSubmissionCode);
  const rewardAlreadyGiven = submissions.some((sub) => sub.approved);

  /* 🔹 Initial fetch */
  useEffect(() => {
    if (isBugOwner && bugCode) {
      dispatch(getSubmissionsByBug(bugCode));
    }
  }, [bugCode, isBugOwner, dispatch]);

  /* 🔹 Re-fetch after approval success */
  useEffect(() => {
    if (isSuccess && bugCode) {
      dispatch(getSubmissionsByBug(bugCode));
      dispatch(closeRewardModal());
      // dispatch(resetApproveState()); //
    }
  }, [isSuccess, bugCode, dispatch]);

  if (!isBugOwner) return null;

  return (
    <>
      <Divider />
      <h2 className="text-lg font-semibold mb-4">Submitted Solutions ({submissions.length})</h2>

      {isLoading && <p className="text-sm text-gray-500">Loading submissions…</p>}

      {submissions.map((s: any) => {
        const isExpanded = expanded === s.submissionCode;

        return (
          <div
            key={s.submissionCode}
            className={`mb-4 rounded-xl border p-4 bg-white ${
              s.approved ? "border-green-400 bg-green-50" : "border-gray-200"
            }`}
          >
            {/* HEADER */}
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium">{s.submittedBy.name}</p>
                <p className="text-xs text-gray-500">Submitted solution</p>
              </div>

              {s.approved ? (
                <Tag icon={<CheckCircleOutlined />} color="green">
                  Approved
                </Tag>
              ) : (
                <Tag color="blue">Pending</Tag>
              )}
            </div>

            {/* CONTENT */}
            <div className="mt-3 text-sm text-gray-800">
              {isExpanded ? (
                <>
                  <p className="whitespace-pre-line">{s.description}</p>
                  <SubmissionAttachments files={s.attachments} />
                </>
              ) : (
                <p className="line-clamp-3">{s.description}</p>
              )}
            </div>

            {/* ACTIONS */}
            <div className="mt-4 flex justify-between items-center">
              <button
                onClick={() => setExpanded(isExpanded ? null : s.submissionCode)}
                className="text-sm text-blue-600 hover:underline"
              >
                {isExpanded ? "Hide details" : "Review solution"}
              </button>

              {!s.approved && !rewardAlreadyGiven && bugStatus !== "Closed" && (
                <button className="btn-primary" onClick={() => dispatch(openRewardModal(s.submissionCode))}>
                  Approve & Reward
                </button>
              )}
            </div>
          </div>
        );
      })}

      {/* 🎉 Reward Modal */}
      <Modal open={showRewardModal} onCancel={() => dispatch(closeRewardModal())} footer={null} centered>
        <div className="text-center p-6">
          <h2 className="text-2xl font-semibold">🎉 Congratulations!</h2>

          <p className="mt-3 text-gray-600">
            You are about to reward <span className="font-semibold">{selectedSubmission?.submittedBy.name}</span>
          </p>

          <Button
            type="primary"
            size="large"
            className="mt-6 btn-primary"
            onClick={() => {
              dispatch(approveSubmission(activeSubmissionCode!));
              dispatch(closeRewardModal());
            }}
          >
            Confirm Reward
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default BugSubmissions;
