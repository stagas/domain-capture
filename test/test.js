
/**
 * Test.
 */

var assert = require('assert');
var Emitter = require('events').EventEmitter;
var capture = require('../');

//

var total = 5;
var cnt = 4;
var p = 0;

function done(){
  console.log('pass');
  if (!--cnt) {
    setTimeout(function(){
      assert(total == p);
      console.log('ok');
    }, 1000);
  }
}

//

var fn = capture(function(){});
assert('function' == typeof fn);

//

var fn = capture(function(fn){
  fn(null, 'hello');
});

fn(function(err, res){
  assert(null == err);
  assert('hello' == res);
  done(p++);
});

//

function emitError(fn){
  var emitter = new Emitter;
  emitter.emit('error', new Error('oh'));
  fn();
}

var fn = capture(emitError);

fn(function(err){
  assert('oh' === err.message);
  done(p++);
});

//

function emitErrorDelayed(fn){
  var emitter = new Emitter;
  setTimeout(function(){
    emitter.emit('error', new Error('oh'));
    done(p++);
  }, 100);
  fn();
}

var fn = capture(emitErrorDelayed);

fn(function(err){
  assert(null == err);
});

//

function throwErrorDelayed(fn){
  setTimeout(function(){
    // should never be called
    p--;
  }, 200);

  setTimeout(function(){
    throw new Error('oh');
  }, 100);

  p++;

  fn();
}

var fn = capture(throwErrorDelayed);

fn(function(err){
  assert(null == err);
});

//

function throwError(fn){
  throw new Error('oh');
  fn();
}

var fn = capture(throwError);

fn(function(err){
  assert('oh' === err.message);
  done(p++);
});
