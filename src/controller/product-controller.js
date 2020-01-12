'use strict'

const repository = require('../repository/product-repository');

exports.getAllProducts = async(req, res, next) => {
    try {
        let dbReturn = await repository.getAll();
        res.status(200).send(dbReturn);        
    } catch (e) {
        res.status(500).send(
            {
                message: 'Ops! Something went worng', error: e
            }
        );
    }
}; 

exports.addProduct = async(req, res, next) => {
    try {
        let dbReturnProduct = await repository.create(req.body);
        res.status(200).send(dbReturnProduct);        
    } catch (e) {
        res.status(500).send(
            {
                message: 'Ops! Something went worng', error: e
            }
        );
    }
};

exports.editProduct = async(req, res, next) => {
    try {
        let result = await repository.update(req.params.id, req.body);
        res.status(202).send(result);        
    } catch (e) {
        res.status(500).send(
            {
                message: 'Ops! Something went worng', error: e
            }
        );
    }
};

exports.deleteProduct = async(req, res, next) => {
    try {
        await repository.delete(req.params.id);
        res.status(200).send({
            message: 'Product delete!'
        });        
    } catch (e) {
        res.status(500).send(
            {
                message: 'Ops! Something went worng', error: e
            }
        );
    }
};


