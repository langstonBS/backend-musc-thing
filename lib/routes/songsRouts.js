const { Router } = require('express');
const Songs = require('../models/Song')

module.exports = Router()
    .post('/', (req, res, next) => {
        Songs
            .create(req.body)
            .then(song => res.send(song))
            .catch(next);
    })

    .get('/', (req, res, next) => {
        Songs
            .find(req.query)
            .then(song => res.send(song))
            .catch(next);
    })

    .get('/:id', (req, res, next) => {
        Songs
            .findById(req.params.id)
            .then(song => res.send(song))
            .catch(next);
    })

    .patch('/:id', (req, res) => {
        Songs
            .findByIdAndUpdate(req.params.id, req.body, { new: true })
            .then(song => res.send(song));
    })

    .delete('/:id', (req, res) => {
        Songs
            .findByIdAndDelete(req.params.id)
            .then(songs => res.send(songs));
    });
