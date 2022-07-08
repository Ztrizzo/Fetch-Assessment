const { expect } = require('chai');
const chai = require('chai');
const Payer = require('./payer');
const Transaction = require('./transactions');


describe('Transaction', () => {

  describe('constructor', () => {
    it('should create a new transaction', () => {
      const newTransaction = new Transaction({payer: 'example', points: 3400, timestamp: '2024-01-02T14:00:00Z'})
      expect(newTransaction).to.be.a('object');
      expect(newTransaction).to.haveOwnProperty('payer');
      expect(newTransaction).to.haveOwnProperty('points');
      expect(newTransaction).to.haveOwnProperty('timestamp');
    })

    it('should add the new transaction to list of all transactions', () => {
      const numTransactionsBefore = Transaction.getAll().length;
      new Transaction({payer: 'example 2', points: 300, timestamp: '2025-01-02T14:00:00Z'})
      expect(Transaction.getAll().length).to.equal( numTransactionsBefore + 1);
    })

    it('should hanlde negative transactions', () => {
      new Transaction({payer: 'example 3' , points: 400, timestamp: '2024-01-02T14:00:00Z'});
      new Transaction({payer: 'example 3' , points: 500, timestamp: '2010-01-12T14:00:00Z'});
      new Transaction({payer: 'example 3' , points: 100, timestamp: '2022-01-13T14:00:00Z'});
      new Transaction({payer: 'example 3' , points: -1000, timestamp: '2025-01-02T14:00:00Z'});
      new Payer('example 3');
      expect(Payer.findByName('example 3').getPointTotal()).to.equal(0);
     
    })
  })

  describe('spendPoints', () => {
    it('should decrease points in oldest transaction if spend < transaction', () => {
      const pointsBefore = Transaction.getAll().peek().points;
      Transaction.spendPoints(1);
      expect(Transaction.getAll().peek().points).to.equal(pointsBefore - 1);
    })
    it('should remove transactions in FIFO order until all points are spent', () => {
      const oldestTransaction = Transaction.getAll().peek();
      console.log(Transaction.getAll());
      Transaction.spendPoints(5000);
      console.log(Transaction.getAll());
      expect(oldestTransaction.id).to.not.equal(Transaction.getAll().peek().id);
    })

    it('should return with an array of all points spent', () => {

      const response = Transaction.spendPoints(4000);
      expect(response).to.be.a('array');
      expect(response.length).to.be.greaterThan(1);
    })

  })

})