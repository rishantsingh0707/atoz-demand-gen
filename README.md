# Private Notes App

A minimal, secure notes web application where each user can create and manage their own private notes.

The app is intentionally simple:
- No sharing
- No folders
- No tags
- Just login, write, read, and delete notes

Privacy and data ownership are enforced at the database level.

---

## Features

### Authentication
- Email + Password login
- Google OAuth login
- Authentication handled using Supabase
- Unauthenticated users cannot access notes

### Notes
- Create a note
- View a list of your notes
- View a single note
- Delete a note

Each note contains:
- Title
- Content
- Created timestamp

Notes are **private by default** and strictly tied to the authenticated user.

---

## Security & Data Ownership

- Notes are stored in a Supabase PostgreSQL database
- Row Level Security (RLS) is enabled on the `notes` table
- Database policies ensure:
  - Users can only read their own notes
  - Users can only create notes for themselves
  - Users can only delete their own notes
- Ownership is enforced at the database level, not just in the frontend

Even if the frontend is compromised, users cannot access other users’ data.

---

## Tech Stack

- Frontend: React + Vite
- Backend & Auth: Supabase
- Database: PostgreSQL (Supabase)
- Deployment: Netlify

---

## Project Structure

