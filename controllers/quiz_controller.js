var models = require('../models/models.js');

// Autoload :id
exports.load = function(req, res, next, quizId) {
    models.Quiz.find(quizId).then(function(quiz) {
        if (quiz) {
            req.quiz = quiz;
            next();
        } else{
            next(new Error('No existe quizId=' + quizId));
        }
    }
    ).catch(function(error){next(error)});
};

// GET /quizes
exports.index = function(req, res, next){
    var options = {};
    if(req.query.search){
        options.where = {
            pregunta: {like: '%' + req.query.search.replace(/\s+/g, '%') + '%'}
        }
    }
    options.order = 'pregunta';
    models.Quiz.findAll(options).then(function(quizes){
        res.render('quizes/index', {quizes: quizes});
    }).catch(function(error){next(error)});
};

// GET /quizes/:id
exports.show = function(req, res){
    models.Quiz.find(req.params.quizId).then(function(quiz){
        res.render('quizes/show', {quiz: quiz});
    });
};

// GET /quizes/:id/answer
exports.answer = function(req, res){
    models.Quiz.find(req.params.quizId).then(function(quiz){
        if(req.query.respuesta === quiz.respuesta){
            res.render('quizes/answer', {quiz: quiz, respuesta: 'Correcto'});
        } else{
            res.render('quizes/answer', {quiz: quiz, respuesta: 'Incorrecto'});
        }
    });
};

// GET /quizes/new
exports.new = function(req, res){
    var quiz = models.Quiz.build(
            {
                pregunta: '',
                respuesta: '',
                tema: ''
            }
        );
    res.render('quizes/new', {quiz: quiz});
}

//POST /quizes/create
exports.create = function(req, res){
    var quiz = models.Quiz.build(req.body.quiz);

    quiz.validate().then(function(err){
        if(err){
            res.render('quizes/new', {quiz: quiz, errors: err.errors});
        }else{
            quiz.save({fields: ['pregunta', 'respuesta', 'tema']}).then(function(){
                res.redirect('/quizes');
            });
        }
    });
}

// GET /quizes/:id/edit
exports.edit = function(req, res){
    var quiz = req.quiz; // autoload instance
    res.render('quizes/edit', {quiz: quiz});
}

//PUT /quizes/:id
exports.update = function(req, res){
    req.quiz.pregunta = req.body.quiz.pregunta;
    req.quiz.respuesta = req.body.quiz.respuesta;
    req.quiz.tema = req.body.quiz.tema;
console.log('req.body.quiz',req.body.quiz);
    req.quiz.validate().then(function(err){
        if(err){
            res.render('quizes/edit', {quiz: req.quiz, errors: err.errors});
        }else{
            req.quiz.save({fields: ['pregunta', 'respuesta', 'tema']}).then(function(){
                res.redirect('/quizes');
            });
        }
    });
}

// DELETE /quizes/:id
exports.destroy = function(req, res){
    req.quiz.destroy().then(function(){
        res.redirect('/quizes');
    }).catch(function(error){next(error)});
}
