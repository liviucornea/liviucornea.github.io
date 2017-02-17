export interface iPluginControl{
    activate():void;
    returnResult(): any;
    completedCallBack(callBack:Object):void;
}