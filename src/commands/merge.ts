import { Flags } from '@oclif/core';
import { getGitBranches } from '../shared/git/get-git-branches';
import { mergeBranch } from '../shared/git/merge-branch';
import { outputErrorTable } from '../shared/output-error-table';
import { sendMergeFailedEmailNotification } from '../shared/notifications/email/send-merge-failed.email-notification';
import { BaseCommand } from '../shared/base-command';
import { Config } from '../shared/config';
import { executeCommand } from '../shared/execute-command';
import { concatenateError } from '../shared/concatenate-error';

export const SMTP_MAX_ERROR_LINES = 20;

export default class Merge extends BaseCommand {
    static description = `Tries to merge the base branch into all of the other ones that have been specified or match a pattern.

        Exclusion takes preference over inclusion, so we will ignore a branch if it triggers in the include and exclude patterns.`;

    static examples = [
        `<%= config.bin %> <%= command.id %> --base-branch=develop --include-pattern='develop$' --include-pattern='feature\/.*' --exclude-pattern='main' --notify-email="dev@example.com" --project-name=Test`,
    ];

    static flags = {
        'base-branch': Flags.string({
            char: 'b',
            description:
                'The base branch that we want to merge into other branches',
            required: true,
        }),
        'exclude-pattern': Flags.string({
            char: 'e',
            description:
                'The regex pattern(s) to exclude when running a merge. For example: ^main$',
            multiple: true,
            required: false,
        }),
        'include-pattern': Flags.string({
            char: 'i',
            description:
                'The regex patterns(s) to include when running a merge. For example: feature.+',
            multiple: true,
            required: false,
        }),
        'project-name': Flags.string({
            char: 'P',
            description:
                'The name of the project when sending the notification',
            relationships: [
                {
                    type: 'some',
                    flags: ['notify-email'],
                },
            ],
        }),
        'notify-email': Flags.string({
            char: 'm',
            description:
                'Send a notification via SMTP if the merge cannot take place',
            required: false,
            dependsOn: ['project-name'],
            multiple: true,
        }),
        commit: Flags.boolean({
            char: 'c',
            description: 'Commit the changes when the merge takes place',
            default: false,
        }),
        'push-commit': Flags.boolean({
            char: 'P',
            description: 'Push the changes of the merge',
            default: false,
        }),
    };

    static args = [];

    public async run(): Promise<void> {
        const { flags } = await this.parse(Merge);

        this.log(`> Exclusion Rules: ${flags['exclude-pattern']?.length || 0}
${(flags['exclude-pattern'] || []).map((f) => `  - ${f}`).join('\n')}
> Inclusion Rules: ${flags['include-pattern']?.length || 0}
${(flags['include-pattern'] || []).map((f) => `  - ${f}`).join('\n')}
        `);
        this.log(`> Should Commit: ${flags.commit}`);
        this.log(`> Should Push: ${flags['push-commit']}`);

        const baseBranch = flags['base-branch'];

        const branches = await getGitBranches();

        this.log(`Found a total of ${branches.length} branches`);
        branches.forEach((branch) => this.log(` > ${branch}`));

        const includedBranches = this.filterIncludedBranches(
            branches,
            flags['include-pattern'] || [],
        );

        this.log(
            `After processing include filters, we have ${includedBranches.length} branches`,
        );

        const branchesToProcess = this.filterExcludeBranches(
            includedBranches,
            flags['exclude-pattern'] || [],
            baseBranch,
        );

        this.log(
            `After processing exclude filters, we have ${branchesToProcess.length} branches`,
        );

        branchesToProcess.forEach((branch) => this.log(` > ${branch}`));

        this.log(
            `Merging the base branch ${baseBranch} into the other branches`,
        );
        await executeCommand(
            `git checkout ${baseBranch}`,
            console.log,
            console.error,
        );
        // https://stackoverflow.com/a/501461/3016520

        const branchMap: { [branch: string]: string } = {};
        const failedBranches: string[] = [];
        const shouldCommit = flags.commit;
        const shouldPush = flags['push-commit'];
        for (const branch of branchesToProcess) {
            const mergeResult = await mergeBranch(
                branch,
                baseBranch,
                shouldCommit,
                shouldPush,
            );
            branchMap[branch] = mergeResult.message;
            if (mergeResult.error) {
                failedBranches.push(branch);
            } else {
                this.log(` - Merged ${baseBranch} into ${branch} successfully`);
            }
        }

        if (failedBranches.length === 0) {
            this.log('No failed branches, happy days!');
            this.exit(0);
        }

        this.log(`Failed to merge ${failedBranches.length} branches`);
        outputErrorTable(failedBranches, branchMap);

        const failedBranchMap = this.createFailedBranchMap(
            failedBranches,
            branchMap,
        );

        if (flags['notify-email']) {
            this.log(
                `Sending notification emails to ${flags['notify-email'].length} emails`,
            );
            await sendMergeFailedEmailNotification(
                flags['notify-email'],
                flags['project-name'] || '',
                failedBranchMap,
                baseBranch,
                (await this.getConfig()) as Config,
            );
        }

        this.error(`Found ${failedBranches.length} failed branches...`, {
            code: failedBranches.length.toString(),
        });
    }

    private createFailedBranchMap(
        failedBranches: string[],
        branchMap: { [p: string]: string },
    ) {
        const failedBranchMap: { [branch: string]: string } = {};
        for (const branch of failedBranches) {
            failedBranchMap[branch] = concatenateError(
                branchMap[branch],
                SMTP_MAX_ERROR_LINES,
            );
        }
        return failedBranchMap;
    }

    private filterIncludedBranches(branches: string[], includeRegex: string[]) {
        if (includeRegex.length === 0) {
            return branches;
        }
        const regexPatterns = includeRegex.map((reg) => new RegExp(reg));
        return branches.filter((branch) =>
            regexPatterns.some((reg) => reg.test(branch)),
        );
    }

    private filterExcludeBranches(
        branches: string[],
        excludeRegex: string[],
        baseBranch: string,
    ) {
        if (excludeRegex.length === 0) {
            return branches;
        }
        const regexPatterns = excludeRegex.map((reg) => new RegExp(reg));
        return branches
            .filter((branch) => !regexPatterns.some((reg) => reg.test(branch)))
            .filter((branch) => branch !== baseBranch);
    }
}
