import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { api } from "../api/axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const schema = z.object({
  email: z.email("Email invalide."),
  password: z.string().min(8, "Minimum 8 caractères."),
});

const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data) => {
    try {
      const res = await api.post("/auth/register", data);
      console.log(res);
      alert("Enregistrement réussi.");
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="register">
      <h1>Inscription</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="">Email</label>
        <input
          type="email"
          {...register("email")}
          placeholder="Email"
          required
        />
        {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}
        <label htmlFor="">Mot de passe</label>
        <input
          type="password"
          {...register("password")}
          placeholder="Mot de passe"
          required
        />
        {errors.password && (
          <p style={{ color: "red" }}>{errors.password.message}</p>
        )}

        <label htmlFor="">Validation mot de passe</label>
        <input
          type="password"
          {...register("password")}
          placeholder="Mot de passe"
          required
        />

        <p>
          Vous avez déjà un compte ? <Link to="/login">Se connecter</Link>
        </p>

        <button type="submit">S'inscrire</button>
      </form>
    </div>
  );
};
export default Register;
