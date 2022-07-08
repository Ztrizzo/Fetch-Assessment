const router = require('express').Router();
const Transaction = require('../data-models/transactions');
const Payer = require('../data-models/payer');
module.exports = router;


router.post('/addTransaction', async (req, res, next) => {
  try{

  }
  catch(error){
    next(error);
  }
})

router.post('/spendPoints', async (req, res, next) => {
  try{

  }
  catch(error){
    next(error);
  }
})