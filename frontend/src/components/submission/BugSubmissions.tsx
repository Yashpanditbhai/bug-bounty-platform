// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import type { RootState, AppDispatch } from "@/store";
// import { approveSubmission } from "@/store/submissions/approve-submission-slice";
// import { getSubmissionsByBug } from "@/store/submissions/get-submission-by-bug-slice";
// import { Button, Tag, Divider, Modal } from "antd";
// import { CheckCircleOutlined } from "@ant-design/icons";
// import { SubmissionAttachments } from "./SubmissionAttachments";
// import { closeRewardModal } from "@/store/ui/ui-slice";

// interface Props {
//   bugCode: string;
//   bugStatus: string;
//   isBugOwner: boolean;
// }

// const BugSubmissions = ({ bugCode, bugStatus, isBugOwner }: Props) => {
//   const dispatch = useDispatch<AppDispatch>();
//   const { submissions, isLoading } = useSelector((state: RootState) => state.getSubmissionsByBug);
//   const { showRewardModal, activeSubmissionCode } = useSelector((state: RootState) => state.ui);
//   const [expanded, setExpanded] = useState<string | null>(null);

//   const selectedSubmission = submissions.find((s) => s.submissionCode === activeSubmissionCode);

//   useEffect(() => {
//     if (isBugOwner && bugCode) {
//       dispatch(getSubmissionsByBug(bugCode));
//     }
//   }, [bugCode, isBugOwner, dispatch]);

//   if (!isBugOwner) return null;

//   return (
//     <>
//       <Divider />

//       <h2 className="text-lg font-semibold mb-4">Submitted Solutions ({submissions.length})</h2>

//       {isLoading && <p className="text-sm text-gray-500">Loading submissions…</p>}

//       {submissions.map((s: any) => {
//         const isExpanded = expanded === s.submissionCode;
//         const isApproved = s.approved;

//         return (
//           <div
//             key={s.submissionCode}
//             className={`mb-4 rounded-xl border p-4 bg-white
//               ${isApproved ? "border-green-400 bg-green-50" : "border-gray-200"}
//             `}
//           >
//             {/* HEADER */}
//             <div className="flex justify-between items-start">
//               <div>
//                 <p className="text-sm font-medium text-gray-900">{s.submittedBy.name}</p>
//                 <p className="text-xs text-gray-500">Submitted solution</p>
//               </div>

//               <div className="flex items-center gap-2">
//                 {isApproved ? (
//                   <Tag icon={<CheckCircleOutlined />} color="green">
//                     Approved
//                   </Tag>
//                 ) : (
//                   <Tag color="blue">Pending</Tag>
//                 )}
//               </div>
//             </div>

//             {/* CONTENT */}
//             <div className="mt-3 text-sm text-gray-800">
//               {isExpanded ? (
//                 <>
//                   <p className="whitespace-pre-line">{s.description}</p>
//                   <SubmissionAttachments files={s.attachments} />
//                 </>
//               ) : (
//                 <p className="line-clamp-3">{s.description}</p>
//               )}
//             </div>

//             {/* TOGGLE */}
//             <button
//               onClick={() => setExpanded(isExpanded ? null : s.submissionCode)}
//               className="mt-2 text-xs text-blue-600 hover:underline"
//             >
//               {isExpanded ? "Hide full solution" : "View full solution"}
//             </button>

//             {/* ATTACHMENTS */}
//             {s.attachments?.length > 0 && (
//               <div className="mt-3 space-y-1">
//                 {s.attachments.map((file: any) => (
//                   <a
//                     key={file.url}
//                     href={file.url}
//                     target="_blank"
//                     rel="noreferrer"
//                     className="block text-xs text-blue-600 underline"
//                   >
//                     📎 {file.name}
//                   </a>
//                 ))}
//               </div>
//             )}
//             {/* ACTIONS */}
//             <div className="mt-4 flex justify-between items-center">
//               <button
//                 onClick={() => setExpanded(isExpanded ? null : s.submissionCode)}
//                 className="text-sm font-medium text-blue-600 hover:underline"
//               >
//                 {isExpanded ? "Hide details" : "Review solution"}
//               </button>

//               {/* {!isApproved && bugStatus !== "Closed" && (
//                 <Button type="primary" onClick={() => dispatch(approveSubmission(s.submissionCode))}>
//                   Approve & Reward
//                 </Button>
//               )} */}
//             </div>

//             {/* ACTION */}
//             {/* {!isApproved && bugStatus !== "Closed" && (
//               <div className="mt-4 flex justify-end">
//                 <Button type="primary" onClick={() => dispatch(approveSubmission(s.submissionCode))}>
//                   Approve & Reward
//                 </Button>
//               </div>
//             )} */}

//             <Modal open={showRewardModal} onCancel={() => dispatch(closeRewardModal())} footer={null} centered>
//               <div className="text-center p-6">
//                 <h2 className="text-2xl font-semibold">🎉 Congratulations!</h2>

//                 <p className="mt-3 text-gray-600">
//                   You are about to reward
//                   <span className="font-semibold"> {selectedSubmission?.submittedBy.name}</span>
//                 </p>

//                 {/* <div className="mt-4 text-3xl font-bold text-green-600">₹{bug?.bounty}</div> */}

//                 <Button
//                   type="primary"
//                   size="large"
//                   className="mt-6"
//                   onClick={() => {
//                     dispatch(approveSubmission(activeSubmissionCode!));
//                     dispatch(closeRewardModal());
//                   }}
//                 >
//                   Confirm Reward
//                 </Button>
//               </div>
//             </Modal>
//           </div>
//         );
//       })}
//     </>
//   );
// };

// export default BugSubmissions;
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

  const { showRewardModal, activeSubmissionCode } = useSelector((state: RootState) => state.ui);

  const [expanded, setExpanded] = useState<string | null>(null);

  const selectedSubmission = submissions.find((s) => s.submissionCode === activeSubmissionCode);

  useEffect(() => {
    if (isBugOwner && bugCode) {
      dispatch(getSubmissionsByBug(bugCode));
    }
  }, [bugCode, isBugOwner, dispatch]);

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

              {!s.approved && bugStatus !== "Closed" && (
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
