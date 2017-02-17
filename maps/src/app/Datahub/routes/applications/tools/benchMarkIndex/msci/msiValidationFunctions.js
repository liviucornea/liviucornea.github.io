"use strict";
// these functions decide what must be required when value is selected in cbobox
// for ex. if index exclude is REGION than RegionExclude is required
function ValidateTargetForExclude(theValue) {
    if (theValue.toString().toUpperCase() === "REGION")
        return "RegionExclude";
    if (theValue.toString().toUpperCase() === "COUNTRY")
        return "CountryExclude";
    return "UNKNOWN";
}
exports.ValidateTargetForExclude = ValidateTargetForExclude;
function ValidateTargetForInclude(theValue) {
    if (theValue.toString().toUpperCase() === "REGION")
        return "RegionInclude";
    if (theValue.toString().toUpperCase() === "COUNTRY")
        return "CountryInclude";
    return "UNKNOWN";
}
exports.ValidateTargetForInclude = ValidateTargetForInclude;
//# sourceMappingURL=msiValidationFunctions.js.map