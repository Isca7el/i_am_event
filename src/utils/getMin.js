export const getMin = (data) => {
    return data?.reduce((acc, cur) => Math.min(acc, cur), Number.POSITIVE_INFINITY)
}