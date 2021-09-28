import { AnyObject } from "@/shared/models";

export const snakeToCamel = (str: string) =>
    str.toLowerCase().replace(/([-_][a-z])/g, group =>
        group
            .toUpperCase()
            .replace('-', '')
            .replace('_', '')
    )


export function composeModel<T>(data: AnyObject) {
    const _sanitizedObj = Object.fromEntries(Object.entries(data).map(([key, value]) => {
        return [snakeToCamel(String(key)) , value]
    })
    )
    return _sanitizedObj as unknown as T
}