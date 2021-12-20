import { injectable } from "inversify-props"
import { AnyObject } from "@/shared/models"

/**
 * Local storage service
 *
 * @author javlon Khalimjonov <khalimjanov.code@gmail.com>
 */

export interface ILocalStorageService {
    setItem(key: string, value: AnyObject | string): void
    getItem(key: string): string
    removeItem(key: string): void
    clearKeys(): void
}


@injectable()
export class LocalStorageService implements ILocalStorageService {

    /**
     * Set key/value for local storage
     * @param key
     * @param value
     */
    public setItem(key: string, value: AnyObject | string): void {
        localStorage.setItem(key, String(value))
    }

    /**
     * Get local storage item by key
     * @param key
     */
    public getItem(key: string): string {
        return localStorage.getItem(key)!
    }

    /**
     * Removes key/value by key
     * @param key
     */
    public removeItem(key: string): void {
        localStorage.removeItem(key)
    }

    /**
     * Clears local storage's key/values
     */
    public clearKeys(): void {
        localStorage.clear()
    }
}