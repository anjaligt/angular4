import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { DialogexampleComponent } from './dialogexample/dialogexample.component';
import { DialogDemoComponent } from './dialog-demo/dialog-demo.component';

@NgModule({
  declarations: [
    AppComponent,
    DialogexampleComponent,
    DialogDemoComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatDialogModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [DialogDemoComponent]
})
export class AppModule { }
