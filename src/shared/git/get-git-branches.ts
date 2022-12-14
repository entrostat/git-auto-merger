import { executeCommand } from '../execute-command';
import { uniq } from 'lodash';
import { safeCommand } from '../safe-command';

export async function getGitBranches() {
    const currentBranch = await executeCommand(
        `git branch`,
        () => {},
        console.error,
    )
        .then((branches) => branches.split('\n'))
        .then((branches) => branches.filter((branch) => branch.includes('* ')))
        .then((branches) => branches[0].replace('* ', ''));

    const localBranches = await executeCommand(
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
    const allBranches = await executeCommand(
        `git branch --list --all`,
        console.log,
        console.error,
    ).then((b) =>
        b
            .split('\n')
            .map((name) => name.replace('* ', ''))
            .map((name) => name.trim())
            .filter((name) => name.length),
    );
    const originNames = await executeCommand(
        `git remote -v`,
        () => {},
        console.error,
    )
        .then((remotes) => remotes.split('\n'))
        .then((remotes) => remotes.map((r) => r.split(/\s/)[0]))
        .then((remotes) => uniq(remotes));

    for (const branch of allBranches) {
        for (const originName of originNames) {
            if (branch.includes(`remotes/${originName}/`)) {
                const localBranchName = branch.replace(
                    `remotes/${originName}/`,
                    '',
                );
                await safeCommand(
                    `git checkout ${localBranchName}`,
                    () => {},
                    console.error,
                );
                await safeCommand(
                    `git checkout ${currentBranch}`,
                    () => {},
                    console.error,
                );
                await safeCommand(
                    `git reset --hard HEAD`,
                    () => {},
                    console.error,
                );
                localBranches.push(localBranchName);
            }
        }
    }
    return uniq(localBranches);
}
