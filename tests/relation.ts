import Grimlock from '../src'

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

class PostCollection extends Grimlock {
  protected schema(data) {
    return {
      id: data.id,
      title: data.title,
      body: data.body,
      user: new UserCollection(data.user).toObject(),
    }
  }
}

class UserCollection extends Grimlock {
  protected schema(data) {
    return {
      id: data.id,
      name: data.name,
      username: data.username,
    }
  }
}

describe('simple', () => {
  test('object', async () => {
    expect(await new PostCollection(data).toObject()).toMatchObject(expected)
  })

  test('array', async () => {
    const dataArray = [data, data2]
    const expectedArray = [expected, expected2]
    expect(await new PostCollection(dataArray).toArray()).toMatchObject(
      expectedArray
    )
  })
})
