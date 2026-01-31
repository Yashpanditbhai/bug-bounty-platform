import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/store";
import { getBugDetailsByCode } from "@/store/bugs/get-bug-detail-by-id-slice";
import { Button, Image } from "antd";
import BugSubmissions from "@/components/submission/BugSubmissions";

const BugDetailsPage = () => {
  const navigate = useNavigate();

  const { bugCode } = useParams<{ bugCode: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { bug, isLoading: loadingBugByCode, error } = useSelector((state: RootState) => state.getbugByCode);

  console.log("bug", bug);
  // const { user, isLoading, isSuccess } = useSelector((state: RootState) => state.getLoggedInUser);
  const loggedInUser = useSelector((state: RootState) => state.getLoggedInUser.user);

  console.log("getLoggedInUser", loggedInUser);
  const isBugOwner = Boolean(loggedInUser && bug && loggedInUser.userCode === bug.createdBy?.userCode);

  // console.log("isBugOwner", isBugOwner);
  useEffect(() => {
    if (bugCode) {
      dispatch(getBugDetailsByCode(bugCode));
    }
  }, [bugCode, dispatch]);

  if (loadingBugByCode) return <p className="text-sm text-gray-500">Loading bug…</p>;
  if (error || !bug) return <p className="text-sm text-red-600">{error}</p>;

  return (
    <div className="bg-white p-6">
      <h1 className="text-lg font-semibold">{bug.title}</h1>

      <p className="text-xs text-gray-500 mb-2">
        Posted by {bug.createdBy.name} • ₹{bug.bounty}
      </p>
      <span className="text-xs font-medium text-green-600">{bug.status}</span>
      <div className="mt-4 border border-gray-200 p-3 bg-white rounded-sm">
        <p className="text-sm whitespace-pre-line text-black">{bug.description}</p>
      </div>

      {bug.status === "Open" && !isBugOwner && (
        <div className="mt-4 flex justify-end">
          <Button type="primary" onClick={() => navigate(`/bugs/${bug.bugCode}/submit`)}>
            Submit Solution
          </Button>
        </div>
      )}

      {bug.attachments?.length > 0 && (
        <div className="mt-4">
          <h3 className="text-sm font-medium mb-2">Attachments</h3>

          <div className="grid grid-cols-2 gap-3">
            {bug.attachments.map((file: any) => {
              if (file.type === "image") {
                return <Image src={file.url} alt={file.name} className="rounded border" />;
              }

              // fallback for pdf / zip / other
              return (
                <a
                  key={file._id}
                  href={file.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 underline text-sm"
                >
                  📎 {file.name}
                </a>
              );
            })}
          </div>
        </div>
      )}

      <BugSubmissions bugCode={bug.bugCode} bugStatus={bug.status} isBugOwner={isBugOwner} />
    </div>
  );
};

export default BugDetailsPage;
