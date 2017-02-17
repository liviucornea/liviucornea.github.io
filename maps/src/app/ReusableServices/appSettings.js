System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var AppSettings, AppNotificationsMSG;
    return {
        setters:[],
        execute: function() {
            exports_1("AppSettings", AppSettings = {
                'apiSettings': { "apiURL_BASE": "http://localhost:17752" }
            });
            exports_1("AppNotificationsMSG", AppNotificationsMSG = {
                'deletionQuestionMsg': 'Do you  really want to delete the record ?',
                'deletionTitle': 'Delete',
                'deletionConfirmationMsg': 'Record successfully deleted !',
                'saveConfirmedMsg': 'Record successfully updated !',
                'insertMSG': 'Record inserted successfully',
                'notificationTitle': 'Notification',
                'errorTitle': 'Error',
                'warningTitle': 'Warning',
                'apiMsg': {
                    'apiDelete': 'API - deletion error!',
                    'apiGetUserInfo': 'API - get user information failed !',
                    'apiGetSchematicDetails': 'API - get schematic Details failed !'
                },
                'deactivateSchematicMsg': 'Do you  really want to deactivate schematic ?',
                'jsonEditPlugin': {
                    'invalidFormat': 'Your JSON file has an invalid format',
                    'keyValueRequired': 'Both key and value are required',
                    'propertyExists': 'The property already exists:',
                    'nodeProcessTitle': 'Process Setting',
                    'nodeDocumentTitle': 'Document Setting',
                    'nodeColumnSettingsTitle': 'Column Mapping',
                    'jsonUpdate': 'JSON updated successfully' },
                'etfCreationRedemption': {
                    'deletePendingTradesTitle': 'Confirm Delete',
                    'deletePendingTradesMsg': 'Please note, all pending trades will be deleted. Do you want to proceed anyway ?',
                    'fullResetTitle': 'Confirm Reset',
                    'fullResetMsg': 'Warning: all previous trading activities will be fully reset with no option to undo. Do you want to proceed anyway ?'
                }
            });
        }
    }
});
//# sourceMappingURL=appSettings.js.map