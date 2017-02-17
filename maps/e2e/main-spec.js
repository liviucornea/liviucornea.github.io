describe('TD Hub application start page', function() {
    it('should find main menu', function() {
        browser.get('http://localhost:3000');
        var menuOptions =  element.all(by.id('navbar-responsive')).all(by.tagName('ul')).all(by.tagName('li'));
        expect(menuOptions.count()).toEqual(10);
        expect(menuOptions.get(1).getText()).toEqual('Applications');
        expect(menuOptions.get(2).getText()).toEqual('Administration');
        expect(menuOptions.get(3).getText()).toEqual('Dashboard '); /// to do here ...Correct that space in menu label...


    });
});