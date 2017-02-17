/**
 * Created by vikhnv2 on 11/30/2016.
 */
import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import {SharedModule} from '../../../ReusableComponents/SharedModule';
// import {TreeViewModule} from '../../../ReusableComponents/treeView/TreeViewModule';

import {UserProfile} from './userProfile.component';
import {UserProfileRouting} from './userProfile.routes';
import {UserProfileService} from './userProfile.service';
import {CollapsePanel} from '../../../ReusableComponents/collapsePanel/collapsePanel.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SharedModule,
        // TreeViewModule,
        UserProfileRouting
    ],
    declarations: [
        UserProfile,
        CollapsePanel
    ],
    providers: [UserProfileService]
})

export class UserProfileModule {}