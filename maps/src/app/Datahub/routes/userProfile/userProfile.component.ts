/**
 * Created by vikhnv2 on 11/29/2016.
 */
import {Component, ViewChildren, QueryList} from '@angular/core';
import {Subscription}   from 'rxjs/Subscription';
import {ApiService, AuthUser} from '../../../ReusableServices/apiService';
import {CollapsePanelConfig} from './userProfile.config';
import {UserProfileService} from './userProfile.service';
import {CollapsePanel} from '../../../ReusableComponents/collapsePanel/collapsePanel.component';

@Component({
    selector: 'user-profile',
    template: require('./userProfile.html'),
    styles: [require('./userProfile.scss')]
})

export class UserProfile {
    user: AuthUser;
    panelsConfigSection: any = CollapsePanelConfig.Panels;
    panelsConfigInfo: any[] = [];

    @ViewChildren(CollapsePanel) collapsePanels: QueryList<CollapsePanel>;

    constructor(private _apiService: ApiService, private _upService: UserProfileService) {
        // read and load panels' configuration.
        this.panelsConfigSection.forEach(x => {
            this.panelsConfigInfo.push({
                Key: x.DataSetKey,
                DataGrid: x.GridConfiguration,
                Title: x.Title
            });
        });
    }

    ngOnInit() {
        // load current user' base profile information.
        this.user = new AuthUser();
        let subscription: Subscription = this._apiService.getAuthCurrentUser().subscribe(
            res => {
                subscription.unsubscribe();

                this.user.CostCentre = res.CostCentre;
                this.user.Id = res.Id;
                this.user.Login = res.Login;
                this.user.Name = res.Name;
                // load profile details.
                this.populateUserProfile();
            },
            err => {
                subscription.unsubscribe();
                console.log(err);
                // this.alert.error(AppNotificationsMSG.apiMsg.apiGetUserInfo + '   ' + error.status);
            }
        );
    }

    populateUserProfile(): void {
        let subscription: Subscription = this._upService.getAuthUserProfile().subscribe(
            res => {
                // console.log(res);
                subscription.unsubscribe();

                // re-build panels' data based based on columns defined in the configuration.
                let panelsData: any[] = [];
                this.panelsConfigInfo.forEach(section => {
                    let ds: any[] = res[section.Key]; //gets a key-based DataSet.
                    if (ds && ds.length > 0) {
                        panelsData.push({
                            Key: section.Key,
                            DataGridConfig: section.DataGrid,
                            Data: ds
                        });
                    }
                });
                // load data content into a target panel.
                panelsData.forEach(item => {
                    this.collapsePanels.find(pnl => pnl.key === item.Key).setPanelContent(item.DataGridConfig, item.Data);
                });
            },
            err => {
                subscription.unsubscribe();
                console.log(err);
                // this.alert.error(AppNotificationsMSG.apiMsg.apiGetUserInfo + '   ' + error.status);
            }
        );
    }

    expandCollapseAll(collapse: boolean): void {
        this.collapsePanels.forEach(p => p.collapsePanel(collapse));
    }
}
