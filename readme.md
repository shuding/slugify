# sluga

> Slugify a string

A fork of @sindresorhus/slugify, with ES5 support added and extra options removed.

## Install

```
$ npm install sluga
```

## Usage

```js
const slugify = require('sluga');

slugify('I ♥ Dogs');
//=> 'i-dogs'

slugify('  Déjà Vu!  ');
//=> 'deja-vu'

slugify('fooBar 123 $#%');
//=> 'foo-bar-123'

slugify('я люблю единорогов');
//=> 'ya-lyublyu-edinorogov'
```

## API

### slugify(string)

#### string

Type: `string`

String to slugify.
