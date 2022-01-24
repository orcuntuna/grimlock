import { isPromise } from './helpers/isPromise'
import { SchemaOutput } from './types/Schema'
import { Response } from './types/Response'
import { Data } from './types/Data'

class Grimlock {
  protected optionals: Array<string> = []
  protected data: Data

  private includes: Array<string> = []
  private excludes: Array<string> = []

  constructor(data: Data) {
    this.data = data
  }

  protected schema(_data: Data): SchemaOutput {
    return {}
  }

  public with(property: string | Array<string>) {
    this.includes.push(...(Array.isArray(property) ? property : [property]))
    return this
  }

  public without(property: string | Array<string>) {
    this.excludes.push(...(Array.isArray(property) ? property : [property]))
    return this
  }

  public async toArray(data = this.data): Promise<Array<Response>> {
    if (!data && !Array.isArray(data)) {
      return []
    }
    return this.prepareItems(data)
  }

  public async toObject(data = this.data): Promise<Response> {
    if (!data) {
      return {}
    }
    return this.prepareItem(data)
  }

  protected beforeEach<T>(item: T): T {
    return item
  }

  private async prepareItem(item: any): Promise<Response> {
    item = this.beforeEach(item)
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
    schema = await this.execFunctions(schema)
    return schema
  }

  private async execFunctions(item: SchemaOutput): Promise<SchemaOutput> {
    for (const propertyIndex in item) {
      if (item[propertyIndex] && typeof item[propertyIndex] === 'function') {
        item[propertyIndex] = await item[propertyIndex]()
      } else if (item[propertyIndex] && isPromise(item[propertyIndex])) {
        item[propertyIndex] = await item[propertyIndex]
      }
    }
    return item
  }

  private async prepareItems(items: Array<any>) {
    const _items: Array<any> = []
    for (const item of items) {
      _items.push(await this.prepareItem(item))
    }
    return _items
  }
}

export default Grimlock
