import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import {SharedModule} from "../../../ReusableComponents/SharedModule";
import {DashboardRouting} from './dashboard.routes'
import { Dashboard } from './dashboard.component';
import {PieChartService} from "./pieChart/pieChart.service";
import {PieChart} from "./pieChart/pieChart.component";
import {BaThemeConfigProvider} from "../../theme/theme.configProvider";
import { NgaModule } from '../../theme/nga.module';
import { TrafficChart } from './trafficChart/trafficChart.component';
import { TrafficChartService } from './trafficChart/trafficChart.service';
import {ChartistJs} from "../charts/components/chartistJs/chartistJs.component";
import {ChartistJsService} from '../charts/components/chartistJs/chartistJs.service' ;
import {PipeLinesSchematicsChartComponent} from './pipelineSchematicsChart/pipelineSchematicsChart.component';
import {PipelinesSchematicsChartService} from "./pipelineSchematicsChart/pipelineSchematicsChart.service";
import {RunningProcessesComponent} from "./runningProcesses/runningProcesses.component";
import {ProcessHighlightDirective} from "./runningProcesses/highlightRunningProcess.directive";
import {SystemInfoComponent} from "./systemInfo/systemInfo.component";
import {SystemInformationService} from "./systemInfo/systemInfo.service";
import { ChartsModule } from 'ng2-charts/ng2-charts';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    DashboardRouting,
    NgaModule,
    ChartsModule
  ],
  declarations: [
    PieChart,
    TrafficChart,
    Dashboard,
    PipeLinesSchematicsChartComponent,
    RunningProcessesComponent,
    ProcessHighlightDirective,
    SystemInfoComponent,
    ChartistJs
  ],
  providers: [PieChartService, TrafficChartService,  BaThemeConfigProvider,
              ChartistJsService, PipelinesSchematicsChartService,
              SystemInformationService]
})
export class DashboardModule {}
