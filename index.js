// This file is server side entry point.

const {send} = require('micro');
const {router, get} = require('microrouter');
const cors = require('micro-cors');
const delay = require('delay');

const USERS = [
  {
    id: 'make_now_just',
    icon: 'https://pbs.twimg.com/profile_images/548275254401826816/FgfwNSph_400x400.png',
  },
  {
    id: 'sh4869sh',
    icon: 'https://pbs.twimg.com/profile_images/1009421398983544832/2yi1U9J9_400x400.jpg',
  },
];

const INDEX = Object.create(null);
for (const user of USERS) {
  INDEX[user.id] = user;
}

const users = (req, res) => USERS;
const user = (req, res) => INDEX[req.params.id] || send(res, 404);

const handler = cors()(router(get('/users', users), get('/user/:id', user)));

module.exports = async (req, res) => {
  await delay(3000); // make response slow!
  return handler(req, res);
};
