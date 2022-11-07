export const customTheme = (theme) => ({
    ...theme,
    colors: {
        ...theme.colors,
        primary: '#595959',
        primary25: '#ccc',
        primary50: '#f0f0f0',
    }
});

export const ariaStyle = {
    blockquote: {
        fontStyle: 'italic',
        fontSize: '.75rem',
        margin: '1rem 0',
    },
    label: {
        fontSize: '.75rem',
        fontWeight: 'bold',
        lineHeight: 2,
    },
};
