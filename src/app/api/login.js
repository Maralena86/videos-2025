export default function handler(req, res) {
	if (req.method !== "POST") {
		return res.status(405).json({ error: "Méthode non autorisée" });
	}

	const { email, password } = req.body;

	// ⚠️ Exemple simplifié : on vérifie juste une valeur fixe
	if (email === "nubia" && password === "123456") {
		// en vrai on génère un token (JWT) ou on met en place une session
		return res.status(200).json({ ok: true, user: { email } });
	}

	return res.status(401).json({ ok: false, error: "Identifiants incorrects" });
}
