import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Section } from 'src/app/models/section.model';
import { SectionService } from 'src/app/services/section/section.service';
import { HeaderService } from '../../global/header/header.service';

@Component({
  selector: 'app-create-section',
  templateUrl: './create-section.component.html',
  styleUrls: ['./create-section.component.css'],
  providers: [
    HeaderService
  ]
})
export class CreateSectionComponent implements OnInit {

  name?: string;

  constructor(
    private sectionService: SectionService, 
    private headerService: HeaderService,
    private router: Router) { }

  ngOnInit(): void {
    this.headerService.show()
  }

  createSection(){
    let section: Section = {
      idSection: 0,
      name: this.name
    }
    this.sectionService.create(section).subscribe({
      next: (section) => {
        this.router.navigate(["/home/section/all"]);
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

}
