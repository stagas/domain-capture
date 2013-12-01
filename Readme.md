
# domain-capture

decorates a function in a domain

## Installing

`npm install domain-capture`

## Example

```js
var emitter = new (require('events').EventEmitter);
var capture = require('domain-capture');

function error(s, fn){
  setTimeout(function(){
    console.log('never shown');
  }, 100);

  // trigger a domain error, which will call fn(err)
  emitter.emit('error', new Error(s));

  console.log('never shown');

  fn(); // not called
}

// decorate `error` function
var fn = capture(error);

// invoke function where the error occurs
fn('oh', function(err){
  console.log(err.message); // => oh
});
```

## API

### fn = capture(fn)

Decorates an async `fn` inside a domain
context, disposes the domain and callbacks
the error if any.

## License

MIT
