// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function index(req, res) {
    res.status(200).json({ status: 'OK', message: 'Hello World' });
}
