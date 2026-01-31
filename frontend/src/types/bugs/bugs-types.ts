export interface Bug {
  _id: string;
  bugCode: string;
  title: string;
  description: string;
  bounty: number;
  status: "Open" | "In Review" | "Closed";

  createdBy: {
    userCode: string;
    name: string;
  };

  winner?: string;

  // derived / optional (frontend-friendly)
  submissionsCount?: number;
  attachments?: string[];
}
