const Package = require('../models/package.model')
const errorHandler = require('../utils/error')

const createPackage = async (req, res, next) => {

    try {
        const { packageName, packageDetails, packagePrice, image } = req.body

        if (!packageName || !packageDetails || !packagePrice) {
            return next(errorHandler(400, 'Please fill out all the fields'))
        }

        const newPackage = await Package({
            packageName,
            packageDetails,
            packagePrice,
            image

        })

        const savedPackage = await newPackage.save()

        res.status(201).json({ message: 'package created', savedPackage })

    } catch (error) {
        next(error)
    }
}

const getPackage = async (req, res, next) => {

    try {
        const sortDirection = req.query.order === 'asc' ? 1 : -1

        const query = {}

        if (req.query.packageName) {
            query.packageName = req.query.packageName
        }
        if (req.query.packageId) {
            query._id = req.query.packageId
        }

        const package = await Package.find(query).sort({ updatedAt: sortDirection })
        res.status(200).json(package)

    } catch (error) {
        next(error)
    }

}

const updatePackage = async (req, res, next) => {

    try {
        const { packageName, packageDetails, packagePrice, image } = req.body

        const updatedPackage = await Package.findByIdAndUpdate(req.params.id, {
            $set: {
                packageName,
                packageDetails,
                packagePrice,
                image
            }
        }, { new: true })

        res.status(200).json({ message: 'updated successfully', updatedPackage })
    } catch (error) {
        next(error)
    }

}

const deletePackage = async (req, res, next) => {

    try {

        await Package.findByIdAndDelete(req.params.id)

        res.status(200).json({ message: 'package has been deleted' })

    } catch (error) {
        next(error)
    }

}

module.exports = { createPackage, getPackage, updatePackage, deletePackage }