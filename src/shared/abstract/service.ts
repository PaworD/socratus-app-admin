import { Identifier } from "@/shared/models";


export interface IService<T> {
    create(payload: T): Promise<T | string>
    delete(id: Identifier): Promise<string>
    get(): Promise<T | string>
    update(payload: T): Promise<T | string>
}

/**
 * Base Service abstraction that every Service *should* extend
 *
 * @author Javlon Khalimjonov <khalimjonov2000@gmail.com>
 */
export abstract class AbstractService<T> implements IService<T>{

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
    public abstract delete(id: Identifier): Promise<string>

    /**
     * Fetch data of <T> from server
     *
     * @author Javlon Khalimjonov <khalimjonov2000@gmail.com>
     */
    public abstract get(): Promise<T | string>

    /**
     * Update data of <T>
     *
     * @author Javlon Khalimjonov <khalimjonov2000@gmail.com>
     */
    public abstract update(payload: Partial<T>): Promise<T | string>
}