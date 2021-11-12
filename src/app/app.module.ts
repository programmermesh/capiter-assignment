import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { AppRoutingModule } from "./app.routing";
import { ComponentsModule } from "./components/components.module";

import { AppComponent } from "./app.component";
import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { ApiService } from "./services/api.service";
import { HttpClientModule } from "@angular/common/http";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import {
  AlertDialog,
  ConfirmationDialog,
  NotificationService,
} from "./services/notification.service";
import { SnackBarComponent } from "./components/snackbar/snackbar.component";
import { MatCardModule } from "@angular/material/card";
import { MatDialogModule } from "@angular/material/dialog";

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    MatCardModule,
    MatDialogModule,
    RouterModule,
    MatSnackBarModule,
    AppRoutingModule,
  ],
  entryComponents: [SnackBarComponent, ConfirmationDialog, AlertDialog],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    SnackBarComponent,
    ConfirmationDialog,
    AlertDialog,
  ],
  providers: [ApiService, NotificationService],
  bootstrap: [AppComponent, SnackBarComponent],
})
export class AppModule {}
