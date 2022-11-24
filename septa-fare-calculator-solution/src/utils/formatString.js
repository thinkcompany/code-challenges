export const humanize = (str) => {
    const words = str.split('_');
    const n = words.length;
    for (let i = 0; i < n; i++) {
        words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
    }

    return words.join(' ');
}
