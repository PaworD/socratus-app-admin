import {AxiosResponse} from "axios";
import {AnyObject} from "@/shared/models";

export enum ResponseCode {
    NOTFOUND = 404,
    SERVERERROR = 500
}

export const resolveWithResponse: Record<ResponseCode, string> = {
    [ResponseCode.NOTFOUND] : 'Current url not found',
    [ResponseCode.SERVERERROR] : 'Server Error has occured'
}

export const hasResponseFailed = (response: AxiosResponse): boolean => {
    if (response.status === 200 || response.status === 201) {
        return false
    }
        return true
}

export const resolveWithError = (response: AxiosResponse) : string => {
    if(process.env.VUE_APP_ENV == 'local') {
        return response.data
    } else {
        switch (response.status) {
            case 404:
                return resolveWithResponse[ResponseCode.NOTFOUND]
            case 500:
                return resolveWithResponse[ResponseCode.SERVERERROR]
            default:
                return 'Unexpected Error'
        }
    }
}

export class ValidationError extends Error {
    protected payload: AnyObject
    constructor(payload: AnyObject) {
        super('[Validation Error]')
        this.payload = payload.response.data.message

        Object.setPrototypeOf(this, ValidationError.prototype);
    }

}
