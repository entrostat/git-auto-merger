import { createTransport } from 'nodemailer';
import { Config } from '../../config';
import { sendMergeFailedEmailTemplate } from './send-merge-failed.email-template';

export async function sendMergeFailedEmailNotification(
    emails: string[],
    projectName: string,
    failedBranchMap: { [branch: string]: string },
    baseBranch: string,
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

    let text =
        `${Object.keys(failedBranchMap)} branches failed to merge:\n` +
        Object.keys(failedBranchMap).map(
            (key) =>
                `BRANCH: ${key}\n\n${failedBranchMap[key]
                    .replace(/\r\n/gm, '\n')
                    .replace(/\n/gm, '\r\n')}\n\n\n`,
        );

    await transport.sendMail({
        from: smtp.fromAddress,
        to: emails,
        subject: `${projectName} - MERGE ERROR`,
        html: sendMergeFailedEmailTemplate(failedBranchMap, baseBranch),
        text,
    });
}
