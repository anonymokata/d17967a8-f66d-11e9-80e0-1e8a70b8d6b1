//pencil tests
var expect = require('chai').expect;
var Pencil = require('../pencil.js');
var Paper = require('../paper.js');

describe('PencilTests', function() {

    it('handle degradation of pencil with lower case characters', function() {
        Paper.set_contents('');
        Pencil.set_durability(4);
        Paper.set_contents(Paper.get_contents() + Pencil.write('test'));
        expect(Paper.get_contents()).to.eql('test');
    });

    it('handle degradation of pencil with lower case characters', function() {
        Paper.set_contents('');
        Pencil.set_durability(4);
        Paper.set_contents(Paper.get_contents() + Pencil.write('Test'));
        expect(Paper.get_contents()).to.eql('Tes');
    });
});