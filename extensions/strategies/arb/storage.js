const util = require('util');

const Memcached = require('memcached');
// const memcached = new Memcached('127.0.0.1:11211');
const memcached = new Memcached('192.168.99.100:11211');

const get = util.promisify(memcached.get).bind(memcached);
const set = util.promisify(memcached.set).bind(memcached);

function getLastRate(key) {
  return get(key);

  return new Promise((res, rej) =>
    memcached.get(key, (err, val) => {
      if (err) {
        rej(err);
      } else {
        res(val);
      }
    })
  );
}

function setLastRate(key, value) {
  return set(key, value, 60);

  return new Promise((res, rej) =>
    memcached.set(key, value, 60, (err) => {
      if (err) {
        rej(err);
      } else {
        res();
      }
    })
  );
}

module.exports = {
  getLastRate,
  setLastRate
};
