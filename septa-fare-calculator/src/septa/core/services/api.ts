import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { ApiChannel } from 'core/constants';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ApiService {
    private http: Http;

    constructor(http: Http) {
        Object.assign(this, { http });
    }

    public getFares(): Observable<Response> {
        return this.http.get(`${ApiChannel.MAIN}/fares.json`);
    }
}
