import type { SchemaOutput } from './types/Schema';
import type { Response } from './types/Response';
import type { Data } from './types/Data';
declare class Grimlock {
    protected optionals: Array<string>;
    protected data: Data;
    private includes;
    private excludes;
    constructor(data: Data);
    protected schema(_data: Data): SchemaOutput;
    with(property: string | Array<string>): this;
    without(property: string | Array<string>): this;
    toArray(data?: any): Array<Response>;
    toObject(data?: any): Response;
    protected beforeEach<T>(item: T): T;
    private prepareItem;
    private execFunctions;
    private prepareItems;
}
export default Grimlock;
