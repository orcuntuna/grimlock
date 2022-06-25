# Grimlock

Grimlock is a data transformer for JavaScript. It can be used to format your data according to your collection schemas. Grimlock is mostly for back-end usage and provides consistency with the response data of the API.

- [Installing](#installing)
- [Basic Example](#basic-example)
- [Features](#features)
  - [Key Value Manipulation](#key-value-manipulation)
  - [Optional Values and With](#optional-values-and-with)
  - [Without](#without)
  - [Function Values](#function-values)
  - [Relations](#relations)
- [License](#license)

## Installing

Using npm:

```bash
$ npm install axios
```

Using yarn:

```bash
$ yarn add axios
```

Using pnpm:

```bash
$ pnpm add axios
```

## Basic Example

```typescript jsx
import Grimlock from 'grimlock'

class PostCollection extends Grimlock {
  protected schema(data) {
    return {
      id: data.id,
      userId: data.userId,
      title: data.title,
      body: data.body
    }
  }
}

// Object transformation
const single = new PostCollection(post).toObject()

// Array<Object> transformation
const multiple = new PostCollection(posts).toArray()
```

## Features

- [Key Value Manipulation](#key-value-manipulation)
- [Optional Values and With](#optional-values-and-with)
- [Without](#without)
- [Function Values](#function-values)
- [Relations](#relations)

### Key Value Manipulation

The output value and the input value do not have to be the same. In this example input data has the `name` and `surname` but output data has the `full_name`.

```typescript jsx
class Collection extends Grimlock {
  protected schema(data) {
    return {
      id: data.id,
      full_name: `${data.name} ${data.surname}`,
      age: data.age,
    }
  }
}

const data = new Collection(user).toObject()
```

| Input Data                                         | Output Data                    |
|----------------------------------------------------|--------------------------------|
| - id<br/>- name<br/>- surname<br/>- age<br/> | - id<br/>- full_name<br/>- age |

### Optional Values and With

If you need optional properties in your collection, you should add your keys of optional properties to `optionals` variable in your extended Grimlock class. Now, Optional properties will not be included in transformed response data.

If you want to include this optional data later, you can use `with` method. `with` method can be use with single or multiple property.

```typescript jsx
class Collection extends Grimlock {
  protected optionals = ['title', 'body']
  
  protected schema(data) {
    return {
      id: data.id,
      userId: data.userId,
      title: data.title,
      body: data.body,
    }
  }
}

const data = new Collection(post).with('title').toObject()
```

| Input Data                                            | Output Data                                    |
|-------------------------------------------------------|------------------------------------------------|
| - id<br/>- userId<br/>- title<br/>- body<br/>- rating | - id<br/>- userId<br/>- title |

In that case, `title` and `body` are optional but `title` has been added into the `with` method. So only `title` will be in output data. 

**Note:** An array can be sent to `with` method for add more than one optional value.

```typescript jsx
const data = new Collection(post).with(['title', 'body']).toObject()
```

### Without

Sometimes you may not need some properties. `without` method excludes some properties from output data during translation. These properties do not have to be optional, available for all properties.

```typescript jsx
class Collection extends Grimlock {
  protected optionals = ['title', 'body']
  
  protected schema(data) {
    return {
      id: data.id,
      userId: data.userId,
      title: data.title,
      body: data.body,
    }
  }
}

const data = new Collection(post).without('userId').toObject()
```

| Input Data                                            | Output Data                 |
|-------------------------------------------------------|-----------------------------|
| - id<br/>- userId<br/>- title<br/>- body<br/>- rating | - id<br/>- title<br/>- body |

**Note:** An array can be sent to `without` method for add more than one optional value like `with`.

```typescript jsx
const data = new Collection(post).without(['id', 'userId']).toObject()
```

**Note**: You can use `with` and `without` at the same time.

```typescript jsx
const data = new Collection(post).with(['title', 'body']).without(['id', 'userId']).toObject()
```

### Function Values

If a value is a function in the collection schema, Grimlock run this function and use returned value. Async functions and promises aren't support yet.

```typescript jsx
class Collection extends Grimlock {
  protected schema(data) {
    return {
      id: data.id,
      name: data.name,
      surname: data.surname,
      age: function () {
        return new Date().getFullYear() - data.birthday
      },
    }
  }
}
```

### Relations

In the real world, we have a lot of resource/model and these models are related to each other. Grimlock supports the related collections.

```typescript jsx
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
```

**Note:** Not only `toObject` but also `toArray` can be used in the collection.

## License

[Apache-2.0 license](https://github.com/orcuntuna/grimlock/blob/HEAD/LICENSE)
