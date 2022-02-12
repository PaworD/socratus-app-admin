/**
 * @author Javlon Khalimjonov <khalimjanov@gmail.com>
 * @param str
 */
import { AnyObject } from '@/shared/models'

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
const camelToSnakeCase = (str: string) => str.replace(/[A-Z]/g, (letter, index) => { return index == 0 ? letter.toLowerCase() : '_'+ letter.toLowerCase()})

/**
 * Checks for plain object
 * @param obj
 */
const isObject = (obj: unknown): boolean => {
  return obj === Object(obj) && !Array.isArray(obj) && typeof obj !== 'function'
}

/**
 * Converts nested objects to camelCase
 * @param object
 */
const keysToCamel = (object: any): AnyObject => {
  if (isObject(object)) {
    const _tmp = {} as AnyObject

    Object.keys(object)
      .forEach((key) => {
        _tmp[snakeToCamel(key)] = keysToCamel(object[key])
      })

    return _tmp
  } else if (Array.isArray(object)) {
    return object.map((i) => {
      return keysToCamel(i)
    })
  }

  return object
}

/**
 * Converts nested objects to snakeCase
 * @param object
 */
const keysToSnake = (object: any): AnyObject => {
  if (isObject(object)) {
    const _tmp = {} as AnyObject

    Object.keys(object)
      .forEach((key) => {
        _tmp[camelToSnakeCase(key)] = keysToSnake(object[key])
      })

    return _tmp
  } else if (Array.isArray(object)) {
    return object.map((i) => {
      return keysToSnake(i)
    })
  }

  return object
}

/**
 *
 * Function to structure `data` and return `<T>`
 *
 * @author Javlon Khalimjonov <khalimjanov@gmail.com>
 * @param data
 */
export function composeModel<T>(data: any) {

  if (Array.isArray(data)) {
    return keysToCamel(data) as unknown as T[]
  }

  return keysToCamel(data) as unknown as T
    // if (Array.isArray(data)) {
    //     const _arrOfSanitizedObjs = [] as T[]
    //
    //     for (let i = 0; i < data.length; i++) {
    //         const _sanitizedObj = Object.fromEntries(Object.entries(data[i]).map(([key, value]) => {
    //             if (value === 'null') { value = null }
    //             if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
    //                 value =  Object.fromEntries(Object.entries(value as any).map(([k, v]) => {
    //                     return [snakeToCamel(String(k)) , v]
    //                 }))
    //                 return [snakeToCamel(String(key)) , value]
    //             } else if (Array.isArray(value) && value.length > 0) {
    //                 value = value.map((val) => Object.fromEntries(Object.entries(val as any).map(([k, v]) => {
    //                     return [snakeToCamel(String(k)) , v]
    //                 })))
    //                 return [snakeToCamel(String(key)) , value]
    //             } else {
    //                 return [snakeToCamel(String(key)) , value]
    //             }
    //             })
    //         ) as unknown as T
    //
    //         _arrOfSanitizedObjs.push(_sanitizedObj)
    //
    //     }
    //
    //     return _arrOfSanitizedObjs
    // } else {
    //     const _sanitizedObj = Object.fromEntries(Object.entries(data).map(([key, value]) => {
    //       if (Array.isArray(value) && value.length > 0 && typeof value[0] !== 'string') {
    //               value = value.map((val) => Object.fromEntries(Object.entries(val as any).map(([k, v]) => {
    //                   return [snakeToCamel(String(k)) , v]
    //               })))
    //               return [snakeToCamel(String(key)) , value]
    //           } else {
    //           return [snakeToCamel(String(key)) , value]
    //             }
    //         })
    //     )
    //     return _sanitizedObj as unknown as T
    // }
}

/**
 *
 * Function to destructure `data` and return raw object
 *
 * @author Javlon Khalimjonov <khalimjanov@gmail.com>
 * @param data
 */
export function decomposeModel<T>(data: any) {
  return keysToSnake(data) as unknown as T
        // const _desanitizedObj = Object.fromEntries(Object.entries(data).map(([key, value]) => {
        //       if (Array.isArray(value) && value.length > 0 && typeof value[0] !== 'string') {
        //
        //         value = value.map((val) => Object.fromEntries(Object.entries(val as any).map(([k, v]) => {
        //           return [camelToSnakeCase(String(k)) , v]
        //         })))
        //         return [camelToSnakeCase(String(key)) , value]
        //       } else if (typeof value === 'object' && value) {
        //         value = Object.entries(value).map(([key, val]) => {
        //           return {[key]: Object.fromEntries(Object.entries(val as any).map(([k, v]) => {
        //               return [camelToSnakeCase(String(k)) , v]
        //             }))}
        //         })
        //         return [camelToSnakeCase(key), (value as any)[0]]
        //       } else {
        //         return [camelToSnakeCase(String(key)) , value]
        //       }
        //     })
        // )
        // return _desanitizedObj as unknown as T
}

/**
 *
 * Translates object key/values to single string
 *
 * @param o - Object in which key and values will be joined with applicable `k`
 * @param k - Array of keys to map
 */
export const obsKeysToString = (o: AnyObject, k: string[]): string => {
  return Object.keys(o).map((k) => {
    return `${k} : ${o[k]}`
  }).join('\n')
}