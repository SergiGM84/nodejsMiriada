var express = require('express');
var router = express.Router();
var quizController = require('../controllers/quiz_controller');
/* GET / */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' });
});

// autoload de comandos con :quizId
router.param('quizId', quizController.load);

/* GET autor/ */
router.get('/autor', function(req, res) {
  res.render('autor');
});

/* GET quizes/ */
router.get('/quizes', quizController.index);
/* GET quizes/:id */
router.get('/quizes/:quizId(\\d+)', quizController.show);
/* GET quizes/:id/answer. */
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);

module.exports = router;
