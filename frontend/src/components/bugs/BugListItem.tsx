import { Link } from "react-router-dom";
import type { Bug } from "@/types/bugs/bugs-types";

const statusConfig = {
  Open: {
    label: "Open",
    dot: "bg-green-500",
    pill: "bg-green-50 text-green-700 border-green-200 ",
    animate: true,
  },
  "In Review": {
    label: "In Review",
    dot: "bg-yellow-500",
    pill: "bg-yellow-50 text-yellow-700 border-yellow-200",
    animate: false,
  },
  Closed: {
    label: "Closed",
    dot: "bg-red-500",
    pill: "bg-red-50 text-red-700 border-red-200",
    animate: false,
  },
};

const BugListItem = ({ bug }: { bug: Bug }) => {
  const status = statusConfig[bug.status as keyof typeof statusConfig];

  return (
    <div className="group bg-white border border-gray-200 rounded-xl px-5 py-4 hover:border-gray-300 hover:shadow-md transition cursor-pointer">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 text-xs text-gray-500">
          <div className="h-8 w-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm font-semibold">
            {bug.createdBy.name.charAt(0).toUpperCase()}
          </div>

          <div className="leading-tight">
            <p className="text-gray-700 font-medium">{bug.createdBy.name}</p>
            <p className="text-gray-400">reported a bug</p>
          </div>
        </div>

        {/* STATUS */}
        <div className={`flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-medium border ${status.pill}`}>
          <span className="relative flex h-2 w-2">
            {status.animate && (
              <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping" />
            )}
            <span className={`relative inline-flex h-2 w-2 rounded-full ${status.dot}`} />
          </span>

          {status.label}
        </div>
      </div>

      {/* TITLE */}
      <Link
        to={`/bugs/${bug.bugCode}`}
        className="block mt-3 text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition"
      >
        {bug.title}
      </Link>

      {/* DESCRIPTION */}
      <p className="mt-1 text-sm text-gray-600 line-clamp-2">{bug.description}</p>

      {/* META */}
      <div className="mt-4 flex flex-wrap items-center gap-6 text-sm text-gray-500">
        <div className="flex items-center gap-1">
          <span className="text-lg animate-bounce">💰</span>
          <span className="font-semibold text-gray-900">₹{bug.bounty.toLocaleString()}</span>
          <span className="text-xs">reward</span>
        </div>

        <div className="flex items-center gap-1">
          <span className="text-lg">📨</span>
          <span className="font-medium text-gray-800">{bug.submissionsCount || 0}</span>
          <span className="text-xs">submissions</span>
        </div>
      </div>

      {/* ACTIONS */}
      <div className="mt-4 flex items-center gap-5 text-sm">
        <Link to={`/bugs/${bug.bugCode}`} className="font-medium text-indigo-600 hover:underline">
          View details →
        </Link>

        {bug.status === "Open" && (
          <Link to={`/bugs/${bug.bugCode}`} className="font-medium text-green-600 hover:underline">
            Submit solution
          </Link>
        )}
      </div>
    </div>
  );
};

export default BugListItem;
