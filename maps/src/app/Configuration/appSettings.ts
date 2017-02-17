export var AppSettings = {
    'apiSettings': {"apiURL_BASE": "http://localhost:17752"},
    'signalrEndPoint': 'http://win2012r2-d4b5d.dynamic.wealth.cloud.td.com:5985/signalr'
};

export var AppNotificationsMSG = {
    'deletionQuestionMsg': 'Do you  really want to delete the record ?',
    'deletionStepQuestion': 'Do you  really want to delete the step ?',
    'deletionStepConfirmation': 'Step has been deleted!',
    'deletionTitle': 'Delete',
    'deletionConfirmationMsg': 'Record successfully deleted !',
    'saveConfirmedMsg': 'Record successfully updated !',
    'importConfirmedMsg': 'Import has been completed successfully !',
    'insertMSG' : 'Record inserted successfully',
    'notificationTitle': 'Notification',
    'errorTitle': 'Error',
    'warningTitle': 'Warning',
    'apiMsg': {
        'apiDelete': 'API - deletion error!',
        'apiGetUserInfo': 'API - get user information failed !',
        'apiGetSchematicDetails': 'API - get schematic Details failed !'
    },
    'deactivateSchematicMsg': 'Do you  really want to deactivate schematic ?',
    'activateSchematicMsg': 'Do you  really want to activate schematic ?',
    'schematicNameChangedMsg': 'Do you  really want to change schematic name ?',
    'schematicLowerStepQuestion': 'Do you want to move the step down ?',
    'schematicHigherStepQuestion': 'Do you want to move the step up ?',
    'jsonEditPlugin': {
        'invalidFormat' : 'Your JSON file has an invalid format',
        'keyValueRequired': 'Both key and value are required',
        'propertyExists': 'The property already exists:',
        'nodeProcessTitle': 'Process Setting',
        'nodeDocumentTitle': 'Document Setting',
        'nodeColumnSettingsTitle': 'Column Mapping',
        'jsonUpdate':'JSON updated successfully'},
    'etfCreationRedemption': {
        'deletePendingTradesTitle' : 'Confirm Delete',
        'deletePendingTradesMsg' : 'Please note, all pending trades will be deleted. Do you want to proceed anyway ?',
        'fullResetTitle': 'Confirm Reset',
        'fullResetMsg': 'Warning: all previous trading activities will be fully reset with no option to undo. Do you want to proceed anyway ?'
    }
}