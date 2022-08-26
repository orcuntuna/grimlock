import { Data } from './Data';
import { SchemaOutput } from './Schema';
export declare type Collection = {
    optionals?: Array<string>;
    schema: (data: Data) => SchemaOutput;
};
