import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/store";
import { getAllBugs } from "@/store/bugs/get-all-bugs-slice";
import BugListItem from "@/components/bugs/BugListItem";

const DashboardPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { bugs, isLoading, error } = useSelector((state: RootState) => state.getAllBugs);

  useEffect(() => {
    dispatch(getAllBugs());
  }, [dispatch]);

  if (isLoading) {
    return <p className="text-sm text-gray-500">Loading bugs...</p>;
  }

  if (error) {
    return <p className="text-sm text-red-600">{error}</p>;
  }

  return (
    <div>
      <h1 className="text-lg font-semibold mb-2">All Bugs</h1>

      <div className=" rounded-sm  py-2">
        {bugs.length === 0 ? (
          <p className="text-sm text-gray-500 p-4">No bugs found</p>
        ) : (
          <div className="space-y-2 ">
            {bugs.map((bug) => (
              <BugListItem key={bug._id} bug={bug} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
