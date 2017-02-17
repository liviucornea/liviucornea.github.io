import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class DisplayGridFilterService{
  public doFilterBy  = new Subject();
  constructor(){}
}
