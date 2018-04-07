import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

export interface FaresMetaData {
  info: object;
  fares: Array<object>
}

@Injectable()
export class SeptaFaresService {

  constructor(private http: HttpClient) {
  }

  getFares(): Observable<FaresMetaData> {
    return this.http.get('src/fares.json');
  }

}
