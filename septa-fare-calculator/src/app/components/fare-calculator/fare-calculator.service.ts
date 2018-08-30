import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FareResponse } from './fare-calculator.model';
import { interval, Observable, throwError } from 'rxjs';
import { catchError, map, retry, switchMap } from 'rxjs/operators';

@Injectable()
export class FareCalculatorService {

    readonly faresEndpoint = 'fares.json';

    constructor(private http: HttpClient) { }

    // Ideally, we have some sort of internal common library to handle HTTP requests in a generic <T> way,
    // so we don't need to repeat the retry, mapping, and error handling
    // The error handling bits are copied from the Angular documentation, because there's no need to
    // reinvent this particular wheel!

    public getFares(): Observable<FareResponse> {
        let fares;

        // using interval here to simulate network lag
        return interval(1500).pipe(
               switchMap(()=> this.http.get(this.faresEndpoint)),
               retry(3),
               map((response: FareResponse) => fares = {...response}),
               catchError(this.handleError),);
    }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
        }
        // return an observable with a user-facing error message
        return throwError('Something bad happened; please try again later.');
    };
}
