import Grimlock from '../src'

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
  id: 1,
  title:
    'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
  body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
  createdAt: 1642971925494,
  updatedAt: 1642971937768,
}

const data2 = { ...data, id: 2 }
const expected2 = { ...expected, id: 2 }

class Collection extends Grimlock {
  protected optionals = ['userId', 'createdAt', 'updatedAt']

  protected schema(data) {
    return {
      userId: data.userId,
      id: data.id,
      title: data.title,
      body: data.body,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    }
  }
}

describe('multi-with', () => {
  test('object', () => {
    expect(
      new Collection(data).with(['createdAt', 'updatedAt']).toObject()
    ).toMatchObject(expected)
  })

  test('array', () => {
    const dataArray = [data, data2]
    const expectedArray = [expected, expected2]
    expect(
      new Collection(dataArray).with(['createdAt', 'updatedAt']).toArray()
    ).toMatchObject(expectedArray)
  })
})
