import Grimlock from '../src'
import { Collection } from '../src/types/Collection'

const data = {
  id: 1,
  name: 'John',
  surname: 'Watson',
  birthday: 1992,
}

const expected = {
  id: 1,
  name: 'John',
  surname: 'Watson',
  age: new Date().getFullYear() - 1992,
}

const data2 = { ...data, id: 2 }
const expected2 = { ...expected, id: 2 }

const collection: Collection = {
  schema: data => ({
    id: data.id,
    name: data.name,
    surname: data.surname,
    age: function () {
      return new Date().getFullYear() - data.birthday
    },
  }),
}

describe('function', () => {
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
