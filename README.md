🐞 Bug Bounty Web Platform
📌 Overview

The Bug Bounty Web Platform allows users to post software bugs with a reward and enables other users to submit solutions with proof.
The bug creator reviews submissions and selects a winner, who then earns the bounty reward.

The platform is designed to demonstrate a complete bug bounty workflow with proper permissions, status tracking, and reward logic.

🚀 Features
User Accounts

User registration and login

Secure authentication

Basic user profile information

Bug Posting

Create bugs with:

Title

Detailed description

Bounty amount

Bug status management:

Open

In Review

Closed

Bugs are visible to all users

Bug Submissions

Any logged-in user can submit a solution

Submission includes:

Description of the fix

Proof (image, file, or link)

Multiple users can submit solutions for the same bug

Review & Winner Selection

Only the bug creator can review submissions

One submission can be approved as the winner

On approval:

Bug is marked as Closed

Winner is declared

Bounty is marked as rewarded

Reward Handling

Bounty rewards are handled at logic level

Winner profile reflects earned rewards

No real payment processing included

🛠 Tech Stack
Frontend

React

TypeScript

Tailwind CSS

Ant Design

Backend

Node.js

Express.js

MongoDB

Why this stack?
It supports fast development, clean architecture, and scalability for real-world web platforms.

🔄 Application Workflow

User registers and logs in

User creates a bug with a bounty

Bugs are publicly visible

Users submit solutions with proof

Bug creator reviews all submissions

One submission is approved

Bug is closed and bounty is awarded

🗄 Data Model (High-Level)
User

Name

Email

Reward balance

Bug

Title

Description

Bounty amount

Status

Creator

Winner

Submission

Bug reference

Submitted by

Solution description

Proof

Approval status

⚙️ Setup Instructions
Backend
git clone <repository-url>
cd backend
npm install
npm run dev

Frontend
cd frontend
npm install
npm run dev

Environment Variables

Create a .env file and add:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

📌 Assumptions

One winner per bug

Rewards are managed logically (no financial transactions)

Users provide valid proof for submissions
