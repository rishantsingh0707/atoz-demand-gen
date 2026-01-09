import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";
import NoteCard from "../components/NoteCard";
import Navbar from "../components/Navbar";


export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchNotes = async () => {
    const { data, error } = await supabase
      .from("notes")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) setNotes(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const createNote = async (e) => {
    e.preventDefault();

    const title = e.target.title.value;
    const content = e.target.content.value;

    await supabase.from("notes").insert({
      title,
      content,
    });

    e.target.reset();
    fetchNotes();
  };

  const deleteNote = async (id) => {
    await supabase.from("notes").delete().eq("id", id);
    fetchNotes();
  };

  if (loading) return null;

  return (
    <>
    <Navbar title="Notes" />

      <form className="new-note" onSubmit={createNote}>
        <input name="title" placeholder="Title" required />
        <textarea name="content" placeholder="Write…" required />
        <button type="submit">Save</button>
      </form>

      <ul className="notes-list">
        {notes.map((note) => (
          <NoteCard
            key={note.id}
            title={note.title}
            onOpen={() => navigate(`/notes/${note.id}`)}
            onDelete={() => deleteNote(note.id)}
          />
        ))}
      </ul>
    </>
  );
}
