import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Section } from 'src/app/models/section.model';
import { SectionService } from 'src/app/services/section/section.service';

@Component({
  selector: 'app-update-section',
  templateUrl: './update-section.component.html',
  styleUrls: ['./update-section.component.css']
})
export class UpdateSectionComponent implements OnInit {

  idSection?: number;
  actualSection?: Section;
  name?: string;

  constructor(private sectionService: SectionService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(idSection => {
      this.idSection = parseInt(idSection.get('_id')!); 
      this.getSection()
    });
  }

  getSection(){
    this.sectionService.findById(this.idSection!).subscribe({
      next: (section) => {
        this.actualSection = section,
        this.name = section.name
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  updateSection() {
    this.actualSection!.name = this.name;
    this.sectionService.update(this.actualSection!, this.idSection!).subscribe({
      next: (section) => {
        console.log(section)
        this.router.navigate(["/home/section/all"]);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

}
