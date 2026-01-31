import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/store";

import { approveSubmission } from "@/store/submissions/approve-submission-slice";
import { Card, Button, Divider, Tag } from "antd";
import { getSubmissionsByBug } from "@/store/submissions/get-submission-by-bug-slice";

interface BugSubmissionsProps {
  bugCode: string;
  bugStatus: string;
  isBugOwner: boolean;
}

const BugSubmissions = ({ bugCode, bugStatus, isBugOwner }: BugSubmissionsProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const { submissions, isLoading } = useSelector((state: RootState) => state.getSubmissionsByBug);

  useEffect(() => {
    if (isBugOwner && bugCode) {
      dispatch(getSubmissionsByBug(bugCode));
    }
  }, [bugCode, isBugOwner, dispatch]);

  // 🔒 Only bug owner can see submissions
  if (!isBugOwner) return null;

  return (
    <>
      <Divider />

      <h2 className="text-md font-semibold text-gray-800 mb-4">Submitted Solutions ({submissions.length})</h2>

      {isLoading && <p className="text-sm text-gray-500">Loading submissions…</p>}

      {submissions.length === 0 && !isLoading && <p className="text-sm text-gray-500">No submissions yet.</p>}

      <div className="space-y-4">
        {submissions.map((submission: any) => (
          <Card key={submission.submissionCode} className="border border-gray-200 rounded-lg" size="small">
            <div className="flex justify-between gap-4">
              <div>
                <p className="text-xs text-gray-500 mb-1">
                  Submitted by <span className="font-medium text-gray-700">{submission.submittedBy.name}</span>
                </p>

                <p className="text-sm text-gray-800 whitespace-pre-line">{submission.description}</p>

                {submission.attachments?.length > 0 && (
                  <div className="mt-2 space-y-1">
                    {submission.attachments.map((file: any) => (
                      <a
                        key={file.url}
                        href={file.url}
                        target="_blank"
                        rel="noreferrer"
                        className="block text-xs text-blue-600 underline"
                      >
                        📎 {file.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-start">
                {submission.approved ? (
                  <Tag color="green">Approved</Tag>
                ) : bugStatus !== "Closed" ? (
                  <Button
                    type="primary"
                    size="small"
                    onClick={() => dispatch(approveSubmission(submission.submissionCode))}
                  >
                    Approve & Reward
                  </Button>
                ) : (
                  <Tag color="red">Not Selected</Tag>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
};

export default BugSubmissions;
