import { Component } from '@angular/core';
import { Response } from '@angular/http';
import { ServersService } from './shared/servers.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  servers = [
    {
      name: 'Testserver',
      capacity: 10,
      id: this.generateId()
    },
    {
      name: 'Liveserver',
      capacity: 100,
      id: this.generateId()
    }
  ];

  // the async pipe will handle the response from this call to the service
  appName = this.serverService.getAppName();

  constructor(private serverService: ServersService) {}

  onAddServer(name: string) {
    this.servers.push({
      name: name,
      capacity: 50,
      id: this.generateId()
    });
  }

  onSaveServers() {
    this.serverService.storeServers(this.servers).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onGetServers() {
    this.serverService.getServers().subscribe(
      // servers is an array, returned in the observable by the map function
      (servers: any[]) => {
        console.log(servers);
        this.servers = servers;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  private generateId() {
    return Math.round(Math.random() * 10000);
  }
}
