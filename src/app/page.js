"use client"; // important pour activer le mode client

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Home() {
	const router = useRouter();
	const [user, setUser] = useState(null);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	// Vérifie si l'utilisateur est déjà connecté
	useEffect(() => {
		const storedUser = localStorage.getItem("user");
		if (storedUser) setUser(JSON.parse(storedUser));
	}, []);

	const handleLogin = (e) => {
		e.preventDefault();
		setError("");

		// Vérification simplifiée (à remplacer par API pour production)
		if (email === "admin@test.com" && password === "123456") {
			const userData = { email };
			localStorage.setItem("user", JSON.stringify(userData));
			setUser(userData);
		} else {
			setError("Identifiants incorrects");
		}
	};

	const handleLogout = () => {
		localStorage.removeItem("user");
		setUser(null);
	};

	if (!user) {
		// Affiche le formulaire de login
		return (
			<div className="flex flex-col items-center justify-center min-h-screen p-8 gap-6">
				<h1>Curso de astrologia 2025</h1>
				<Image src="/logo-nubia.png" width={180} height={38} alt="Logo" />
				<h2 className="text-2xl font-bold">Connexion</h2>
				<form
					className="flex flex-col gap-4 w-full max-w-sm"
					onSubmit={handleLogin}
				>
					<input
						type="email"
						placeholder="Email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className="border rounded p-2"
						required
					/>
					<input
						type="password"
						placeholder="Mot de passe"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className="border rounded p-2"
						required
					/>
					<button
						type="submit"
						className="bg-gradient-to-bl from-purple-900 to-blue-800 text-white rounded p-2"
					>
						Se connecter
					</button>
					{error && <p className="text-red-600">{error}</p>}
				</form>
			</div>
		);
	}

	// Page principale si connecté
	return (
		<div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
			<main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
				<div className="flex justify-between w-full max-w-3xl items-center">
					<h2 className="text-xl font-bold">Bienvenido {user.email}</h2>
					<button
						onClick={handleLogout}
						className="bg-gradient-to-bl from-purple-900 to-blue-800 text-white px-3 py-1 rounded"
					>
						Déconnexion
					</button>
				</div>

				<h1>Curso de astrologia 2025</h1>

				<div className="bg-gradient-to-br from-purple-900 to-blue-800 rounded p-[1px]">
					<video
						width="400"
						controls
						preload="metadata"
						playsInline
						className=" rounded"
					>
						<source src="/videos/PIZZICATO.mp4" type="video/mp4" />
						Votre navigateur ne supporte pas la vidéo.
					</video>
				</div>
			</main>
		</div>
	);
}
