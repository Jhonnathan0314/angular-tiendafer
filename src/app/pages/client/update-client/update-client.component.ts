import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from 'src/app/models/client.model';
import { ClientService } from 'src/app/services/client/client.service';

@Component({
  selector: 'app-update-client',
  templateUrl: './update-client.component.html',
  styleUrls: ['./update-client.component.css']
})
export class UpdateClientComponent implements OnInit {

  actualClient?: Client;
  idClient?: number;
  name?: string;

  constructor(private clientService: ClientService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(idClient => {
      this.idClient = parseInt(idClient.get('_id')!);
      this.getClient()
    })
  }

  getClient(){
    this.clientService.findById(this.idClient!).subscribe({
      next: (client) => {
        this.actualClient = client;
        this.idClient = client.idClient;
        this.name = client.name;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
  
  updateClient(){
    this.actualClient = {
      idClient: this.idClient,
      name: this.name
    }
    this.clientService.update(this.actualClient, this.idClient!).subscribe({
      next: (client) => {
        this.router.navigate(["/home/client/all"]);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
