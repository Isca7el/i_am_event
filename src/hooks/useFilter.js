export const useFilter = (data, prop, value) => {
    return {
        flights: data.flights?.filter(item => {
            if (typeof (item[prop]) === 'string') {
                return parseInt(item[prop]) >= value
            } else {
                 return item[prop] >= value
            }
        })
    }
}