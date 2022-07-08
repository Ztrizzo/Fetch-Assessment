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
      const numTransactionsBefore = Transaction.getAll().queue.length;
      new Transaction({payer: 'example 2', points: 300, timestamp: '2025-01-02T14:00:00Z'})
      expect(Transaction.getAll().queue.length).to.equal( numTransactionsBefore + 1);
    })
  })

  describe('spendPoints', () => {
    it('should decrease points in oldest transaction if spend < transaction', () => {
      const pointsBefore = Transaction.getAll().peek().points;
      console.log(pointsBefore);
      Transaction.spendPoints(1);
      expect(Transaction.getAll().peek().points).to.equal(pointsBefore - 1);
    })
  })

})