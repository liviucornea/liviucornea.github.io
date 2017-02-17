import {Injectable} from 'angular2/core';
import {ControlConfig} from "../Datahub/routes/schedule/config/controlConfig";
import {HolidayControlConfig} from "../Datahub/routes/schedule/holiday/holidayControlConfig";
import {HolidaySetCodeControlConfig} from "../Datahub/routes/schedule/holidaySetCode/holidaySetCodeControlConfig";
import {RoleParentChildControlConfig} from "../Datahub/routes/auth/role/roleControlConfig";
import {ResourceParentChildControlConfig} from "../Datahub/routes/auth/resource/resourceControlConfig";
import {UserControlConfig} from "../Datahub/routes/auth/user/userControlConfig";
import {configunitControlConfig} from "../Datahub/routes/schematic/configuration/configurationControlConfig";
import {LogsControlConfig} from "../Datahub/routes/logs/list/LogsControlConfig";
import {ProcessDesignerConfig} from "../Datahub/routes/schematic/designer/schematicDesignerConfig";
import {NotificationAlertControlConfig} from "../Datahub/routes/auth/notificationAlert/NotificationAlertControlConfig";
import {BenchMarkIndexControlConfig} from "../Datahub/routes/applications/tools/benchMarkIndex/benchMarkIndexConfig";

@Injectable()
export class ComponentsConfigService {
    ScheduleConfigControlConfig:any = ControlConfig;
    ScheduleHolidayControlConfig:any = HolidayControlConfig;
    ScheduleHolidaySetControlConfig:any = HolidaySetCodeControlConfig;
    AuthRoleControlConfig:any= RoleParentChildControlConfig;
    ProcessDesignerConfig:any=ProcessDesignerConfig;
    AuthResourceControlConfig:any = ResourceParentChildControlConfig;
    AuthUserControlConfig:any = UserControlConfig;
    LogsControlConfig: any = LogsControlConfig;
    ConfigunitControlConfig: any = configunitControlConfig;
    NotificationAlertControlConfig: any = NotificationAlertControlConfig;
    BenchMarkIndexControlConfig: any = BenchMarkIndexControlConfig;
    constructor() {
    }
};