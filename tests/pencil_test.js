//pencil tests
var expect = require('chai').expect;
var Pencil = require('../pencil.js');
var Paper = require('../paper.js');

describe('PencilTests', function() {
    beforeEach( function() {
        Paper.set_contents('');
        Pencil.set_length(2);
    });

    it('handle degradation of pencil with lower case characters', function() {
        Pencil.set_durability(4);
        Paper.append_content(Pencil.write('test'));
        expect(Paper.get_contents()).to.eql('test');
    });

    it('handle degradation of pencil with upper case characters', function() {
        Pencil.set_durability(4);
        Paper.append_content(Pencil.write('Test'));
        expect(Paper.get_contents()).to.eql('Tes');
    });

    it('handle degradation of pencil with space or return characters', function() {
        Pencil.set_durability(16);
        Paper.append_content(Pencil.write('Test Green\r\nRefactor'));
        expect(Paper.get_contents()).to.eql('Test Green\r\nRefa');
    });

    it('sharpen durability back to original state with length limitation', function() {
        Pencil.set_durability(30);
        let text_to_write = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        Paper.append_content(Pencil.write(text_to_write));
        expect(Paper.get_contents()).to.eql('Lorem ipsum dolor sit amet, consec');
        Pencil.sharpen();
        Paper.append_content(Pencil.write(text_to_write.substring(Paper.get_contents().length)));
        expect(Paper.get_contents()).to.eql('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusm');
        Pencil.sharpen();
        Paper.append_content(Pencil.write(text_to_write.substring(Paper.get_contents().length)));
        expect(Paper.get_contents()).to.eql('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et do');
        Pencil.sharpen();
        Paper.append_content(Pencil.write(text_to_write.substring(Paper.get_contents().length)));
        expect(Paper.get_contents()).to.eql('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et do');
    });


});