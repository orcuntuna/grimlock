import Grimlock from '../src'
import { Collection } from '../src/types/Collection'

const data = {
  id: 1,
  name: 'John',
  surname: 'Watson',
  age: 30,
}

const expected = {
  id: 1,
  full_name: 'John Watson',
  age: 30,
}

const data2 = { ...data, id: 2 }
const expected2 = { ...expected, id: 2 }

const collection: Collection = {
  schema: data => ({
    id: data.id,
    full_name: `${data.name} ${data.surname}`,
    age: data.age,
  }),
}

describe('join-properties', () => {
  test('object', () => {
    expect(new Grimlock(data, collection).toObject()).toMatchObject(expected)
  })

  test('array', () => {
    const dataArray = [data, data2]
    const expectedArray = [expected, expected2]
    expect(new Grimlock(dataArray, collection).toArray()).toMatchObject(
      expectedArray
    )
  })
})
