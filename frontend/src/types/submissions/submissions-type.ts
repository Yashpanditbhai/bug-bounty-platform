/* ================= TYPES ================= */

export interface SubmitSolutionPayload {
  bugCode: string;
  description: string;
  attachments?: File[];
}

export interface SubmitSolutionState {
  isLoading: boolean;
  error: string | null;
  isSuccess: boolean;
  isRun: string;
}

/* ================= TYPES ================= */

export interface ApproveSubmissionState {
  isLoading: boolean;
  error: string | null;
  isSuccess: boolean;
  isRun: string;
}

/* ================= TYPES ================= */

export interface Submission {
  submissionCode: string;
  description: string;
  approved: boolean;
  attachments: {
    url: string;
    type: string;
    name: string;
  }[];
  submittedBy: {
    userCode: string;
    name: string;
  };
}

export interface GetSubmissionsState {
  submissions: Submission[];
  isLoading: boolean;
  error: string | null;
}
