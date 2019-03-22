const db = require('../models');


module.exports = function(app) {

    app.get('/api/products', function(req,res) {
        db.Product.findAll({}).then(function(data){
            res.json(data)
        }).catch(function(error) {
            res.json({error:error});
        });
    });

    app.get('/api/products/:id', function(req,res) {
        db.Product.findOne({where: {id: req.params.id}}
    ).then(function(data) {
            res.json(data)
        }).catch(function(error) {
            res.json({error:error});
        });
    });

    app.put('/api/products/:id', function(req,res) {
        db.Product.update(req.body, {where:{id: req.params.id} }
    ).then(function() {
            res.json({success: true});
        }).catch(function(error) {
            res.json({error:error})
        });
    });




}