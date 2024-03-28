const express = require('express')
const { createRestaurant, getRestaurant, updateRestaurant, deleteRestaurant } = require('../controllers/restaurant.controller')
const router = express.Router()

router.post('/', createRestaurant)
router.get('/', getRestaurant)
router.put('/:id', updateRestaurant)
router.delete('/:id', deleteRestaurant)

module.exports = router