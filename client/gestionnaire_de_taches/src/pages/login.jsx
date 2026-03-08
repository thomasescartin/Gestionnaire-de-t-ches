import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  function validMDP(password) {
    if (/[<>`"'\\;]/.test(password)) return false; // invalide si un caractère spéciale est dans le mot de passe
    return (
      password.length >= 8 && // le mot de passe doit être supèrieur ou égal à 8 caractères
      /[A-Z]/.test(password) && // test si il y a au moins une majuscule
      /[a-z]/.test(password) && // test si il y a ua moins une minuscules
      /\d/.test(password) // d = digit , permet de tester si il y a au moins un chiffre entre 0 et 9 inclus
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validMDP(password)) {
      setError("Mot de passe invalide");
      return;
    }

    try {
      const response = await fetch(
        "http://sql7.freesqldatabase.com:3306/api/auth",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      // Simulation de session
      localStorage.setItem("authUser", JSON.stringify(data.user));

      setSuccess("Connexion réussie ✅");
      navigate("/dashboard");
      setError("");
      setEmail("");
      setPassword("");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Connexion</h2>

      <div>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Nom"
          required
        />
      </div>

      <div>
        <label>Mot de passe</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Mot de passe"
          required
        />
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}

      <p>
        Pas encore de compte ? <Link to="/register">S'inscrire</Link>
      </p>

      <button disabled={!email || !validMDP(password)}>Se connecter</button>
    </form>
  );
}
