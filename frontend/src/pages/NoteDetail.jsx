import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import Navbar from "../components/Navbar";


export default function NoteDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);

  useEffect(() => {
    const fetchNote = async () => {
      const { data, error } = await supabase
        .from("notes")
        .select("*")
        .eq("id", id)
        .single();

      if (!error) setNote(data);
    };

    fetchNote();
  }, [id]);

  if (!note) return null;

  return (
    <div>
      <Navbar title="Note" />

      <button className="back" onClick={() => navigate("/")}>
        ← Back
      </button>

      <h1>{note.title}</h1>
      <p className="content">{note.content}</p>
      <small>{new Date(note.created_at).toLocaleString()}</small>

    </div>
  );
}
