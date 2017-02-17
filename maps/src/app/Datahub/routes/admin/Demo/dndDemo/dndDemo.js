// // Copyright (C) 2016 Sergey Akopkokhyants
// // This project is licensed under the terms of the MIT license.
// // https://github.com/akserg
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var DnDDemo = (function () {
    function DnDDemo() {
        this.simpleDrop = null;
        this.restrictedDrop1 = null;
        this.restrictedDrop2 = null;
        this.transferData = { id: 1, msg: 'Hello' };
        this.receivedData = [];
        this.availableProducts = [];
        this.shoppingBasket = [];
        this.listOne = ['Coffee', 'Orange Juice', 'Red Wine', 'Unhealty drink!', 'Water'];
        this.listBoxers = ['Sugar Ray Robinson', 'Muhammad Ali', 'George Foreman', 'Joe Frazier', 'Jake LaMotta', 'Joe Louis', 'Jack Dempsey', 'Rocky Marciano', 'Mike Tyson', 'Oscar De La Hoya'];
        this.listTeamOne = [];
        this.listTeamTwo = [];
        this.listTwo = ['Coffee', 'Orange Juice', 'Red Wine', 'Unhealty drink!', 'Water'];
        this.listRecycled = [];
        this.dragOperation = false;
        this.dragEnabled = true;
        this.containers = [
            new Container(1, 'Container 1', [new Widget('1'), new Widget('2')]),
            new Container(2, 'Container 2', [new Widget('3'), new Widget('4')]),
            new Container(3, 'Container 3', [new Widget('5'), new Widget('6')])
        ];
        this.widgets = [];
        this.availableProducts.push(new Product('Blue Shoes', 3, 35));
        this.availableProducts.push(new Product('Good Jacket', 1, 90));
        this.availableProducts.push(new Product('Red Shirt', 5, 12));
        this.availableProducts.push(new Product('Blue Jeans', 4, 60));
    }
    DnDDemo.prototype.addTo = function ($event) {
        if ($event) {
            this.widgets.push($event.dragData);
        }
    };
    DnDDemo.prototype.orderedProduct = function ($event) {
        var orderedProduct = $event.dragData;
        orderedProduct.quantity--;
    };
    DnDDemo.prototype.addToBasket = function ($event) {
        var newProduct = $event.dragData;
        for (var indx in this.shoppingBasket) {
            var product = this.shoppingBasket[indx];
            if (product.name === newProduct.name) {
                product.quantity++;
                return;
            }
        }
        this.shoppingBasket.push(new Product(newProduct.name, 1, newProduct.cost));
        this.shoppingBasket.sort(function (a, b) {
            return a.name.localeCompare(b.name);
        });
    };
    DnDDemo.prototype.totalCost = function () {
        var cost = 0;
        for (var indx in this.shoppingBasket) {
            var product = this.shoppingBasket[indx];
            cost += (product.cost * product.quantity);
        }
        return cost;
    };
    DnDDemo.prototype.transferDataSuccess = function ($event) {
        this.receivedData.push($event);
    };
    DnDDemo = __decorate([
        core_1.Component({
            template: require('./dndDemo.html')
        }), 
        __metadata('design:paramtypes', [])
    ], DnDDemo);
    return DnDDemo;
}());
exports.DnDDemo = DnDDemo;
var Product = (function () {
    function Product(name, quantity, cost) {
        this.name = name;
        this.quantity = quantity;
        this.cost = cost;
    }
    return Product;
}());
var Container = (function () {
    function Container(id, name, widgets) {
        this.id = id;
        this.name = name;
        this.widgets = widgets;
    }
    return Container;
}());
var Widget = (function () {
    function Widget(name) {
        this.name = name;
    }
    return Widget;
}());
//# sourceMappingURL=dndDemo.js.map