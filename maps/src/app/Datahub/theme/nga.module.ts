import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { BaCard } from './components/baCard/baCard.component';
import { BaChartistChart } from './components/baChartistChart/baChartistChart.component';


import { BaAppPicturePipe} from './pipes/baAppPicture/baAppPicture.pipe';
import { BaKameleonPicturePipe} from './pipes/baKameleonPicture/baKameleonPicture.pipe';
import { BaProfilePicturePipe} from './pipes/baProfilePicture/baProfilePicture.pipe';
import { BaImageLoaderService} from './services/baImageLoader/baImageLoader.service';
import { BaThemePreloader} from './services/baThemePreloader/baThemePreloader.service';
import { BaThemeSpinner} from './services/baThemeSpinner/baThemeSpinner.service';


import { BaThemeConfig } from './theme.config';
import {
    BaThemeConfigProvider
} from './theme.configProvider';
import { BaCardBlur } from './components/baCard/baCardBlur.directive';


const NGA_COMPONENTS = [
    BaCard,
    BaChartistChart
];
const NGA_DIRECTIVES = [
    BaCardBlur
];

const NGA_PIPES = [
    BaAppPicturePipe,
    BaKameleonPicturePipe,
    BaProfilePicturePipe
]

const NGA_SERVICES = [
    BaImageLoaderService,
    BaThemePreloader,
    BaThemeSpinner
];

@NgModule({
    declarations: [ ...NGA_DIRECTIVES, ...NGA_PIPES, ...NGA_COMPONENTS ],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
    ]
    ,
    exports: [
        ...NGA_PIPES,
        ...NGA_DIRECTIVES,
        ...NGA_COMPONENTS
    ]
    ,
    providers: [
        BaThemeConfigProvider,
        BaThemeConfig,
        ...NGA_SERVICES
    ]
})
export class NgaModule {
}