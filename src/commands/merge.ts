import { Command, Flags, CliUx } from '@oclif/core';
import { executeCommand } from '../shared/execute-command';
import { safeCommand } from '../shared/safe-command';

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
        'send-notification-smtp': Flags.boolean({
            char: 'm',
            description:
                'Send a notification via SMTP if the merge cannot take place',
            default: false,
        }),
    };

    static args = [];

    public async run(): Promise<void> {
        const { flags } = await this.parse(Merge);

        this.log(`> Exclusion Rules: ${flags['exclude-pattern']?.length || 0}
> Inclusion Rules: ${flags['include-pattern']?.length || 0}
        `);

        const branches = await executeCommand(
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
            flags['base-branch'],
        );

        // https://stackoverflow.com/a/501461/3016520

        const branchMap: { [branch: string]: string } = {};
        const failedBranches: string[] = [];
        for (const branch of branchesToProcess) {
            try {
                await executeCommand(
                    `git checkout ${branch}`,
                    console.log,
                    console.error,
                );
                branchMap[branch] = await executeCommand(
                    `git merge --no-commit ${flags['base-branch']}`,
                    console.log,
                    console.error,
                );
            } catch (e) {
                branchMap[branch] = ((e as any) || {}).message;
                failedBranches.push(branch);
                branchMap[branch] =
                    branchMap[branch] ||
                    (await safeCommand(
                        'git status',
                        console.log,
                        console.error,
                    )) ||
                    '';
                await safeCommand(
                    'git merge --abort',
                    console.log,
                    console.error,
                );
            }
        }

        this.log(`Failed to merge ${failedBranches.length} branches`);

        const tableData = [];
        for (const failedBranch of failedBranches) {
            tableData.push({
                branch: failedBranch,
                error: branchMap[failedBranch],
            });
        }
        CliUx.Table.table(tableData, {
            branch: {
                header: 'Branch',
            },
            error: {
                header: 'Error',
            },
        });

        if (failedBranches.length === 0) {
            this.log('No failed branches, happy days!');
            this.exit(0);
        }

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
