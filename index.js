
/*!
 *
 * domain-capture
 *
 * decorates a function in a domain
 *
 * MIT
 *
 */

/**
 * Module dependencies.
 */

var domain = require('domain');
var once = require('once');
var slice = require('slice-arguments');

/**
 * Expose `capture`.
 */

module.exports = capture;

/**
 * Decorates an async `fn` inside a domain
 * context, disposes the domain and callbacks
 * the error if any.
 *
 * @param {Function} fn
 * @return {Function}
 * @api public
 */

function capture(fn){
  return function(){
    var args = slice(arguments);
    var cb = once(args.callback());
    args.callback(cb);
    var d = domain.create();
    d.once('error', function(err){
      d.dispose();
      cb(err);
    });
    d.run(function(){
      fn.apply(this, args);
    });
  };
}
