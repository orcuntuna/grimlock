import Grimlock from '../src'
import { Collection } from '../src/types/Collection'

const data = {
  userId: 1,
  id: 1,
  title:
    'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
  body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
  createdAt: 1642971925494,
  updatedAt: 1642971937768,
}

const expected = {
  userId: 1,
  id: 1,
  title:
    'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
  body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
}

const data2 = { ...data, id: 2 }
const expected2 = { ...expected, id: 2 }

const collection: Collection = {
  schema: data => ({
    userId: data.userId,
    id: data.id,
    title: data.title,
    body: data.body,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
  }),
}

describe('multi-without', () => {
  test('object', () => {
    expect(
      new Grimlock(data, collection)
        .without(['createdAt', 'updatedAt'])
        .toObject()
    ).toMatchObject(expected)
  })

  test('array', () => {
    const dataArray = [data, data2]
    const expectedArray = [expected, expected2]
    expect(
      new Grimlock(dataArray, collection)
        .without(['createdAt', 'updatedAt'])
        .toArray()
    ).toMatchObject(expectedArray)
  })
})
