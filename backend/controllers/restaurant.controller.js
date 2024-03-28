const Restaurant = require('../models/restaurant.model')
const errorHandler = require('../utils/error')

const createRestaurant = async (req, res, next) => {
    try {
        const { ownerName, restaurantName, location, description, image } = req.body

        if (!ownerName || !restaurantName || !location) {
            return next(errorHandler(400, 'Please fill out all the fields'))
        }

        const newRestaurant = await Restaurant({
            ownerName,
            restaurantName,
            location,
            description,
            image
        })

        const savedRestaurant = await newRestaurant.save()

        res.status(201).json({ message: 'Restaurant created', savedRestaurant })

    } catch (error) {
        next(error)
    }
}

const getRestaurant = async (req, res, next) => {
    try {
        const sortDirection = req.query.order === 'asc' ? 1 : -1

        const query = {}

        if (req.query.restaurantName) {
            query.restaurantName = req.query.restaurantName
        }
        if (req.query.restaurantId) {
            query._id = req.query.restaurantId
        }

        const restaurant = await Restaurant.find(query).sort({ updatedAt: sortDirection })
        res.status(200).json(restaurant)

    } catch (error) {
        next(error)
    }
}

const updateRestaurant = async (req, res, next) => {
    try {
        const { ownerName, restaurantName, location, description, image } = req.body

        const updatedRestaurant = await Restaurant.findByIdAndUpdate(req.params.id, {
            $set: {
                ownerName,
                restaurantName,
                location,
                description,
                image
            }
        }, { new: true })

        res.status(200).json({ message: 'updated successfully', updatedRestaurant })
    } catch (error) {
        next(error)
    }
}

const deleteRestaurant = async (req, res, next) => {
    try {

        await Restaurant.findByIdAndDelete(req.params.id)

        res.status(200).json({ message: 'restaurant has been deleted' })

    } catch (error) {
        next(error)
    }
}

module.exports = { createRestaurant, getRestaurant, updateRestaurant, deleteRestaurant }