const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync');
const Listing = require('../models/listing');
const { isLoggedIn, isOwner , validateListing} = require('../middleware');

const listingController = require('../controllers/listing');


router
.route('/')
  .get(wrapAsync(listingController.index))
  .post(isLoggedIn, validateListing, wrapAsync(listingController.createListing));

  //New router
router.get('/new', isLoggedIn, listingController.renderNewForm);

router.route('/:id')
  .get(wrapAsync(listingController.showListing))
  .put(isLoggedIn, isOwner, validateListing, wrapAsync(listingController.updateListing))
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.deleteListing));


//Edit router

router.get('/:id/edit', isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));
module.exports = router;