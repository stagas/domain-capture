
/**
 * Example.
 */

var emitter = new (require('events').EventEmitter);
var capture = require('./');

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
