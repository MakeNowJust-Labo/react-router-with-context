// This file is server side entry point.

const {send, json} = require('micro');
const {router, get, post} = require('microrouter');
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

const getUsers = (req, res) => USERS;
const getUser = (req, res) => INDEX[req.params.id] || send(res, 404);
const postUser = async (req, res) => {
  const body = await json(req);
  const user = INDEX[req.params.id];
  if (!user) {
    send(res, 404);
    return;
  }
  user.icon = body.icon;
  return user;
};

const handler = cors()(router(
  get('/users', getUsers),
  get('/user/:id', getUser),
  post('/user/:id', postUser),
));

module.exports = async (req, res) => {
  await delay(500); // make response slow!
  return handler(req, res);
};
