import {AnyObject} from "@/shared/models";

export const moneyMask = (currency = 'PLN', masked = false): AnyObject => {
    return {
        precision: 0,
        decimal: ",",
        thousands: " ",
        prefix: `${currency} `,
        masked
    }
}
