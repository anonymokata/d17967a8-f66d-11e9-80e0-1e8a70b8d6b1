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
        for (sharpen_iterator = Pencil.length; sharpen_iterator >= 0; sharpen_iterator-- ) {
            Pencil.sharpen();
            Paper.append_content(Pencil.write_after_sharpen(text_to_write, Paper.get_contents()));
            switch(sharpen_iterator) {
                case 2:
                    expect(Paper.get_contents()).to.eql('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusm');
                    break;
                case 1:
                case 0:
                    expect(Paper.get_contents()).to.eql('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et do');
                    break;
            }
        }
    });

    it('erases last occurrence of found characters from paper, multiple times with a degrading eraser', function() {
        Pencil.set_eraser_durability(3)
        Paper.set_contents("How much wood, would a woodchuck chuck, if a woodchuck could chuck wood?");
        Paper.set_contents(Pencil.erase(Paper.get_contents(),'chuck'));
        expect(Paper.get_contents()).to.eql('How much wood, would a woodchuck chuck, if a woodchuck could ch    wood?');
        Paper.set_contents(Pencil.erase(Paper.get_contents(),'chuck'));
        expect(Paper.get_contents()).to.eql('How much wood, would a woodchuck chuck, if a woodchuck could ch    wood?');
    });

    it('erases last occurrence of found characters from paper, multiple times with a degrading eraser across multiple erase calls', function() {
        Pencil.set_eraser_durability(7)
        Paper.set_contents("How much wood, would a woodchuck chuck, if a woodchuck could chuck wood?");
        Paper.set_contents(Pencil.erase(Paper.get_contents(),'chuck'));
        expect(Paper.get_contents()).to.eql('How much wood, would a woodchuck chuck, if a woodchuck could       wood?');
        Paper.set_contents(Pencil.erase(Paper.get_contents(),'chuck'));
        expect(Paper.get_contents()).to.eql('How much wood, would a woodchuck chuck, if a woodchu   could       wood?');
    });

    it('make sure nothing is erased if empty string is passed', function() {
        Paper.set_contents("How much wood, would a woodchuck chuck, if a woodchuck could chuck wood?");
        Paper.set_contents(Pencil.erase(Paper.get_contents(),''));
        expect(Paper.get_contents()).to.eql('How much wood, would a woodchuck chuck, if a woodchuck could chuck wood?');
    });

    it('make sure nothing is erased if string that is passed is not found', function() {
        Paper.set_contents("How much wood, would a woodchuck chuck, if a woodchuck could chuck wood?");
        Paper.set_contents(Pencil.erase(Paper.get_contents(),'chuckk'));
        expect(Paper.get_contents()).to.eql('How much wood, would a woodchuck chuck, if a woodchuck could chuck wood?');
    });

    it('editing test, pencil is able to write over spaces', function () {
        Paper.set_contents("An       a day keeps the doctor away");
        Paper.set_contents(Pencil.edit_paper(Paper.get_contents(), 'onion', 3));
        expect(Paper.get_contents()).to.eql('An onion a day keeps the doctor away');
    });

    it('editing test, handling writing over where characters exist and replacing them with an at symbol', function () {
        Paper.set_contents("An       a day keeps the doctor away");
        Paper.set_contents(Pencil.edit_paper(Paper.get_contents(), 'artichoke', 3));
        expect(Paper.get_contents()).to.eql('An artich@k@ay keeps the doctor away');
    });

});