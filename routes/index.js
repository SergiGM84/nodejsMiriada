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
/* GET quizes/new */
router.get('/quizes/new', quizController.new);
/* POST quizes/create */
router.post('/quizes/create', quizController.create);
/* GET quizes/:id/edit */
router.get('/quizes/:quizId(\\d+)/edit', quizController.edit);
/* PUT quizes/:id */
router.put('/quizes/:quizId(\\d+)', quizController.update);
/* DELETE quizes/:id */
router.delete('/quizes/:quizId(\\d+)', quizController.destroy);

module.exports = router;
