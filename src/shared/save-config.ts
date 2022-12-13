import * as fs from 'fs-extra';
import * as path from 'node:path';

export async function saveConfig(filePath: string, config: any): Promise<any> {
    try {
        await fs.mkdirp(path.dirname(filePath));
        return await fs.writeJson(filePath, config);
    } catch {
        return {};
    }
}
