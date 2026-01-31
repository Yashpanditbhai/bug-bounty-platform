import { Link } from "react-router-dom";
import type { Bug } from "@/types/bugs/bugs-types";

const BugListItem = ({ bug }: { bug: Bug }) => {
  return (
    <div className="border border-gray-200 rounded-md px-4 py-3 transition bg-white">
      {/* Top: user + status */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          {/* Avatar */}
          <div className="h-6 w-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-semibold">
            {bug.createdBy.name.charAt(0).toUpperCase()}
          </div>
          <span className="font-medium text-gray-700">{bug.createdBy.name}</span>
          <span>posted a bug</span>
        </div>

        <span
          className={`text-xs font-medium px-2 py-0.5 rounded ${
            bug.status === "Open" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}
        >
          {bug.status}
        </span>
      </div>

      {/* Title */}
      <Link
        to={`/bugs/${bug.bugCode}`}
        className="block mt-1 text-base font-semibold text-gray-900 hover:underline hover:text-blue-400"
      >
        {bug.title}
      </Link>

      {/* Description preview */}
      <p className="text-sm text-gray-600 mt-1 line-clamp-2">{bug.description}</p>

      {/* Meta row */}
      <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-gray-500">
        <span>
          💰 <strong className="text-gray-700">₹{bug.bounty}</strong> reward
        </span>

        <span>📨 {bug.submissionsCount || 0} submissions</span>

        {/* {bug.attachmentsCount > 0 && <span>📎 {bug.attachmentsCount} attachments</span>} */}
      </div>

      {/* Actions */}
      <div className="mt-3 flex gap-3">
        <Link to={`/bugs/${bug.bugCode}`} className="text-sm text-indigo-600 hover:underline">
          View Details
        </Link>

        {bug.status === "Open" && (
          <Link to={`/bugs/${bug.bugCode}`} className="text-sm text-green-600 hover:underline">
            Submit Solution
          </Link>
        )}
      </div>
    </div>
  );
};

export default BugListItem;
