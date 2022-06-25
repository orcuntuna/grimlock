import Grimlock from '../src'

const data = JSON.stringify({
  id: 1,
  username: 'nick',
  email: 'nick@example.com',
})

const expected = {
  id: 1,
  username: 'nick',
  email: 'nick@example.com',
}

const data2 = JSON.stringify({ ...JSON.parse(data), id: 2 })
const expected2 = { ...expected, id: 2 }

class Collection extends Grimlock {
  protected beforeEach(item) {
    return JSON.parse(item)
  }

  protected schema(data) {
    return {
      id: data.id,
      username: data.username,
      email: data.email,
    }
  }
}

describe('before-each', () => {
  test('object', () => {
    expect(new Collection(data).toObject()).toMatchObject(expected)
  })

  test('array', () => {
    const dataArray = [data, data2]
    const expectedArray = [expected, expected2]
    expect(new Collection(dataArray).toArray()).toMatchObject(expectedArray)
  })
})
