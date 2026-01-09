import { supabase } from "../lib/supabase";

export default function Login() {
  const handleEmailAuth = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    // Try login first
    const { error: signInError } =
      await supabase.auth.signInWithPassword({ email, password });

    if (!signInError)
      return;

    //  If user not found -> signup

    if (signInError.status === 400) {
      const { error: signUpError } =
        await supabase.auth.signUp({ email, password });

      if (signUpError) {
        alert(signUpError.message);
      }
    }
  };

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  };

  return (
   
      <div className="auth">
        <h1>Private Notes</h1>

        <form onSubmit={handleEmailAuth}>
          <input name="email" type="email" placeholder="Email" required />
          <input name="password" type="password" placeholder="Password" required />
          <button type="submit">Login</button>
        </form>

        <div className="divider">or</div>

        <button className="google" onClick={handleGoogleLogin}>
          Continue with Google
        </button>
      </div>

  );
}
