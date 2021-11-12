import { Component } from "@angular/core";
import { OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { ApiService } from "app/services/api.service";
import { NotificationService } from "app/services/notification.service";

@Component({
  selector: "app-login",
  templateUrl: "login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  isLoggedIn = false;
  role = "anonymous";

  constructor(
    private loginservice: ApiService,
    private _formBuilder: FormBuilder,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.loginForm = this._formBuilder.group({
      email: ["eve.holt@reqres.in", [Validators.required]],
      password: ["cityslicka", Validators.required],
    });
  }

  /* ----------==========     Login User    ==========---------- */
  loginUser() {
    let model = {
      email: "eve.holt@reqres.in",
      password: "cityslicka",
    };
    console.log(model);
    if (this.loginForm.invalid) {
      return this.notificationService.error("Kindly fill all fields");
    }
    this.loginservice.loginUser(model).subscribe((data: any) => {
      console.log(data);
      if (data.token) {
        const token = data.token;
        if (token) {
          // store user details and jwt token in session storage to keep user logged in between page refreshes
          localStorage.setItem("currentUser", JSON.stringify({ token: token }));
          this.notificationService.success("login succesfully");
          this.router.navigate(["dashboard"]);
          this.isLoggedIn = true;
        }
      } else {
        this.router.navigate(["login"]);
      }
    });
  }
}
