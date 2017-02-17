import { Injectable } from '@angular/core';

@Injectable()
export class SampleService {
    constructor()
    {
    }

    getData()
    {
        return 'call from sample service returned';
    }
}
