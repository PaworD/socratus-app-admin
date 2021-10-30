import axios, {AxiosInstance} from "axios";
import { AnyObject } from "@/shared/models";

/**
 * Configuration rules for AXIOS
 */
export interface AxiosConfig {
    headers: AnyObject
}

/**
 *
 * Axios instance with necessary **AxiosConfig**
 *
 * @param baseUrl
 * @param config
 * @constructor
 */
export const Axios = (baseUrl: string, config?: AxiosConfig): AxiosInstance => {

    const _instance = axios.create({
        baseURL: baseUrl,
        headers: {
            "Content-Type" : 'application/json'
        },
        withCredentials: true
    })

    _instance.interceptors.request.use((config) => {
        const tenant = window.localStorage.getItem('tenant')
        const access = window.localStorage.getItem('access')

        // Timezone to pass to the server
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone

        if (tenant) {
            config.headers['Tenant'] = tenant
        }
        if (access) {
            config.headers['Authorization'] = `Bearer ${access}`
        }

        config.headers['Timezone'] = timezone

        return config
    }, (error) => {
        return Promise.reject(error)
    })

    return _instance
}
