import { supabase } from "../lib/supabase";

export default function Navbar({ title = "Notes" }) {
  const logout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <header className="navbar">
      <h1>{title}</h1>
      <button onClick={logout} className="logout">
        Logout
      </button>
    </header>
  );
}
