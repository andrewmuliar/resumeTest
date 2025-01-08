import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ReactiveFormsModule } from "@angular/forms";

// PrimeNg
import { StepperModule } from "primeng/stepper";
import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import { CalendarModule } from "primeng/calendar";
import { FloatLabelModule } from "primeng/floatlabel";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    // Prime
    StepperModule,
    InputTextModule,
    ButtonModule,
    CalendarModule,
    FloatLabelModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
