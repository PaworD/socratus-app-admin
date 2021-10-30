import { Id } from "@/shared/models";
import { AxiosInstance } from "axios";
import { Axios } from "@/config";


export interface IService<T> {
    create(payload: T): Promise<T | string>
    delete(id: Id): Promise<string>
    get(): Promise< T | T[] | string>
    update(id: Id, payload: T): Promise<T | string>
}

/**
 * Base Service abstraction that every Model Based Service *should* extend
 *
 * @author Javlon Khalimjonov <khalimjonov2000@gmail.com>
 */
export abstract class AbstractService<T> implements IService<T>{

    /**
     * Instance of AxiosConfig
     * @protected
     */
    protected http: AxiosInstance

    protected constructor() {
        this.http = Axios((process.env.VUE_APP_SOCRATUS_APP_URL))
    }

    /**
     * Url of api (Not base url)
     */
    protected readonly url: string = ''

    /**
     * Create data with payload of <T>
     *
     * @author Javlon Khalimjonov <khalimjonov2000@gmail.com>
     */
    public abstract create(payload: T ): Promise<T | string>

    /**
     * Create data with payload of <T>
     *
     * @author Javlon Khalimjonov <khalimjonov2000@gmail.com>
     */
    public abstract delete(id: Id): Promise<string>

    /**
     * Fetch data of <T> from server
     *
     * @author Javlon Khalimjonov <khalimjonov2000@gmail.com>
     */
    public abstract get(): Promise< T | T[] |string>

    /**
     * Update data of <T>
     *
     * @author Javlon Khalimjonov <khalimjonov2000@gmail.com>
     */
    public abstract update(id: Id, payload: Partial<T>): Promise<T | string>
}