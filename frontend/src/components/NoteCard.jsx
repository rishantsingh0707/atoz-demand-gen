export default function NoteCard({ title, onOpen, onDelete }) {
  return (
    <li className="note-card">
      <span className="note-title" onClick={onOpen}>
        {title}
      </span>
      <button
        className="note-delete"
        onClick={onDelete}
        aria-label="Delete note"
      >
        ×
      </button>
    </li>
  );
}