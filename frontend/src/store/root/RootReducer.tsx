import { authReducer } from "../auth/auth-slice";
import { loginReducer } from "../auth/login-slice";
import { registerReducer } from "../auth/register-slice";
import { createBugReducer } from "../bugs/create-bug-slice";
import { getAllBugsReducer } from "../bugs/get-all-bugs-slice";
import { bugDetailsReducer } from "../bugs/get-bug-detail-by-id-slice";
import { getSubmissionsByBugReducer } from "../submissions/get-submission-by-bug-slice";
import { approveSubmissionReducer } from "../submissions/approve-submission-slice";
import { submitSolutionReducer } from "../submissions/submit-solution-slice";
import { uiReducer } from "../ui/ui-slice";
import { getLoggedInUserReducer } from "../user/get-loggedin-user-slice";
import { updateBugStatusReducer } from "../bugs/update-bug-status-slice";

const RootReducer = {
  ui: uiReducer,
  auth: authReducer,

  login: loginReducer,
  register: registerReducer,
  getLoggedInUser: getLoggedInUserReducer,

  getAllBugs: getAllBugsReducer,
  getbugByCode: bugDetailsReducer,
  addBug: createBugReducer,
  updateBugStatus: updateBugStatusReducer,

  submitSolution: submitSolutionReducer,
  approveSubmission: approveSubmissionReducer,
  getSubmissionsByBug: getSubmissionsByBugReducer,
};

export default RootReducer;
