import axios, {AxiosInstance} from "axios";
import { AnyObject } from "@/shared/models";

export interface AxiosConfig {
    headers: AnyObject
}

export const Axios = (baseUrl: string, config?: AxiosConfig): AxiosInstance => {
    return axios.create({
        baseURL: baseUrl,
        headers: {
            "Content-Type" : 'application/json'
        }
    })
}
