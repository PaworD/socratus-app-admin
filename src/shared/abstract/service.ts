import { AxiosInstance } from "axios";

import { Axios } from "@/config";

import { AnyObject, Id, Pageable } from '@/shared/models'


/**
 * @author Javlon Khalimjonov <javlon.khalimjonov@movecloser.pl>
 */
export interface IService<T> {
    /**
     * Create data with payload of <T>
     */
    create(payload: T): Promise<T | string>

    /**
     * Handles delete request with optional identifier.
     */
    delete(id: Id): Promise<string>

    /**
     * Fetch data of <T> from server
     */
    get(query?: AnyObject): Promise< { results: T; meta: Pageable } | { results: T[]; meta: Pageable } | string>

    /**
     * Update data of <T>
     */
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
     * @inheritDoc
     */
    public abstract create(payload: T ): Promise<T | string>

    /**
     * @inheritDoc
     */
    public abstract delete(id: Id): Promise<string>

    /**
     * @inheritDoc
     */
    public abstract get(query?: AnyObject): Promise< { results: T; meta: Pageable } | { results: T[]; meta: Pageable } |string>

    /**
     * @inheritDoc
     */
    public abstract update(id: Id, payload: Partial<T>): Promise<T | string>
}