const util = require('util');

const memcachedHost = process.env.MEMCACHED_TCP_ADDR || 'localhost'
const Memcached = require('memcached');
const memcached = new Memcached(`${memcachedHost}:11211`);

const get = util.promisify(memcached.get).bind(memcached);
const set = util.promisify(memcached.set).bind(memcached);

function getLastRate(key) {
  return get(key);
}

function setLastRate(key, value) {
  return set(key, value, 30);
}

module.exports = {
  getLastRate,
  setLastRate
};
