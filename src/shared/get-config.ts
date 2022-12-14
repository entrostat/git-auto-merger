import * as fs from 'fs-extra';

export async function getConfig(filePath: string): Promise<any> {
    try {
        return await fs.readJSON(filePath);
    } catch {
        return {};
    }
}
