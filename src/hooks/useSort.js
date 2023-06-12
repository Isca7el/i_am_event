export const useSort = (value, sortParameter) => {
    let sortData = {};
    switch (sortParameter) {
        case 'expensive':
            return sortData = {flights: value?.flights?.sort((a, b) => b.price - a.price)}
        case 'cheap':
            return sortData = {flights: value?.flights?.sort((a, b) => a.price - b.price)};
        case 'min':
            return {flights: value?.flights?.sort((a, b) => b.stops - a.stops)};
        case 'max':
            return {flights: value?.flights?.sort((a, b) => a.stops - b.stops)};
        default:
            return sortData = value;
    }
}