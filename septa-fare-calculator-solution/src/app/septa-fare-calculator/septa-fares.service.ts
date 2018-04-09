import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

export interface Fare {
  type: string,
  purchase: string,
  trips: number,
  price: number
}

declare interface ZoneData {
  name: string,
  zone: number,
  fares: Array<Fare>
}

export interface FaresMetaData {
  info: object;
  zones: Array<ZoneData>
}

@Injectable()
export class SeptaFaresService {

  constructor(private http: HttpClient) {
  }

  getFares(): Observable<FaresMetaData> {
    return <Observable<FaresMetaData>>this.http.get('assets/fares.json');
  }

}
