/**
 * @author Javlon Khalimjonov <khalimjanov@gmail.com>
 * @param str
 */
const snakeToCamel = (str: string) =>
    str.toLowerCase().replace(/([-_][a-z])/g, group =>
        group
            .toUpperCase()
            .replace('-', '')
            .replace('_', '')
    )

/**
 * @author Javlon Khalimjonov <khalimjanov@gmail.com>
 * @param str
 */
const camelToSnakeCase = (str: string) => str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);

/**
 *
 * Function to structure `data` and return <T>
 *
 * @author Javlon Khalimjonov <khalimjanov@gmail.com>
 * @param data
 */
export function composeModel<T>(data: any) {

    if (Array.isArray(data)) {
        const _arrOfSanitizedObjs = [] as T[]

        for (let i = 0; i < data.length; i++) {
            const _sanitizedObj = Object.fromEntries(Object.entries(data[i]).map(([key, value]) => {
                // if (typeof value !== 'string') {
                //     const deep = Object.fromEntries(Object.entries(value as any).map(([k, v]) => {
                //         return [snakeToCamel(String(k)) , v]
                //     }))
                //     return [snakeToCamel(String(key)) , deep]
                // } else {
                    return [snakeToCamel(String(key)) , value]
                // }
                })
            ) as unknown as T

            _arrOfSanitizedObjs.push(_sanitizedObj)

        }

        return _arrOfSanitizedObjs
    } else {
        const _sanitizedObj = Object.fromEntries(Object.entries(data).map(([key, value]) => {
            // if (typeof value !== 'string') {
            //     const deep = Object.fromEntries(Object.entries(value as any).map(([k, v]) => {
            //         return [snakeToCamel(String(k)) , v]
            //     }))
            //     return [snakeToCamel(String(key)) , deep]
            // } else {
                return [snakeToCamel(String(key)) , value]
            // }
            })
        )
        return _sanitizedObj as unknown as T
    }
}

/**
 *
 * Function to destructure `data` and return raw object
 *
 * @author Javlon Khalimjonov <khalimjanov@gmail.com>
 * @param data
 */
export function decomposeModel<T>(data: any) {
        const _desanitizedObj = Object.fromEntries(Object.entries(data).map(([key, value]) => {
                return [camelToSnakeCase(String(key)) , value]
            })
        )
        return _desanitizedObj as unknown as T
}