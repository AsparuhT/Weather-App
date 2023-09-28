


// Cappitalize the first letter of each word
export const capitalizeWords = (str) => {
    return str.split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
}