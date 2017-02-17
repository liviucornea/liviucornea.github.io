var ICOValidator = (function () {
    function ICOValidator() {
        this.tagName = 'ico';
    }
    /**
     * It checks validity of identification number of CZE company (called ico)
     * @param input {string} value to check
     * @returns {boolean} return true for valid value, otherwise false
     */
    ICOValidator.prototype.isAcceptable = function (input) {
        if (input === undefined)
            return false;
        if (input.length === 0)
            return false;
        if (!/^\d+$/.test(input))
            return false;
        var sci = [];
        var souc;
        var del = input.length;
        var kon = parseInt(input.substring(del, del - 1), 10);
        del = del - 1;
        souc = 0;
        for (var a = 0; a < del; a++) {
            sci[a] = parseInt(input.substr((del - a) - 1, 1), 10);
            sci[a] = sci[a] * (a + 2);
            souc = souc + sci[a];
        }
        if (souc > 0) {
            var resul = souc % 11;
            var mezi = souc - resul;
            resul = mezi + 11;
            resul = resul - souc;
            if ((resul === 10 && kon === 0) || (resul === 11 && kon === 1) || (resul === kon))
                return true;
        }
        return false;
    };
    return ICOValidator;
}());
//# sourceMappingURL=ICOValidator.js.map