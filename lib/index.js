"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Grimlock {
    constructor(data, collection) {
        this.optionals = [];
        this.includes = [];
        this.excludes = [];
        this.data = data;
        this.optionals = collection.optionals || [];
        this.schema = collection.schema;
    }
    with(property) {
        this.includes.push(...(Array.isArray(property) ? property : [property]));
        return this;
    }
    without(property) {
        this.excludes.push(...(Array.isArray(property) ? property : [property]));
        return this;
    }
    toArray(data = this.data) {
        if (!data && !Array.isArray(data)) {
            return [];
        }
        return this.prepareItems(data);
    }
    toObject(data = this.data) {
        if (!data) {
            return {};
        }
        return this.prepareItem(data);
    }
    prepareItem(item) {
        let schema = this.schema(item);
        const properties = Object.keys(schema).filter(key => {
            if (this.excludes.includes(key)) {
                return false;
            }
            if (this.optionals.includes(key) && !this.includes.includes(key)) {
                return false;
            }
            return true;
        });
        schema = Object.fromEntries(Object.entries(schema).filter(([key]) => {
            return properties.includes(key);
        }));
        schema = Grimlock.execFunctions(schema);
        return schema;
    }
    static execFunctions(item) {
        for (const propertyIndex in item) {
            if (item[propertyIndex] && typeof item[propertyIndex] === 'function') {
                item[propertyIndex] = item[propertyIndex]();
            }
        }
        return item;
    }
    prepareItems(items) {
        const _items = [];
        for (const item of items) {
            _items.push(this.prepareItem(item));
        }
        return _items;
    }
}
exports.default = Grimlock;
