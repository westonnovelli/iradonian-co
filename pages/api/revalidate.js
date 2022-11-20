// https://beta.nextjs.org/docs/data-fetching/revalidating
// https://docs.github.com/en/developers/webhooks-and-events/webhooks/webhook-events-and-payloads#issue_comment
// https://docs.github.com/en/developers/webhooks-and-events/webhooks/securing-your-webhooks

export default async function handler(req, res) {
    const secret = req.query?.secret;
    const author = req.body?.comment?.user?.id;

    if (secret !== process.env.REVALIDATION_KEY) {
        return res.status(401).json({ message: 'Invalid token' });
    }

    if (author !== process.env.AUTHORIZED_REVALIDATOR) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        await res.revalidate('/tw/current');
        return res.json({ revalidated: true });
    } catch (err) {
        // If there was an error, Next.js will continue
        // to show the last successfully generated page
        return res.status(500).send('Error revalidating');
    }
}
