import { Command, Flags } from '@oclif/core';

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
                'The regex pattern(s) to exclude when running a merge. For example: /^main$/',
            multiple: true,
            required: false,
        }),
        'include-pattern': Flags.string({
            char: 'i',
            description:
                'The regex patterns(s) to include when running a merge. For example: /\\/feature\\/.+/',
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

        // https://stackoverflow.com/a/501461/3016520
    }
}
