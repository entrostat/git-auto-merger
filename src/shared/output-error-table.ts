import { CliUx } from '@oclif/core';

export const ERROR_OUTPUT_TABLE_MAX_ERROR_LINES = 40;

export function outputErrorTable(
    failedBranches: string[],
    branchMap: { [p: string]: string },
) {
    const tableData: { error: string; branch: string }[] = [];
    for (const failedBranch of failedBranches) {
        let error = branchMap[failedBranch];
        const lines = error.split('\n');
        if (lines.length > ERROR_OUTPUT_TABLE_MAX_ERROR_LINES) {
            const halfLines = Math.round(
                ERROR_OUTPUT_TABLE_MAX_ERROR_LINES / 2,
            );
            error =
                lines.slice(0, halfLines).join('\n') +
                '\n\n... CONCATENATED OUTPUT ... \n\n' +
                lines.slice(lines.length - halfLines, lines.length).join('\n');
        }

        tableData.push({
            branch: failedBranch,
            error,
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
}
