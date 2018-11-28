# Build a social network using Universal Pattern.

This is a easy example for build a Social Network using [Universal Pattern](https://www.npmjs.com/package/universal-pattern).

Inline-style:
![alt text](https://github.com/lortmorris/up-example/docs/wireframe.png "Writeframe and proposal")


# Install
## Before to Install
For run this example we need install before [MongoDB](https://www.mongodb.com/download-center).


## Installing
```bash
$ git clone https://github.com/lortmorris/up-example.git
$ cd up-example
$ npm install
$ npm run watch
```
Then, open your browser http://localhost:5000

## Import dataset

### Brands

```bash
mongoimport -d uptest -c brands dataset/brands.json
```

# Creating the yaml files
The first step is define the endpoints, and for it we need create the yaml files.
Universal Pattern use the modules concepts, this mean any "entity" is a module, and have one or more endpoints.
All files should be saved into 'swagger' directory.
For example, into own Social Network, we will need:

- [Users](https://raw.githubusercontent.com/lortmorris/up-example/master/swagger/users.yaml)
- [Brands](https://raw.githubusercontent.com/lortmorris/up-example/master/swagger/brands.yaml)
- [Cars](https://raw.githubusercontent.com/lortmorris/up-example/master/swagger/cars.yaml)
- [Ratings](https://raw.githubusercontent.com/lortmorris/up-example/master/swagger/ratings.yaml)
- [Photos](https://raw.githubusercontent.com/lortmorris/up-example/master/swagger/photos.yaml)
- [Comments](https://raw.githubusercontent.com/lortmorris/up-example/master/swagger/comments.yaml)
- [Feed](https://raw.githubusercontent.com/lortmorris/up-example/master/swagger/feed.yaml)
- [Feedlikes](https://raw.githubusercontent.com/lortmorris/up-example/master/swagger/feedlikes.yaml)
- [Feedcomments](https://raw.githubusercontent.com/lortmorris/up-example/master/swagger/feedcomments.yaml)

## Generating data mock.

### Users
```bash
DEBUG=upexample* node mocks/users.js
```

### cars

```bash
DEBUG=upexample* node mocks/cars.js
```


### photos
```bash
DEBUG=upexample* node mocks/photos.js
```
