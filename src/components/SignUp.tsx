// src/components/SignUp.tsx

import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState("");

  const handleSignUp = async () => {
    if (!agreed) {
      setError("You must agree to the Terms & Privacy before signing up.");
      return;
    }

    const { error } = await supabase.auth.signUp({ email, password });
    if (error) setError(error.message);
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); handleSignUp(); }}>
      <h2>Sign Up</h2>
      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1rem' }}>
        <input
          type="checkbox"
          checked={agreed}
          onChange={() => setAgreed(!agreed)}
          id="terms"
        />
        <span>
          I have read and agree to the{' '}
          <a href="/terms" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline' }}>
            Terms & Privacy
          </a>
        </span>
      </label>
      <button
        type="submit"
        disabled={!agreed}
        style={{ opacity: !agreed ? 0.5 : 1, cursor: !agreed ? "not-allowed" : "pointer" }}
      >
        Sign Up
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
};

export default SignUp;
