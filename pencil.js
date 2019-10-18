// Pencil class

class Pencil {
    constructor () {
        let durability = 0;
        let original_durability = 0;
        let length = 0;
    }
    write (characters) {
        return this.get_durable_characters(characters);
    }

    get_durable_characters(characters) {
        let write_characters = '';
        let character_interator = 0;
        while (this.durability > 0 && character_interator < characters.length) {
            let written_characters = 0;
            if(characters[character_interator].search(/[A-Z]/) == 0) {
                written_characters = 2;
            } else if (characters[character_interator].search(/[^\s]/) == 0) {
                written_characters = 1;
            }
            write_characters += characters[character_interator];
            character_interator++;
            this.durability = this.durability - written_characters;
        }
        return write_characters;
    }

    set_durability(durability) {
        this.durability = this.original_durability = durability;
    }

    set_length(length) {
        this.length =  length;
    }

    sharpen() {
        if (this.length > 0) {
            this.durability = this.original_durability;
        }
        this.length--;
    }
}

pencil = new Pencil();
module.exports = pencil;