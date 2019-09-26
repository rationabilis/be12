const usersRouter = require('express').Router();
const users = require('../data/users.json');

usersRouter.get('/users/:id', (req, res) => {
    if (!users[req.params.id]) {
        res.status(404).send({ "message": "Нет пользователя с таким id" });
        return;
    }

    if (!!users[req.params.id]) {
      res.send(users[req.params.id]);
      return;
    }

    res.send(users);
});

module.exports = usersRouter;