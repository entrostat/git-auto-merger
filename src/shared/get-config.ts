import * as fs from 'fs-extra';
import * as path from 'node:path';

export async function getConfig(folderPath: string): Promise<any> {
    try {
        return await fs.readJSON(path.join(folderPath, 'config.json'));
    } catch {
        return {};
    }
}
