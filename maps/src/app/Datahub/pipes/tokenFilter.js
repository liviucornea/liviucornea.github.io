"use strict";
var core_1 = require('@angular/core');
var TokenFilterPipe = (function () {
    function TokenFilterPipe() {
    }
    TokenFilterPipe.prototype.transform = function (items, filter) {
        // null check
        if (items == null || filter[0] == null || filter[0].trim() == '')
            return items;
        // Tokenized search
        var tokens = filter[0].trim().toLowerCase().split(' ');
        // The filter
        return items.filter(function (item) {
            // Convert items to text for easy searching
            var text = "";
            for (var prop in item) {
                text += item[prop] + " ";
            }
            text = text.toLowerCase();
            var match = true;
            for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
                var token = tokens_1[_i];
                match = match && text.indexOf(token) >= 0;
            }
            return match;
        });
    };
    TokenFilterPipe = __decorate([
        core_1.Pipe({ name: 'tokenFilter' }), 
        __metadata('design:paramtypes', [])
    ], TokenFilterPipe);
    return TokenFilterPipe;
}());
exports.TokenFilterPipe = TokenFilterPipe;
//# sourceMappingURL=tokenFilter.js.map