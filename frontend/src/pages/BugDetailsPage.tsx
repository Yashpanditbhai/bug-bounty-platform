import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/store";
import { getBugDetailsByCode } from "@/store/bugs/get-bug-detail-by-id-slice";
import { Button, Image } from "antd";
import BugSubmissions from "@/components/submission/BugSubmissions";
import { updateBugStatus } from "@/store/bugs/update-bug-status-slice";

const BugDetailsPage = () => {
  const navigate = useNavigate();

  const { bugCode } = useParams<{ bugCode: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { bug, isLoading: loadingBugByCode, error } = useSelector((state: RootState) => state.getbugByCode);

  const loggedInUser = useSelector((state: RootState) => state.getLoggedInUser.user);

  console.log("getLoggedInUser", loggedInUser);
  const isBugOwner = Boolean(loggedInUser && bug && loggedInUser.userCode === bug.createdBy?.userCode);
  // const canSubmit = !isBugOwner && bug.status !== "Closed" && !bug.hasSubmitted;

  // console.log("isBugOwner", isBugOwner);
  const { isSuccess: isStatusUpdated } = useSelector((state: RootState) => state.updateBugStatus);

  useEffect(() => {
    if (bugCode) {
      dispatch(getBugDetailsByCode(bugCode));
    }
  }, [bugCode, dispatch]);

  useEffect(() => {
    if (isStatusUpdated && bugCode) {
      dispatch(getBugDetailsByCode(bugCode));
    }
  }, [isStatusUpdated, bugCode, dispatch]);

  if (loadingBugByCode) return <p className="text-sm text-gray-500">Loading bug…</p>;
  if (error || !bug) return <p className="text-sm text-red-600">{error}</p>;

  return (
    <div className="bg-[#f6f7f8] ">
      <div className=" mx-auto bg-white rounded-xl border border-gray-200 p-6">
        {/* HEADER */}
        <div className="flex justify-between items-start gap-4">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">{bug.title}</h1>

            <p className="text-sm text-gray-500 mt-1">
              Posted by <span className="font-medium">{bug.createdBy.name}</span> • ₹{bug.bounty}
            </p>
          </div>

          {/* STATUS + ACTIONS */}
          <div className="flex items-center gap-2">
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium
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
          </div>
        </div>

        {/* DESCRIPTION */}
        <div className="mt-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">Description</h3>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <p className="text-sm text-gray-800 whitespace-pre-line">{bug.description}</p>
          </div>
        </div>

        {/* SUBMIT SOLUTION */}
        {!isBugOwner && bug.status !== "Closed" && (
          <div className="mt-4 flex justify-end ">
            <button
              onClick={() => navigate(`/bugs/${bug.bugCode}/submit`)}
              className="px-4 py-1.5 rounded-lg font-medium text-white bg-[#FF4500] hover:opacity-90 transition"
            >
              Submit Solution
            </button>
          </div>
        )}

        {/* ATTACHMENTS */}
        {bug.attachments?.length > 0 && (
          <div className="mt-8">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Attachments</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {bug.attachments.map((file: any) =>
                file.type === "image" ? (
                  <Image key={file.url} src={file.url} alt={file.name} className="rounded-lg border" />
                ) : (
                  <a
                    key={file.url}
                    href={file.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 text-sm text-blue-600 underline"
                  >
                    📎 {file.name}
                  </a>
                ),
              )}
            </div>
          </div>
        )}

        {/* SUBMISSIONS */}
        <BugSubmissions bugCode={bug.bugCode} bugStatus={bug.status} isBugOwner={isBugOwner} />
      </div>
    </div>
  );
};

export default BugDetailsPage;
