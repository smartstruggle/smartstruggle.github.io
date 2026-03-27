export default async function handler(req, res) {
if (req.method !== "POST") {
return res.status(405).json({ message: "Method not allowed" });
}

try {
const { email } = req.body;

if (!email) {
return res.status(400).json({ message: "E-Mail fehlt." });
}

const response = await fetch("https://api.brevo.com/v3/contacts", {
method: "POST",
headers: {
"Content-Type": "application/json",
"api-key": process.env.BREVO_API_KEY
},
body: JSON.stringify({
email,
listIds: [3],
updateEnabled: true
})
});

const data = await response.json();

if (!response.ok) {
return res.status(response.status).json({
message: "Brevo-Fehler",
error: data
});
}

return res.status(200).json({
message: "Kontakt gespeichert 🎉"
});
} catch (error) {
return res.status(500).json({
message: "Serverfehler",
error: error.message
});
}
}
