// UI and rendering-related utilities

/**
 * Wrap long text with line breaks
 */
function wrapLongText(text, maxLength = 50) {
    if (!text || text.length <= maxLength) return text;

    const words = text.split(' ');
    const lines = [];
    let currentLine = '';

    for (const word of words) {
        if ((currentLine + word).length <= maxLength) {
            currentLine += (currentLine ? ' ' : '') + word;
        } else {
            if (currentLine) lines.push(currentLine);
            currentLine = word;
        }
    }

    if (currentLine) lines.push(currentLine);
    return lines.join('<br>');
}

// Continue with other UI functions...

