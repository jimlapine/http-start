import { Injectable } from '@angular/core';
// give us access to the bulit in http service
import { Headers, Http } from '@angular/http';

@Injectable()
export class ServersService {
  constructor(private http: Http) {}

  storeServers(servers: any[]) {
    // post appends records to existing list
    // first argument is url we are posting to
    // this command creates an observable be does not send the request
    // no request will be sent until it has a subscriber.
    // data.json is firebase specifc, data can be any name you choose
    // We can also set custom headers if needed, json is the default, and this is shown as an example
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post('https://ng-http-38096.firebaseio.com/data.json',
      servers, {headers: headers});
  }
}
