import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SectionRoutingModule } from './section-routing.module';
import { SectionAllComponent } from './section-all/section-all.component';
import { CreateSectionComponent } from './create-section/create-section.component';
import { UpdateSectionComponent } from './update-section/update-section.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SectionAllComponent,
    CreateSectionComponent,
    UpdateSectionComponent
  ],
  imports: [
    CommonModule,
    SectionRoutingModule,
    FormsModule
  ]
})
export class SectionModule { }
