import { executeCommand } from './execute-command';

export async function safeCommand(
    command: string,
    log: (message: string) => void,
    error: (message: string) => void,
    dryRun = false,
): Promise<string | undefined> {
    try {
        return executeCommand(command, log, error, dryRun);
    } catch (e) {
        console.error('An error has occurred', e);
        return undefined;
    }
}
