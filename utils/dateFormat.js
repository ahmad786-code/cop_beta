export const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: '2-digit', month: 'short', year: '2-digit' };
    return date.toLocaleDateString('en-US', options).replace(',', '');
}