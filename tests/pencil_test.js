//pencil tests
var expect = require('chai').expect;
var Pencil = require('../pencil.js');
var Paper = require('../paper.js');

describe('PencilTests', function() {
    it('append writing to existing paper', function () {
        Paper.set_contents('She sells sea shells');
        Paper.set_contents(Paper.get_contents() + Pencil.write(' down by the sea shore'));
        expect(Paper.get_contents()).to.eql('She sells sea shells down by the sea shore');
    })
});