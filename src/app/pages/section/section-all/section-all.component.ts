import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Section } from 'src/app/models/section.model';
import { SectionService } from 'src/app/services/section/section.service';
import { HeaderService } from '../../global/header/header.service';

@Component({
  selector: 'app-section-all',
  templateUrl: './section-all.component.html',
  styleUrls: ['./section-all.component.css']
})
export class SectionAllComponent implements OnInit {

  actualSection?: Section
  sections?: Section[]
  searchName?: string;

  constructor(
    private sectionService: SectionService, 
    private headerService: HeaderService,
    private router: Router) { 
  }

  ngOnInit(): void {
    this.findSections();
  }

  findSections(){
    this.headerService.show()

    this.sectionService.findAll().subscribe({
      next: (sections) => {
        if(this.searchName == undefined){
          this.sections = sections;
        }else{
          
          this.sections = sections.filter(section => section.name?.toUpperCase().includes(this.searchName?.toUpperCase()!));
        }
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  updateSection(idSection?: number){
    this.router.navigate(["/home/section/update/" + idSection]);
  }

  deleteSection(idSection?: number){
    this.sectionService.deleteById(idSection!).subscribe({
      next: (res) => {
        this.ngOnInit();
      },
      error: (err) => {
        this.ngOnInit();
      }
    })
  }

  findByName(){
    this.ngOnInit();
  }
}
