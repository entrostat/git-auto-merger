import { executeCommand } from '../execute-command';
import { safeCommand } from '../safe-command';

export async function mergeBranch(
    branch: string,
    baseBranch: string,
    shouldCommit: boolean,
    shouldPush: boolean,
) {
    try {
        await executeCommand(`git checkout ${branch}`, () => {}, console.error);
        const message = await executeCommand(
            `git merge ${shouldCommit ? '' : '--no-commit'} ${baseBranch}`,
            () => {},
            console.error,
        );
        if (shouldPush) {
            await executeCommand('git push', () => {}, console.error);
        } else if (!shouldCommit) {
            await safeCommand(
                'git merge --abort',
                () => {},
                () => {},
            );
        }

        return { error: false, message };
    } catch (e) {
        const errorMessage = await safeCommand(
            'git diff --cached',
            () => {},
            console.error,
        );
        console.log('SAFE merge abort');
        await safeCommand('git merge --abort', () => {}, console.error);
        return {
            error: true,
            message: errorMessage || 'ERROR',
        };
    }
}
