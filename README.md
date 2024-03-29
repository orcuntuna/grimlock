# Grimlock

Grimlock is a relational data transformer for JavaScript/TypeScript. It can be used to format your data according to your collection schemas. Grimlock is mostly for back-end usage and provides consistency with the response data of the API.

- [Installing](#installing)
- [Basic Example](#basic-example)
- [Features](#features)
  - [Key Value Manipulation](#key-value-manipulation)
  - [Optional Values and With](#optional-values-and-with)
  - [Without](#without)
  - [Function Values](#function-values)
  - [Relations](#relations)
- [API](#api)
- [License](#license)

## Installing

Using npm:

```bash
$ npm install grimlock
```

Using yarn:

```bash
$ yarn add grimlock
```

Using pnpm:

```bash
$ pnpm add grimlock
```

## Basic Example

```typescript jsx
import Grimlock from 'grimlock'

const simpleCollection = {
  schema: data => ({
    id: data.id,
    userId: data.userId,
    title: data.title,
    body: data.body
  }),
}

// Object transformation
const single = new Grimlock(post, simpleCollection).toObject()

// Array<Object> transformation
const multiple = new Grimlock(posts, simpleCollection).toArray()
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
const userCollection = {
  schema: data => ({
    id: data.id,
    full_name: `${data.name} ${data.surname}`,
    age: data.age,
  }),
}

const data = new Grimlock(user, userCollection).toObject()
```

| Input Data                                         | Output Data                    |
|----------------------------------------------------|--------------------------------|
| - id<br/>- name<br/>- surname<br/>- age<br/> | - id<br/>- full_name<br/>- age |

### Optional Values and With

If you need optional properties in your collection, you should add your keys of optional properties to `optionals` variable in your extended Grimlock class. Now, Optional properties will not be included in transformed response data.

If you want to include this optional data later, you can use `with` method. `with` method can be use with single or multiple property.

```typescript jsx
const postCollection = {
  optionals: ['title', 'body'],
  schema: data => ({
    id: data.id,
    userId: data.userId,
    title: data.title,
    body: data.body,
  }),
}

const data = new Grimlock(post, postCollection).with('title').toObject()
```

| Input Data                                            | Output Data                                    |
|-------------------------------------------------------|------------------------------------------------|
| - id<br/>- userId<br/>- title<br/>- body<br/>- rating | - id<br/>- userId<br/>- title |

In that case, `title` and `body` are optional but `title` has been added into the `with` method. So only `title` will be in output data. 

**Note:** An array can be sent to `with` method for add more than one optional value.

```typescript jsx
const data = new Grimlock(post, postCollection).with(['title', 'body']).toObject()
```

### Without

Sometimes you may not need some properties. `without` method excludes some properties from output data during translation. These properties do not have to be optional, available for all properties.

```typescript jsx
const postCollection = {
  optionals: ['title', 'body'],
  schema: data => ({
    id: data.id,
    userId: data.userId,
    title: data.title,
    body: data.body,
  }),
}

const data = new Grimlock(post, postCollection).without('userId').toObject()
```

| Input Data                                            | Output Data     |
|-------------------------------------------------------|-----------------|
| - id<br/>- userId<br/>- title<br/>- body<br/>- rating | - id            |

**Note:** An array can be sent to `without` method for add more than one optional value like `with`.

```typescript jsx
const data = new Grimlock(post, postCollection).without(['id', 'userId']).toObject()
```

**Note**: You can use `with` and `without` at the same time.

```typescript jsx
const data = new Grimlock(post, postCollection).with(['title', 'body']).without(['id', 'userId']).toObject()
```

### Function Values

If a value is a function in the collection schema, Grimlock run this function and use returned value. Async functions and promises aren't support yet.

```typescript jsx
const userCollection = {
  schema: data => ({
    id: data.id,
    name: data.name,
    surname: data.surname,
    age: function () {
      return new Date().getFullYear() - data.birthday
    },
  }),
}
```

### Relations

In the real world, we have a lot of resource/model and these models are related to each other. Grimlock supports the related collections.

```typescript jsx
import Grimlock from "grimlock";

const userCollection = {
  schema: data => ({
    id: data.id,
    name: data.name,
    username: data.username,
  }),
}

const postCollection = {
  schema: data => ({
    id: data.id,
    title: data.title,
    body: data.body,
    user: new Grimlock(data.user, userCollection).toObject(),
  }),
}
```

**Note:** Not only `toObject` but also `toArray` can be used in the collection.

## API

**Properties of Collection object:**

| Property  | Type            | Description                                                                          | Required | Default Value       |
|-----------|-----------------|--------------------------------------------------------------------------------------|----------|---------------------|
| optionals | Array<*String*> | Values that are not included in the output by default but can be optionally included | False    | []                  |
| schema    | Function        | Is the schema that will generate the output. It must return an object.               | True     | (data) => {}        |


**Methods of Grimlock class:**

| Property | Params                    | Description                                                             |
|----------|---------------------------|-------------------------------------------------------------------------|
| with     | String or Array<*String*> | It allows to include properties in the output from optional properties. |
| without  | String or Array<*String*> | Deletes the values you don't want in the output.                        |
| toObject | -                         | Returns a single result for a collection.                               |
| toArray  | -                         | Returns multiple results in an array for a collection.                  |


## License

[Apache-2.0 license](https://github.com/orcuntuna/grimlock/blob/HEAD/LICENSE)
