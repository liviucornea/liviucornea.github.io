/* export var json={
    dbColumnName: {
        rules: {required: true, maxlength: 15}},
    LastName: {
        rules: {required: true, maxlength: 15}}
    Contacts: [
        {
            Email: {
                rules: {
                    required: true,
                    maxlength: 100,
                    email: true
                }
            },
            Mobile: {
                CountryCode: {
                    rules: {required: true, maxlength: 3, enum: ["FRA", "CZE", "USA", "GER"] }
                },
                Number: {
                    rules: {required: true, maxlength: 9 }
                }
            },
            FixedLine: {
                CountryCode: {
                    rules: {required: true, maxlength: 3, enum: ["FRA", "CZE", "USA", "GER"] }
                },
                Number: {
                    rules: {required: true, maxlength: 9 }
                }
            }
        },{maxItems: 4, minItems: 2}
    ]
}*/
"use strict";
exports.ConfigBuilderRuleAndSchema = {
    dbColumnName: {
        type: "string",
        title: "First name",
        required: "true",
        maxLength: 15
    },
    htmlControlType: {
        type: "string",
        "title": "Last name",
        required: true,
        maxLength: 15
    },
    isVisible: {
        type: "boolean",
        required: true
    },
    isRequired: {
        type: "boolean",
        required: true
    },
    isComplexType: {
        type: "boolean",
        required: true,
    },
    displayName: {
        type: "string",
        "title": "Display name",
        required: true,
        maxLength: 15
    },
};
//# sourceMappingURL=configBuilderMetaRules.js.map