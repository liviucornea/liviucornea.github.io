"use strict";
var core_1 = require('@angular/core');
var BaCard = (function () {
    function BaCard() {
    }
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], BaCard.prototype, "title", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], BaCard.prototype, "baCardClass", void 0);
    BaCard = __decorate([
        core_1.Component({
            selector: 'ba-card',
            styles: [require('./baCard.scss')],
            template: require('./baCard.html'),
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [])
    ], BaCard);
    return BaCard;
}());
exports.BaCard = BaCard;
//# sourceMappingURL=baCard.component.js.map