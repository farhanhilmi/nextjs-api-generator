export default function checkAPIConnection(req, res) {
    res.status(200).json({ status: 'OK', message: 'API is working' });
}
