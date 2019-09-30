const usersRouter = require('express').Router();
const users = require('../data/users.json');

usersRouter.get('/:id', (req, res) => {
  const user = users.find(function(user) {return user._id == req.params.id;});
  if (!user) {res.status(404).send({ "message": "Нет пользователя с таким id" });}
    else res.send(user);
});

usersRouter.get('/', (req, res) => {res.send(users);});

module.exports = usersRouter;