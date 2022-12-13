import { Command } from '@oclif/core';
import { getConfig } from './get-config';
import * as path from 'path';
import { saveConfig } from './save-config';
import { Config } from './config';

export abstract class BaseCommand extends Command {
    protected CONFIG_NAME = 'config.json';

    async getConfig(): Promise<Partial<Config>> {
        return await getConfig(
            path.join(this.config.configDir, this.CONFIG_NAME),
        );
    }

    async saveConfig(config: Partial<Config>) {
        await saveConfig(
            path.join(this.config.configDir, this.CONFIG_NAME),
            config,
        );
    }

    async mergeConfig(newKeys: Partial<Config>) {
        const original = await this.getConfig();
        await this.saveConfig({
            ...original,
            ...newKeys,
        });
    }
}
