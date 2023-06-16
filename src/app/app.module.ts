import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { ChartModule } from "primeng/chart";
import { AutoCompleteModule } from "primeng/autocomplete";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { SearchBarComponent } from "./search-bar/search-bar.component";
import { GridComponent } from "./grid/grid.component";
import { GridItemComponent } from "./grid-item/grid-item.component";

import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import { MenubarModule } from "primeng/menubar";
import { GridItemDetailComponent } from "./grid-item-detail/grid-item-detail.component";
import { LoadingComponent } from "./loading/loading.component";
import { ProgressBarComponent } from "./progress-bar/progress-bar.component";
import { ProgressSpinnerModule } from "primeng/progressspinner";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SearchBarComponent,
    GridComponent,
    GridItemComponent,
    GridItemDetailComponent,
    LoadingComponent,
    ProgressBarComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    MenubarModule,
    HttpClientModule,
    ChartModule,
    AutoCompleteModule,
    ProgressSpinnerModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
