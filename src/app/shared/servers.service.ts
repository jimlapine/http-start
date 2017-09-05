import { Injectable } from '@angular/core';
// give us access to the bulit in http service
import { Headers, Http, Response } from '@angular/http';
// allows us to use map
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
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
    // return this.http.post('https://ng-http-38096.firebaseio.com/data.json',
    //   servers, {headers: headers});

    // using put will overrwrite data
    return this.http.put('https://ng-http-38096.firebaseio.com/data.json',
      servers, {headers: headers});
  }

  getAppName() {
    return this.http.get('https://ng-http-38096.firebaseio.com/appName.json').map(
      (response: Response) => {
        const data = response.json();
        console.log(data);
        return data;
      },
      (error) => {
        return error;
      }
    )
    .catch(
      (error: Response) => {
        console.log(error);
        return Observable.throw('Something went wrong, unable to retrieve servers.');
      }
    );
  }

  getServers() {
    // this alllow us to transform our data in a centralized location
    // map will allow us to manipulate our response, return data and wrap in new observable
    return this.http.get('https://ng-http-38096.firebaseio.com/data.json').map(
      // since the response is of type response, it give us access to the json method to convert resposne to JavaScript object
      (response: Response) => {
        const data = response.json();
        // console.log(data);
        // for demo purposes to show we can transform data as needed
        // for (const server of data) {
        //   server.name = 'FETCHED_' + server.name;
        // }
        return data;
      },
      (error) => {
        // console.log(error);
        return error;
      }
    )
    .catch(
      // catch does not wrap its returned value in an observable, so we must do this manually
      (error: Response) => {
        console.log(error);
        return Observable.throw('Something went wrong, unable to retrieve servers.');
      }
    );
  }
}
