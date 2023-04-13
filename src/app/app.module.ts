import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LetterBoxesComponent } from './letter-boxes/letter-boxes.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CardsComponent } from './cards/cards.component';
import { BodyComponent } from './body/body.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LetterBoxesComponent,
    SearchBarComponent,
    SidebarComponent,
    CardsComponent,
    BodyComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
