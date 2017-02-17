describe('Schematic Designer Test:', function() {
    it('should find a schematic', function() {
        browser.get('http://localhost:3000/Datahub/Admin/Schematic/SchematicDesigner');

        var typeAheadInput = element.all(by.id('itemDescription'));

        typeAheadInput.sendKeys('Jeff');



        browser.driver.sleep(5000);

        var EC = protractor.ExpectedConditions;
        var typeAheadInputList = element(by.id('typeahead-list')).all(by.tagName('ul')).all(by.tagName('li'));

       // browser.wait(EC.textToBePresentInElement($('#itemDescription','Jeff')), 5000);

        expect(typeAheadInputList).toBeTruthy();

    });
});