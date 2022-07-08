const { expect } = require('chai');

const chai = require('chai');
const should = chai.should();
const TransactionQueue = require('./TransactionQueue');
const Transaction = require('./transactions');

chai.use(require('chai-sorted'));

describe('insert', () => {
  const exampleTransaction3 = new Transaction({payer: 'Dannon', points: 3400, timestamp: '2022-11-02T14:00:00Z'});
  const exampleTransaction = new Transaction({payer: 'General Mills', points: 400, timestamp: '2020-11-02T14:00:00Z'});
  const exampleTransaction2 = new Transaction({payer: 'Dannon', points: 1090, timestamp: '2021-11-02T14:00:00Z'});
  const exampleTransaction4 = new Transaction({payer: 'Yoplait', points: 500, timestamp: '2023-11-02T14:00:00Z'});
  new Transaction({payer: 'Dannon', points: 300, timestamp: '2022-08-02T14:00:00Z'})

  it('should have a queue sorted by the timestamp', () => {
    expect(Transaction.getAll()).to.be.sortedBy('timestamp');
  })


})