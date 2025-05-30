/** values are empty or not */
export const isEmpty = value =>
    value === undefined ||
    value === null ||
    (typeof value === 'object' && Object.keys(value).length === 0) ||
    (typeof value === 'string' && value.trim().length === 0) ||
    (typeof value === 'number' && value !== 0 && value.length === 0);



/** values are empty or not */
export const sendResponse = (res, data = {}) => {
    res.status(data.statusCode).json(data)
}