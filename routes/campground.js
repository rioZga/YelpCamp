const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/expressError');
const Campground = require('../models/campground');
const { campgroundSchema } = require('../schemas');
const campgrounds = require('../controllers/campgrounds');
const { isLoggedIn, validateCampground, isAuthor } = require('../middleware');
const multer = require('multer');
const { storage } = require('../cloudinary/index');
const upload = multer({ storage });




router.get('/', catchAsync(campgrounds.index))

router.get('/new', isLoggedIn, campgrounds.renderNewForm)

router.post('/', isLoggedIn, upload.array('image'), validateCampground, catchAsync(campgrounds.createCampground))


router.get('/:id', catchAsync(campgrounds.showCampground))

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm))

router.put('/:id', isLoggedIn, isAuthor, validateCampground, catchAsync(campgrounds.updateCampground))

router.delete('/:id', catchAsync(campgrounds.deleteCampground))



module.exports = router;