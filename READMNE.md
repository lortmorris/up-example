# Universal Pattern Example

## Install
```bash
$ git clone https://github.com/lortmorris/up-example.git
$ cd up-example
$ npm install
$ npm run watch
```


# Traditional RESTful API vs Universal Pattern
Universal Pattern is different way to build API, starting from a single swagger yaml file.

## Traditional URL
```
/api/companies/5/employees/3
/api/v2/companies/5/employees/3
/api/employees/3
```

## Universal Pattern url

```
/api/employees
{
  q: 'company:5,id:3',
}

* Query URL Params.
```
