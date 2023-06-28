// https://beta.nextjs.org/docs/data-fetching/revalidating
// https://docs.github.com/en/developers/webhooks-and-events/webhooks/webhook-events-and-payloads#issue_comment
// https://docs.github.com/en/developers/webhooks-and-events/webhooks/securing-your-webhooks
// https://stackoverflow.com/questions/59064098/github-webhook-with-nextjs

import type { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') return res.status(401).json({ message: 'Invalid method' });

    const sig =
        "sha256=" +
        crypto
            .createHmac("sha256", `${process.env.REVALIDATION_KEY}`)
            .update(JSON.stringify(req.body))
            .digest("hex");

    if (req.headers["x-hub-signature-256"] !== sig) return res.status(401).json({ message: 'Invalid token' });

    const author = req.body?.comment?.user?.id?.toString();
    const issue = req.body?.issue?.id?.toString();

    if (author !== process.env.AUTHORIZED_REVALIDATOR || issue !== process.env.CURRENT_ISSUE_ID) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    console.log('validating');

    try {
        await res.revalidate('/tw/current');
        return res.json({ revalidated: true });
    } catch (err) {
        // If there was an error, Next.js will continue
        // to show the last successfully generated page
        return res.status(500).send('Error revalidating');
    }
}
