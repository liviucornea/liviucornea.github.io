
class ICOValidator {

    tagName = 'ico';

    /**
     * It checks validity of identification number of CZE company (called ico)
     * @param input {string} value to check
     * @returns {boolean} return true for valid value, otherwise false
     */
    public isAcceptable(input: string) {

        if (input === undefined) return false;
        if (input.length === 0) return false;

        if (!/^\d+$/.test(input)) return false;

        let sci = [];
        let souc;
        let del = input.length;
        let kon = parseInt(input.substring(del, del - 1), 10);
        del = del - 1;
        souc = 0;
        for (let a = 0; a < del; a++) {
            sci[a] = parseInt(input.substr((del - a) - 1, 1), 10);
            sci[a] = sci[a] * (a + 2);
            souc = souc + sci[a];
        }

        if (souc > 0) {
            let resul = souc % 11;
            let mezi = souc - resul;
            resul = mezi + 11;
            resul = resul - souc;

            if ((resul === 10 && kon === 0) || (resul === 11 && kon === 1) || (resul === kon))
                return true;
        }
        return false;
    }
}

