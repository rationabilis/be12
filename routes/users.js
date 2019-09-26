const usersRouter = require('express').Router();
const users = require('../data/users.json');

usersRouter.get('/users/:id', (req, res) => {
    if (!users[req.params.id]) {
        res.send(`Нет пользователя с таким id`);
        return;
    }

    if (!!users[req.params.id]) {
      res.send(users[req.params.id]);
      return;
    }

    res.send('../data/users.json');
});

module.exports = usersRouter;