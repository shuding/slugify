/**
Slugify a string.

@param string - String to slugify.

@example
```
import slugify = require('sluga');

slugify('I ♥ Dogs');
//=> 'i-dogs'

slugify('  Déjà Vu!  ');
//=> 'deja-vu'

slugify('fooBar 123 $#%');
//=> 'foo-bar-123'

slugify('я люблю единорогов');
//=> 'ya-lyublyu-edinorogov'
```
*/
declare function slugify(
	string: string
): string;

export = slugify;
