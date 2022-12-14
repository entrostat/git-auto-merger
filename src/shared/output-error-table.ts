import { CliUx } from '@oclif/core';

export function outputErrorTable(
    failedBranches: string[],
    branchMap: { [p: string]: string },
) {
    const tableData: { error: string; branch: string }[] = [];
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
}
