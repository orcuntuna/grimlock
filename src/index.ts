import type { SchemaOutput } from './types/Schema'
import type { Response } from './types/Response'
import type { Data } from './types/Data'
import { Collection } from './types/Collection'

class Grimlock {
  private optionals: Array<string> = []
  private data: Data
  private readonly schema: (data: Data) => SchemaOutput

  private includes: Array<string> = []
  private excludes: Array<string> = []

  constructor(data: Data, collection: Collection) {
    this.data = data
    this.optionals = collection.optionals || []
    this.schema = collection.schema
  }

  public with(property: string | Array<string>) {
    this.includes.push(...(Array.isArray(property) ? property : [property]))
    return this
  }

  public without(property: string | Array<string>) {
    this.excludes.push(...(Array.isArray(property) ? property : [property]))
    return this
  }

  public toArray(data = this.data): Array<Response> {
    if (!data && !Array.isArray(data)) {
      return []
    }
    return this.prepareItems(data)
  }

  public toObject(data = this.data): Response {
    if (!data) {
      return {}
    }
    return this.prepareItem(data)
  }

  private prepareItem(item: any): Response {
    let schema = this.schema(item)
    const properties = Object.keys(schema).filter(key => {
      if (this.excludes.includes(key)) {
        return false
      }
      if (this.optionals.includes(key) && !this.includes.includes(key)) {
        return false
      }
      return true
    })
    schema = Object.fromEntries(
      Object.entries(schema).filter(([key]) => {
        return properties.includes(key)
      })
    )
    schema = Grimlock.execFunctions(schema)
    return schema
  }

  private static execFunctions(item: SchemaOutput): SchemaOutput {
    for (const propertyIndex in item) {
      if (item[propertyIndex] && typeof item[propertyIndex] === 'function') {
        item[propertyIndex] = item[propertyIndex]()
      }
    }
    return item
  }

  private prepareItems(items: Array<any>) {
    const _items: Array<any> = []
    for (const item of items) {
      _items.push(this.prepareItem(item))
    }
    return _items
  }
}

export default Grimlock
