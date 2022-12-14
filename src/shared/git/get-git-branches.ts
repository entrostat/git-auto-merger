import { executeCommand } from '../execute-command';

export async function getGitBranches() {
    return await executeCommand(
        `git branch --list`,
        console.log,
        console.error,
    ).then((b) =>
        b
            .split('\n')
            .map((name) => name.replace('* ', ''))
            .map((name) => name.trim())
            .filter((name) => name.length),
    );
}
