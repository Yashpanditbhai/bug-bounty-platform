import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/store";
import { getBugDetailsByCode } from "@/store/bugs/get-bug-detail-by-id-slice";
import { Button, Image, Modal } from "antd";
import BugSubmissions from "@/components/submission/BugSubmissions";
import { updateBugStatus } from "@/store/bugs/update-bug-status-slice";
import { closeSubmitSolutionModal, openSubmitSolutionModal } from "@/store/ui/ui-slice";
import SubmitSolutionForm from "@/components/submission/SubmitSolutionForm";

const BugDetailsPage = () => {
  const navigate = useNavigate();
  const { bugCode } = useParams<{ bugCode: string }>();
  const dispatch = useDispatch<AppDispatch>();

  const { bug, isLoading, error } = useSelector((state: RootState) => state.getbugByCode);
  const { showSubmitSolutionModal, activeBugCode } = useSelector((state: RootState) => state.ui);
  const loggedInUser = useSelector((state: RootState) => state.getLoggedInUser.user);

  const { isSuccess: isStatusUpdated } = useSelector((state: RootState) => state.updateBugStatus);

  const isBugOwner = loggedInUser && bug && loggedInUser.userCode === bug.createdBy?.userCode;

  useEffect(() => {
    if (bugCode) dispatch(getBugDetailsByCode(bugCode));
  }, [bugCode, dispatch]);

  useEffect(() => {
    if (isStatusUpdated && bugCode) {
      dispatch(getBugDetailsByCode(bugCode));
    }
  }, [isStatusUpdated, bugCode, dispatch]);

  if (isLoading) return <p className="text-sm text-gray-500">Loading bug…</p>;
  if (error || !bug) return <p className="text-sm text-red-600">{error}</p>;

  return (
    <div className="bg-[#f6f7f8] min-h-screen ">
      <button
        onClick={() => {
          if (window.history.length > 1) {
            navigate(-1);
          } else {
            navigate("/");
          }
        }}
        className=" mb-2 inline-flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-gray-900 transition"
      >
        ← Back
      </button>

      <div className=" mx-auto bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 leading-tight">{bug.title}</h1>

            <p className="text-sm text-gray-500 mt-1">
              Posted by <span className="font-medium text-gray-800">{bug.createdBy.name}</span> • ₹{bug.bounty}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* STATUS */}
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold
        ${
          bug.status === "Open"
            ? "bg-green-100 text-green-700"
            : bug.status === "In Review"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-red-100 text-red-700"
        }`}
            >
              {bug.status}
            </span>

            {/* OWNER ACTIONS */}
            {isBugOwner && (
              <>
                {bug.status !== "In Review" && (
                  <Button
                    size="small"
                    onClick={() => dispatch(updateBugStatus({ bugCode: bug.bugCode, status: "In Review" }))}
                  >
                    Mark In Review
                  </Button>
                )}

                {bug.status !== "Closed" && (
                  <Button
                    size="small"
                    danger
                    onClick={() => dispatch(updateBugStatus({ bugCode: bug.bugCode, status: "Closed" }))}
                  >
                    Close Bug
                  </Button>
                )}
              </>
            )}

            {/* SUBMIT SOLUTION */}
            {!isBugOwner && bug.status !== "Closed" && (
              <button
                onClick={() => dispatch(openSubmitSolutionModal(bug.bugCode))}
                className="px-4 py-2 rounded-lg font-semibold text-white bg-[#FF4500] hover:opacity-90 transition"
              >
                Submit Solution
              </button>
            )}
          </div>
        </div>

        {/* DESCRIPTION */}
        <div className="mt-8">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">Bug Description</h3>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
            <p className="text-sm text-gray-800 whitespace-pre-line leading-relaxed">{bug.description}</p>
          </div>
        </div>

        <Modal
          open={showSubmitSolutionModal}
          onCancel={() => dispatch(closeSubmitSolutionModal())}
          footer={null}
          centered
          width={680}
          destroyOnHidden
          title="Submit Solution"
        >
          {activeBugCode && (
            <SubmitSolutionForm
              bugCode={activeBugCode}
              onSuccess={() => {
                dispatch(closeSubmitSolutionModal());
                dispatch(getBugDetailsByCode(activeBugCode)); // 🔄 refresh page data
              }}
            />
          )}
        </Modal>

        {/* ATTACHMENTS */}
        {bug.attachments?.length > 0 && (
          <div className="mt-10">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Attachments</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {bug.attachments.map((file: any) =>
                file.type === "image" ? (
                  <div key={file.url} className=" rounded-lg overflow-hidden bg-white">
                    <Image src={file.url} alt={file.name} />
                    {/* <div className="p-2 text-xs text-gray-500 truncate">{file.name}</div> */}
                  </div>
                ) : (
                  <>
                    <a
                      key={file.url}
                      href={file.url}
                      download={file.name}
                      className="flex items-center gap-2 p-3 border rounded-lg text-sm text-blue-600 hover:bg-gray-50 transition"
                    >
                      📄 {file.name}
                    </a>
                  </>
                ),
              )}
            </div>
          </div>
        )}

        {/* SUBMISSIONS */}
        <div className="mt-10">
          <BugSubmissions bugCode={bug.bugCode} bugStatus={bug.status} isBugOwner={!!isBugOwner} />
        </div>
      </div>
    </div>
  );
};

export default BugDetailsPage;
