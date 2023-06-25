export function concatenateError(error: string, maxLines: number) {
    const lines = error.split('\n');
    if (lines.length > maxLines) {
        const halfLines = Math.round(maxLines / 2);
        error =
            lines.slice(0, halfLines).join('\n') +
            '\n\n... CONCATENATED OUTPUT ... \n\n' +
            lines.slice(lines.length - halfLines, lines.length).join('\n');
    }
    return error;
}
