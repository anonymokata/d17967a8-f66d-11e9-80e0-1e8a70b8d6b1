//pencil tests
var expect = require('chai').expect;
var Pencil = require('../pencil.js');
var Paper = require('../paper.js');

describe('PencilTests', function() {
    beforeEach( function() {
        Paper.set_contents('');
    })

    it('handle degradation of pencil with lower case characters', function() {
        Pencil.set_durability(4);
        Paper.set_contents(Paper.get_contents() + Pencil.write('test'));
        expect(Paper.get_contents()).to.eql('test');
    });

    it('handle degradation of pencil with upper case characters', function() {
        Pencil.set_durability(4);
        Paper.set_contents(Paper.get_contents() + Pencil.write('Test'));
        expect(Paper.get_contents()).to.eql('Tes');
    });

    it('handle degradation of pencil with space or return characters', function() {
        Pencil.set_durability(16);
        Paper.set_contents(Paper.get_contents() + Pencil.write('Test Green\r\nRefactor'));
        expect(Paper.get_contents()).to.eql('Test Green\r\nRefa');
    });


});