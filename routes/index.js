var express = require('express');
var router = express.Router();
var quizController = require('../controllers/quiz_controller');
var commentController = require('../controllers/comment_controller');
var sessionController = require('../controllers/session_controller');

/* GET / */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' });
});

// autoload de comandos con :quizId
router.param('quizId', quizController.load);

router.get('/autor', function(req, res) {
  res.render('autor');
});

// Autoload de comandos con ids
router.param('quizId', quizController.load);  // autoload :quizId
// router.param('commentId', commentController.load);  // autoload :commentId
// router.param('userId', userController.load);  // autoload :userId

// Definición de rutas de sesion
router.get('/login',  sessionController.new);
router.post('/login', sessionController.create);
router.get('/logout', sessionController.destroy);

// Definición de rutas de cuenta
// router.get('/user',  userController.new);
// router.post('/user',  userController.create);
// router.get('/user/:userId(\\d+)/edit',  sessionController.loginRequired, userController.ownershipRequired, userController.edit);
// router.put('/user/:userId(\\d+)',  sessionController.loginRequired, userController.ownershipRequired, userController.update);
// router.delete('/user/:userId(\\d+)',  sessionController.loginRequired, userController.ownershipRequired, userController.destroy);

// Definición de rutas de /quizes
router.get('/quizes', quizController.index);
router.get('/quizes/:quizId(\\d+)', quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
router.get('/quizes/new', quizController.new, sessionController.loginRequired);
router.post('/quizes/create', quizController.create, sessionController.loginRequired);
router.get('/quizes/:quizId(\\d+)/edit', quizController.edit, sessionController.loginRequired);
router.put('/quizes/:quizId(\\d+)', quizController.update, sessionController.loginRequired);
router.delete('/quizes/:quizId(\\d+)', quizController.destroy, sessionController.loginRequired);

router.get('/quizes/:quizId(\\d+)/comments/new', commentController.new);
router.post('/quizes/:quizId(\\d+)/comments', commentController.create);

module.exports = router;
