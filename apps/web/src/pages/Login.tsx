import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const signIn = async () => {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: window.location.origin }
    });

    if (!error) setSent(true);
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Sign in</h1>
      {sent ? (
        <p>Check your email for the magic link.</p>
      ) : (
        <>
          <input
            placeholder="email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={signIn}>Send link</button>
        </>
      )}
    </div>
  );
}
