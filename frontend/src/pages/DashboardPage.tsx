import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/store";
import { getAllBugs } from "@/store/bugs/get-all-bugs-slice";
import BugListItem from "@/components/bugs/BugListItem";
import { closePostBugModal, openPostBugModal } from "@/store/ui/ui-slice";
import { useNavigate } from "react-router-dom";
import { Modal, Skeleton } from "antd";
import PostBugForm from "@/components/bugs/PostBugForm";

const DashboardPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { showPostBugModal } = useSelector((state: RootState) => state.ui);
  const { bugs, isLoading, error } = useSelector((state: RootState) => state.getAllBugs);

  const { isSuccess: isBugCreated } = useSelector((state: RootState) => state.addBug);
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  const handlePostBug = () => {
    if (isAuthenticated) dispatch(openPostBugModal());
    else navigate("/login");
  };

  // initial fetch
  useEffect(() => {
    dispatch(getAllBugs());
  }, [dispatch]);

  // refetch after new bug is created
  useEffect(() => {
    if (isBugCreated) {
      dispatch(getAllBugs());
    }
  }, [isBugCreated, dispatch]);

  return (
    <div className="mx-auto">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold text-gray-900">All Bugs</h1>

        <button
          onClick={handlePostBug}
          className="px-4 py-1.5 rounded-lg font-medium text-white bg-[#FF4500] hover:opacity-90 transition"
        >
          Post Bug
        </button>
      </div>

      {/* MODAL */}
      <Modal
        open={showPostBugModal}
        onCancel={() => dispatch(closePostBugModal())}
        footer={null}
        width={720}
        centered
        destroyOnHidden
        title="Post a Bug"
      >
        <PostBugForm onSuccess={() => dispatch(closePostBugModal())} />
      </Modal>

      {/* LIST */}
      {isLoading && (
        <div className="space-y-3">
          <Skeleton active />
          <Skeleton active />
        </div>
      )}

      {error && <p className="text-sm text-red-600">{error}</p>}

      {!isLoading && bugs.length === 0 && <p className="text-sm text-gray-500">No bugs found.</p>}

      <div className="space-y-3">
        {bugs.map((bug) => (
          <BugListItem key={bug._id} bug={bug} />
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
