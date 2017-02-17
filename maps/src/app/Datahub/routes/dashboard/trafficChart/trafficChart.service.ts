import {Injectable} from '@angular/core';
//import {BaThemeConfigProvider, colorHelper} from '../../../theme';

import {BaThemeConfigProvider} from '../../../theme/theme.configProvider';
import {colorHelper} from '../../../theme/theme.constants';



@Injectable()
export class TrafficChartService {

  constructor(private _baConfig:BaThemeConfigProvider) {
  }


  getData() {
    let dashboardColors = this._baConfig.get().colors.dashboard;
    return [
      {
        value: 2000,
        color: dashboardColors.red,
        highlight: colorHelper.shade(dashboardColors.surfieGreen, 15),
        label: 'Scheduled but not run yet',
        percentage: 87,
        order: 1,
      }, {
        value: 1500,
        color: dashboardColors.gossip,
        highlight: colorHelper.shade(dashboardColors.gossip, 15),
        label: 'Finished',
        percentage: 22,
        order: 4,
      }, {
        value: 1000,
        color: dashboardColors.silverTree,
        highlight: colorHelper.shade(dashboardColors.silverTree, 15),
        label: 'Pipelines',
        percentage: 70,
        order: 3,
      }, {
        value: 1200,
        color: dashboardColors.surfieGreen,
        highlight: colorHelper.shade(dashboardColors.surfieGreen, 15),
        label: 'Schematics',
        percentage: 38,
        order: 2,
      }, {
        value: 400,
        color: dashboardColors.blueStone,
        highlight: colorHelper.shade(dashboardColors.blueStone, 15),
        label: 'Finished with warnings',
        percentage: 17,
        order: 0,
      },
    ];
  }
}
