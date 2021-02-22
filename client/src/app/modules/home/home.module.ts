import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [HomeComponent, LandingPageComponent],
  imports: [CommonModule, HomeRoutingModule],
})
export class HomeModule {}
