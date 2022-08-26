import Grimlock from '../src'
import { Collection } from '../src/types/Collection'

const data = {
  id: 1,
  user: {
    id: 3,
    username: 'john84',
    name: 'John Doe',
    email: 'johndoe@example.com',
  },
  title:
    'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
  body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
}

const expected = {
  id: 1,
  user: {
    id: 3,
    username: 'john84',
    name: 'John Doe',
  },
  title:
    'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
  body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
}

const data2 = { ...data, id: 2 }
const expected2 = { ...expected, id: 2 }

const userCollection: Collection = {
  schema: data => ({
    id: data.id,
    name: data.name,
    username: data.username,
  }),
}

const postCollection: Collection = {
  schema: data => ({
    id: data.id,
    title: data.title,
    body: data.body,
    user: new Grimlock(data.user, userCollection).toObject(),
  }),
}

describe('simple', () => {
  test('object', () => {
    expect(new Grimlock(data, postCollection).toObject()).toMatchObject(
      expected
    )
  })

  test('array', () => {
    const dataArray = [data, data2]
    const expectedArray = [expected, expected2]
    expect(new Grimlock(dataArray, postCollection).toArray()).toMatchObject(
      expectedArray
    )
  })
})
