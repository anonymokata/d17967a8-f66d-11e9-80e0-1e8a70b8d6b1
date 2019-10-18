// Paper class

class Paper {
    construct () {
        this.contents = '';
    }

    set_contents(content) {
        this.contents = content;
    }

    append_content(content) {
        this.contents += content;
    }

    get_contents() {
        return this.contents;
    }
}

paper = new Paper();
module.exports = paper;