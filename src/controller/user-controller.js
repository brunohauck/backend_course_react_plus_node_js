'use strict'

const repository = require('../repository/user-repository');
const jwt = require('jsonwebtoken');
const md5 = require('md5');
exports.getAllUsers = async(req, res, next) => {
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

exports.addUser = async(req, res, next) => {
    try {
        let user = await parserBodyUserCreate(req.body);
        
        user.password = md5(user.password + 'd41d8cd98f00b204e9800998ecf8427e|7aef61337bcee2fe773aa78b40afacbc');
        console.log(user);
        let dbReturnUser = await repository.create(user);
        res.status(200).send(dbReturnUser);        
    } catch (e) {
        res.status(500).send(
            {
                message: 'Ops! Something went worng', error: e
            }
        );
    }
};

async function parserBodyUserCreate(body){
    return { 
            name: body.name,
            email: body.email, 
            password: body.password,
          };
};

exports.editUser = async(req, res, next) => {
    try {
        let result = await repository.update(req.body);
        console.log(result)
        res.status(202).send(result);        
    } catch (e) {
        console.log(e)
        res.status(500).send(
            {
                message: 'Ops! Something went worng', error: e
            }
        );
    }
};

exports.deleteUser = async(req, res, next) => {
    try {
        await repository.delete(req.params.id);
        res.status(200).send({
            message: 'User delete!'
        });        
    } catch (e) {
        res.status(500).send(
            {
                message: 'Ops! Something went worng', error: e
            }
        );
    }
};
exports.login = async(req, res, next) => {
    try {
        console.log(req.body.password);
        const user = await repository.autenticate({
            email: req.body.email,
            password: md5(req.body.password + 'd41d8cd98f00b204e9800998ecf8427e|7aef61337bcee2fe773aa78b40afacbc')
        });
        if (!user) {
            res.status(404).send({
                message: 'Usuário ou senha inválidos'
            });
            return;
        }
        var token = jwt.sign({userID: user._id}, 'd41d8cd98f00b204e9800998ecf8427e|7aef61337bcee2', {expiresIn: '2h'}); 
        res.status(201).send({
            user,
            token: token
        });
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição ' + e
        });
    }
};


