import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from 'src/app/models/client.model';
import { ClientService } from 'src/app/services/client/client.service';

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.css']
})
export class CreateClientComponent implements OnInit {

  idClient?: number;
  name?: string;

  constructor(private clientService: ClientService, private router: Router) { }

  ngOnInit(): void {
  }

  createClient(){
    let client: Client = {
      idClient: this.idClient,
      name: this.name
    }
    this.clientService.create(client).subscribe({
      next: (client) => {
        this.router.navigate(["/home/client/all"]);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

}
