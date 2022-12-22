import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from 'src/app/models/client.model';
import { ClientService } from 'src/app/services/client/client.service';
import { HeaderService } from '../../global/header/header.service';

@Component({
  selector: 'app-client-all',
  templateUrl: './client-all.component.html',
  styleUrls: ['./client-all.component.css']
})
export class ClientAllComponent implements OnInit {

  clients?: Client[];
  searchName?: string;

  constructor(
    private clientService: ClientService,
    private headerService: HeaderService,
    private router: Router) { }

  ngOnInit(): void {
    this.findClients()
  }

  findClients() {
    this.headerService.show();

    this.clientService.findAll().subscribe({
      next: (clients) => {
        if(this.searchName == undefined){
          this.clients = clients;
        }else{
          this.clients = clients.filter(client => client.name?.toUpperCase().includes(this.searchName?.toUpperCase()!));
        }
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  updateClient(idClient: number) {
    this.router.navigate(["/home/client/update/" + idClient])
  }

  deleteClient(idClient: number) {
    this.clientService.deleteById(idClient).subscribe({
      next: (res) => {
        this.ngOnInit()
      },
      error: (err) => {
        this.ngOnInit()
      }
    })
  }

  findByName(){
    this.ngOnInit()
  }
}
