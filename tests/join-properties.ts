import Grimlock from '../src'

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

class Collection extends Grimlock {
  protected schema(data) {
    return {
      id: data.id,
      full_name: `${data.name} ${data.surname}`,
      age: data.age,
    }
  }
}

describe('join-properties', () => {
  test('object', async () => {
    expect(await new Collection(data).toObject()).toMatchObject(expected)
  })

  test('array', async () => {
    const dataArray = [data, data2]
    const expectedArray = [expected, expected2]
    expect(await new Collection(dataArray).toArray()).toMatchObject(
      expectedArray
    )
  })
})
