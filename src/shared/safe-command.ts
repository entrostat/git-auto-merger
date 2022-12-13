import { executeCommand } from './execute-command';

export async function safeCommand(
    command: string,
    log: (message: string) => void,
    error: (message: string) => void,
    dryRun = false,
): Promise<string | undefined> {
    try {
        return executeCommand(`${command} || true`, log, error, dryRun);
    } catch (e) {
        return undefined;
    }
}
