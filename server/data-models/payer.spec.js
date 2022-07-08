const { expect } = require('chai');
const chai = require('chai');
const Payer = require('./payer');
const Transaction = require('./transactions');


describe('Payer', () => {
  new Payer('exampleName');
  new Transaction({payer: 'exampleName', points: 400, timestamp:'2025-01-17T14:00:00Z'});
  new Transaction({payer: 'exampleName', points: 200, timestamp:'2025-01-16T14:00:00Z'});
  describe('findByName', () => {
    it('should find payer by name', () => {
      const payer = Payer.findByName('exampleName');
      expect(payer.name).to.equal('exampleName');
    })
  })

  describe('getPointTotal', () => {
    it('should return the payer point total', () => {
      const payer = Payer.findByName('exampleName');
      expect(payer.getPointTotal()).to.equal(600);
    })
  })
})