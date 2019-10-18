// Pencil class

class Pencil {
    constructor () {
        let durability = 0;
        let original_durability = 0;
        let length = 0;
        let eraser_durability = 0;
    }

    write (characters) {
        return this.get_durable_characters(characters);
    }

    write_after_sharpen (full_characters, current_content) {
        return this.write(full_characters.substring(current_content.length));
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

    set_eraser_durability(durability) {
        this.eraser_durability = durability;
    }

    sharpen() {
        if (this.length > 0) {
            this.durability = this.original_durability;
        }
        this.length--;
    }

    erase(contents, characters_to_erase) {
        characters_to_erase = this.get_durable_characters_to_erase(characters_to_erase);
        let characters_location = contents.lastIndexOf(characters_to_erase);
        let characters_length = characters_to_erase.length;
        let spaces_to_add = '';
        let i;
        if ( characters_length > 0 && characters_location >= 0 ) {
            for ( i = 0; i < characters_length; i++) {
                spaces_to_add += ' ';
            }

            contents = contents.substring(0,characters_location) + spaces_to_add + contents.substring(characters_location + characters_length);
        }
        return contents;
    }

    get_durable_characters_to_erase(characters_to_erase) {
        let characters = '';
        if (this.eraser_durability > 0 && characters_to_erase.length > this.eraser_durability) {
            characters = characters_to_erase.substr(-this.eraser_durability);
        }
        return characters;
    }
}

pencil = new Pencil();
module.exports = pencil;