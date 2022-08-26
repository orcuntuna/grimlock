import type { Response } from './types/Response';
import type { Data } from './types/Data';
import { Collection } from './types/Collection';
declare class Grimlock {
    private optionals;
    private data;
    private readonly schema;
    private includes;
    private excludes;
    constructor(data: Data, collection: Collection);
    with(property: string | Array<string>): this;
    without(property: string | Array<string>): this;
    toArray(data?: any): Array<Response>;
    toObject(data?: any): Response;
    private prepareItem;
    private static execFunctions;
    private prepareItems;
}
export default Grimlock;
