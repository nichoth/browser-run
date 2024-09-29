var test = require('test');
var assert = require('assert');
var run = require('..');
var fs = require('fs');

test('static', function (t, done) {
  var browser = run({ static: __dirname });

  browser.on('data', function (data) {
    assert.strictEqual(data.trim(), fs.readFileSync(`${__dirname}/static.js`).toString().trim());
    done();
  });

  browser.write('fetch("/static.js").then(res => res.text()).then(body => {console.log(body); window.close()})');
  browser.end();
});

test('JS module', (t, done) => {
  const browser = run({ static: __dirname });

  browser.on('data', function (data) {
    // assert.strictEqual(data.trim(), fs.readFileSync(`${__dirname}/test.mjs`).toString().trim());
    assert.ok(data.toString().includes('import'))
    done();
  });

  browser.write('import { test } from "/test.mjs; window.close()');
  browser.end();
})
