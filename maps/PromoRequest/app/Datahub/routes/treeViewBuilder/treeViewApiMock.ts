export var treeViewApiMock= {
    "Customer": {
        "Customer_Id": 101,
        "FirstName": "FName",
        "LastName": "LName",
        "Address": [{
            "AddressId": 1,
            "AddressType": "HomeAddress",
            "StreetAddress1": "st1 address",
            "City": "Toronto",
            "Province": "Ontario"
        }, {
            "AddressId": 1,
            "AddressType": "BillingAddress",
            "StreetAddress1": "st1 billing address",
            "City": "Calgary",
            "Province": "Alberta"
        }],
        "Equity": [{
            "EquityId": 1,
            "Stock": "Stock1",
            "Holdings": [{
                "HoldingId": 1,
                "Name": "XYZ",
                "Price": 121
            }, {
                "HoldingId": 2,
                "Name": "ABC",
                "Price": 122
            }]
        }, {
            "EquityId": 2,
            "Stock": "Stock2",
            "Holdings": [{
                "HoldingId": 3,
                "Name": "Holding3333",
                "Price": 220
            }, {
                "HoldingId": 4,
                "Name": "Holding4444",
                "Price": 221,
                "ThirdLevel" : [
                    {
                        "ThirdLevel1": "T1",
                        "ThirdLevel2": "T2",
                    },
                    {
                        "ThirdLevel1": "T11",
                        "ThirdLevel2": "T22",
                    }
                ]
            }]
        }]
    }
}

