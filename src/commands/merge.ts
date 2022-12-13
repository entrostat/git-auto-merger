import { Command, Flags } from '@oclif/core';
import { getGitBranches } from '../shared/git/get-git-branches';
import { mergeBranch } from '../shared/git/merge-branch';
import { outputErrorTable } from '../shared/output-error-table';

export default class Merge extends Command {
    static description = `Tries to merge the base branch into all of the other ones that have been specified or match a pattern.

        Exclusion takes preference over inclusion, so we will ignore a branch if it triggers in the include and exclude patterns.`;

    static examples = ['<%= config.bin %> <%= command.id %>'];

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
        'notification-project-name': Flags.string({
            char: 'n',
            description:
                'The name of the project when sending the notification',
            relationships: [
                {
                    type: 'some',
                    flags: ['send-notification-smtp'],
                },
            ],
        }),
        'send-notification-smtp': Flags.boolean({
            char: 'm',
            description:
                'Send a notification via SMTP if the merge cannot take place',
            default: false,
        }),
        commit: Flags.boolean({
            char: 'c',
            description: 'Commit the changes when the merge takes place',
            default: false,
        }),
        'push-commit': Flags.boolean({
            char: 'p',
            description: 'Push the changes of the merge',
            default: false,
        }),
    };

    static args = [];

    public async run(): Promise<void> {
        const { flags } = await this.parse(Merge);

        this.log(`> Exclusion Rules: ${flags['exclude-pattern']?.length || 0}
> Inclusion Rules: ${flags['include-pattern']?.length || 0}
        `);

        const baseBranch = flags['base-branch'];

        const branches = await getGitBranches();

        this.log(`Found a total of ${branches.length} branches`);

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
            `After processing exclude filters, we have ${branchesToProcess.length} branches:`,
        );

        branchesToProcess.forEach((branch) => this.log(` > ${branch}`));

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
            }
        }

        if (failedBranches.length === 0) {
            this.log('No failed branches, happy days!');
            this.exit(0);
        }

        this.log(`Failed to merge ${failedBranches.length} branches`);
        outputErrorTable(failedBranches, branchMap);

        this.error(`Found ${failedBranches.length} failed branches...`, {
            code: failedBranches.length.toString(),
        });
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
