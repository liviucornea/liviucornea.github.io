import {Injectable} from '@angular/core';
import {BaThemeConfigProvider} from './theme.configProvider';

@Injectable()
export class BaThemeConfig {

  constructor(private _baConfig:BaThemeConfigProvider) {
    this._config();
  }

  private _config() {
  }
}
