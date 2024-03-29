import { exec } from 'node:child_process';

export async function executeCommand(
    command: string,
    log: (message: string) => void,
    error: (message: string) => void,
    dryRun = false,
): Promise<string> {
    if (dryRun) {
        log(command);
        return '';
    }

    return new Promise((resolve, reject) => {
        log(`${command}`);
        exec(command, (err, stdout, stderr) => {
            if (err) {
                error(
                    `An ERROR has occurred: ${
                        err?.message || stderr
                    }\n${JSON.stringify(err || stderr || '')}`,
                );
                error(`Standard output with error: ${stdout}`);
                return reject(stderr);
            }

            if (stdout) {
                log(stdout);
            }

            return resolve(stdout);
        });
    });
}
