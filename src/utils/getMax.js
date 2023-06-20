export const getMax = (data) => {
    return data?.reduce((acc, cur) => Math.max(acc, cur), Number.NEGATIVE_INFINITY)
}