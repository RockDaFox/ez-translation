# ez-translation

> Lightweight translation module usable on browser and server

[![NPM Version][npm-image]][npm-url]
[![Linux Build][travis-image]][travis-url]

## Install

```bash
npm i ez-translation
```

## Usage

### Basic

Create a translation object (can be a .json)

```js
const myTranslation = {
                        "login-form": {
                          "label": {
                            "email": "E-mail",
                            "password": "Password"
                          }
                        }
                      }
```

Add to your code :

```js
import {Translation} from "ez-translation";
// you can import your json file or object


const translation = new Translation(myTranslation)

translation.t('login-form.label.email') // "E-mail"
```

### CLI

There is also a cli interface !

(currently in test)



## License

[MIT](http://vjpr.mit-license.org)

[npm-image]: https://img.shields.io/npm/v/ez-translation
[npm-url]: https://www.npmjs.com/package/ez-translation
[travis-url]: https://travis-ci.org/github/RockDaFox/ez-translation
[travis-image]: https://travis-ci.org/RockDaFox/ez-translation.svg?branch=master
