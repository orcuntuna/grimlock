import Grimlock from '../src'

const hello = (who: string): Promise<string> => {
  return new Promise<string>(resolve => {
    setTimeout(() => {
      resolve(`hello ${who}`)
    }, 50)
  })
}

const data = {
  id: 1,
  name: 'John',
  surname: 'Watson',
  message: 'world',
}

const expected = {
  id: 1,
  name: 'John',
  surname: 'Watson',
  message: 'hello world',
}

const data2 = { ...data, id: 2 }
const expected2 = { ...expected, id: 2 }

class Collection extends Grimlock {
  protected schema(data) {
    return {
      id: data.id,
      name: data.name,
      surname: data.surname,
      message: async function () {
        const message = await hello(data.message)
        return message
      },
    }
  }
}

describe('async-function', () => {
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
