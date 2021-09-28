import {AxiosResponse} from "axios";

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
        return response.data.message
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