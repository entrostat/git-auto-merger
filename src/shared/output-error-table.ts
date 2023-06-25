import { CliUx } from '@oclif/core';
import { concatenateError } from './concatenate-error';

export const ERROR_OUTPUT_TABLE_MAX_ERROR_LINES = 40;

export function outputErrorTable(
    failedBranches: string[],
    branchMap: { [p: string]: string },
) {
    const tableData: { error: string; branch: string }[] = [];
    for (const failedBranch of failedBranches) {
        const error = concatenateError(
            branchMap[failedBranch],
            ERROR_OUTPUT_TABLE_MAX_ERROR_LINES,
        );

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
