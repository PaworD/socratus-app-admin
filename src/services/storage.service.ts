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
}


@injectable()
export class LocalStorageService implements ILocalStorageService{

    public setItem(key: string, value: AnyObject | string): void {
        localStorage.setItem(key, String(value))
    }

    public getItem(key: string): string {
        return localStorage.getItem(key)!
    }
}