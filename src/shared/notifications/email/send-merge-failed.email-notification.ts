import { createTransport } from 'nodemailer';
import { Config } from '../../config';

export async function sendMergeFailedEmailNotification(
    emails: string[],
    projectName: string,
    failedBranchMap: { [branch: string]: string },
    config: Config,
) {
    const { smtp } = config;
    const transport = createTransport({
        host: smtp.host,
        port: smtp.port,
        secure: smtp.tls,
        auth: {
            user: smtp.username,
            pass: smtp.password,
        },
    });

    await transport.sendMail({
        from: smtp.fromAddress,
        to: emails,
    });
}
