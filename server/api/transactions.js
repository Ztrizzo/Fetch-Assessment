const router = require('express').Router();
const Transaction = require('../data-models/transactions');
const Payer = require('../data-models/payer');
module.exports = router;


//List of all valid payers
new Payer('DANNON');
new Payer('UNILEVER');
new Payer('MILLER COORS');
new Payer('GENERAL MILLS');
new Payer('DOLE');
new Payer('YOPLAIT');

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