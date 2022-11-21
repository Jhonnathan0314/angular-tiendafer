import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateSectionComponent } from './create-section/create-section.component';
import { SectionAllComponent } from './section-all/section-all.component';
import { UpdateSectionComponent } from './update-section/update-section.component';

const routes: Routes = [
  { path: 'all', component: SectionAllComponent },
  { path: 'create', component: CreateSectionComponent },
  { path: 'update', component: UpdateSectionComponent },
  { path: '', redirectTo: 'all', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SectionRoutingModule { }
