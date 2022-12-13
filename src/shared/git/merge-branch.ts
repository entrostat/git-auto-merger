import { executeCommand } from '../execute-command';
import { safeCommand } from '../safe-command';

export async function mergeBranch(branch: string, baseBranch: string) {
    try {
        await executeCommand(
            `git checkout ${branch}`,
            console.log,
            console.error,
        );
        const message = await executeCommand(
            `git merge --no-commit ${baseBranch}`,
            console.log,
            console.error,
        );
        await safeCommand('git merge --abort', console.log, console.error);

        return { error: false, message };
    } catch (e) {
        const errorMessage = await safeCommand(
            'git diff --cached',
            console.log,
            console.error,
        );
        await safeCommand('git merge --abort', console.log, console.error);
        return {
            error: true,
            message: errorMessage || 'ERROR',
        };
    }
}
