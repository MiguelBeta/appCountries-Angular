import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import path from 'path';
import { HomePageComponent } from './shared/pages/home-page/home-page.component';
import { AboutPageComponent } from './shared/pages/about-page/about-page.component';
import { ContacPageComponent } from './shared/pages/contac-page/contac-page.component';

const routes: Routes = [
{
  path: 'home',
  component: HomePageComponent
},
{
  path: 'about',
  component: AboutPageComponent
},
{
  path: 'contac',
  component: ContacPageComponent
},
{
  path: '**',
  redirectTo: 'home'
}
];



@NgModule({
  imports: [
    RouterModule.forRoot( routes ),
  ],
  exports: [
    RouterModule,
  ]
})
export class AppRoutingModule { }
