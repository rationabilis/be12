const wrongRouter = require('express').Router();

wrongRouter.get('/users/:id', (req, res) => {

  res.status(404).send({ "message": "Запрашиваемый ресурс не найден" });

});

module.exports = wrongRouter;