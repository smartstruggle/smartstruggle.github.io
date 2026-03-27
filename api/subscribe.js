export default async function handler(req, res) {
if (req.method === 'POST') {
const { email } = req.body;

return res.status(200).json({
message: `Email ${email} received`
});
}

res.status(405).json({ message: 'Method not allowed' });
}
