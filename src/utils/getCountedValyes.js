export const getCountedValues = (data, prop) => {
    return data?.map(item => {
            if (typeof (item[prop] === 'string')) {
                return  parseInt(item[prop]);
            }
            return item[prop]
        }
    )
}