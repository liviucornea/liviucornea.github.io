// these functions decide what must be required when value is selected in cbobox
// for ex. if index exclude is REGION than RegionExclude is required
export function ValidateTargetForExclude(theValue){
    if (theValue.toString().toUpperCase() === "REGION") return "RegionExclude" ;
    if (theValue.toString().toUpperCase() === "COUNTRY") return "CountryExclude" ;
    return "UNKNOWN";
}
export function ValidateTargetForInclude(theValue){
    if (theValue.toString().toUpperCase() === "REGION") return "RegionInclude" ;
    if (theValue.toString().toUpperCase() === "COUNTRY") return "CountryInclude" ;
    return "UNKNOWN";
}