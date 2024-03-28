const express = require('express')
const { createPackage, getPackage, updatePackage, deletePackage } = require('../controllers/package.controller')
const uploadMiddleware = require('../utils/MulterMiddleware')
const router = express.Router()

router.post('/', createPackage)
router.get('/', getPackage)
router.put('/:id', updatePackage)
router.delete('/:id', deletePackage)

module.exports = router