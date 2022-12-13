import { Command, Flags } from '@oclif/core';
import { BaseCommand } from '../../../shared/base-command';

export default class SetCredentialsSmtp extends BaseCommand {
    static description =
        'Set the SMTP credentials that should be used to send the alert';

    static examples = ['<%= config.bin %> <%= command.id %>'];

    static flags = {
        host: Flags.string({
            char: 'h',
            description: 'The SMTP host to connect to',
            required: true,
        }),
        username: Flags.string({
            char: 'u',
            description: 'The email username',
            required: true,
        }),
        password: Flags.string({
            char: 'p',
            description: 'The email password',
            required: true,
        }),
        port: Flags.integer({
            char: 'P',
            description: 'The SMTP port to use',
            required: true,
        }),
        tls: Flags.boolean({
            char: 's',
            description: 'TLS enabled',
            default: false,
        }),
    };

    static args = [];

    public async run(): Promise<void> {
        const { flags } = await this.parse(SetCredentialsSmtp);
        await this.mergeConfig({
            smtp: {
                username: flags.username,
                password: flags.password,
                host: flags.host,
                port: Number(flags.port),
                tls: flags.tls,
            },
        });
        this.log('SMTP details saved successfully');
    }
}
