import { useState } from "react";
import { useRouter } from "next/router";

export default function Login() {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const handleLogin = async (e) => {
		e.preventDefault();
		setError("");

		const res = await fetch("/api/login", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ email, password }),
		});

		const data = await res.json();

		if (data.ok) {
			// stocker le user dans localStorage pour la démo
			localStorage.setItem("user", JSON.stringify(data.user));
			router.push("/"); // redirection vers l'accueil
		} else {
			setError(data.error || "Erreur inconnue");
		}
	};

	return (
		<div style={{ padding: 40 }}>
			<h1>Connexion</h1>
			<form onSubmit={handleLogin}>
				<div>
					<label>Email :</label>
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</div>
				<div>
					<label>Mot de passe :</label>
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</div>
				<button type="submit">Se connecter</button>
			</form>
			{error && <p style={{ color: "red" }}>{error}</p>}
		</div>
	);
}
