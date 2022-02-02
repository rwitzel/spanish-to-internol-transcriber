Array.prototype.removeByValue = function(value) {
    for (let i = 0; i < this.length; i++) {
        if (this[i] === value) {
            this.splice(i, 1);
            i--;
        }
    }
    return this;
};

// only for the browser .. remove it when using proper webapp build
const module = {};