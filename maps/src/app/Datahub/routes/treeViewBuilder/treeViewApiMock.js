System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var treeViewApiMock;
    return {
        setters:[],
        execute: function() {
            exports_1("treeViewApiMock", treeViewApiMock = {
                "Customer": {
                    "Action": "Read",
                    "Customer_Id": 101,
                    "FirstName": "Alex",
                    "LastName": "Noutash",
                    "Address": [{
                            "Action": "Read",
                            "Address_Id": 1,
                            "AddressType": "HomeAddress",
                            "StreetAddress1": "601 Captain Conacher Drive",
                            "City": "North York",
                            "Province": "Ontario"
                        }, {
                            "Action": "Read",
                            "Address_Id": 1,
                            "AddressType": "BillingAddress",
                            "StreetAddress1": "161 Bay Street",
                            "City": "Toronto",
                            "Province": "Ontario"
                        }],
                    "Equity": [{
                            "Action": "Read",
                            "Equity_Id": 1,
                            "Stock": "RBC Good Stock",
                            "Holdings": [{
                                    "Action": "Read",
                                    "Holdings_Id": 1,
                                    "Name": "RBC Holdings",
                                    "Price": 121
                                }, {
                                    "Action": "Read",
                                    "Holdings_Id": 2,
                                    "Name": "RBC Assets",
                                    "Price": 122
                                }]
                        }, {
                            "Action": "Read",
                            "Equity_Id": 2,
                            "Stock": "TD Stock",
                            "Holdings": [{
                                    "Action": "Read",
                                    "Holdings_Id": 3,
                                    "Name": "TD Holding",
                                    "Price": 220
                                }, {
                                    "Action": "Read",
                                    "Holdings_Id": 4,
                                    "Name": "TD Holding",
                                    "Price": 221,
                                    "ThirdLevel": [
                                        {
                                            "Action": "Read",
                                            "ThirdLevel1": "T1",
                                            "ThirdLevel2": "T2",
                                        },
                                        {
                                            "Action": "Read",
                                            "ThirdLevel1": "T11",
                                            "ThirdLevel2": "T22",
                                        }
                                    ]
                                }]
                        }]
                }
            });
        }
    }
});
//# sourceMappingURL=treeViewApiMock.js.map