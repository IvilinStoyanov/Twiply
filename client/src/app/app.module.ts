import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './modules/shared/shared.module';
import { NavComponent } from './components/nav/nav.component';
import { LoginDialogComponent } from './components/nav/dialog/login-dialog/login-dialog.component';
import { RegisterDialogComponent } from './components/nav/dialog/register-dialog/register-dialog.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ServerErrorComponent } from './components/server-error/server-error.component';

@NgModule({
  declarations: [AppComponent, NavComponent, NotFoundComponent, ServerErrorComponent, LoginDialogComponent, RegisterDialogComponent],
  imports: [
    AppRoutingModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
