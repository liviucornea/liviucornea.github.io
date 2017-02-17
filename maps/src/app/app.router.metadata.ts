import { Type } from '@angular/core';
import { Route, Data, ResolveData } from '@angular/router';

export enum MenuType {
  NONE,
  TOP,
  LEFT
}

export interface RouteInfo {
  path: string;
  pathMatch?: 'full' | 'prefix';
  redirectTo?: string;
  outlet?: string;
  canActivate?: any;
  canDeactivate?: any[];
  data?: Data;
  resolve?: ResolveData;
  children?: Route[];
  name: string;
  title: string;
  active?: boolean;
  urlPath?: string;
  menuType: MenuType;
}
