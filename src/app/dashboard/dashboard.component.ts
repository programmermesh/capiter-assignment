import { Component, OnInit, ViewChild, TemplateRef } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ApiService } from "app/services/api.service";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { NotificationService } from "app/services/notification.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
})
export class DashboardComponent implements OnInit {
  usersList: any;
  singleUserList: any;
  selectedUser: any;
  page = 1;
  per_page = 6;
  totalItems: any;
  userId: any;
  first_name: any;
  last_name: any;
  avatar: any;
  createUserForm: FormGroup;
  updateUserForm: FormGroup;

  @ViewChild("viewModal", { static: true }) viewModal: TemplateRef<any>;
  @ViewChild("createModal", { static: true }) createModal: TemplateRef<any>;
  @ViewChild("updateModal", { static: true }) updateModal: TemplateRef<any>;

  constructor(
    private apiService: ApiService,
    public dialog: MatDialog,
    private _formBuilder: FormBuilder,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.getAllUsers();

    /* ----------==========     Create User Form Builder   ==========---------- */
    this.createUserForm = this._formBuilder.group({
      first_name: ["", [Validators.required]],
      last_name: ["", Validators.required],
      email: ["", Validators.required],
      avartarUrl: ["", Validators.required],
    });

    /* ----------==========     Update User Form Builder   ==========---------- */
    this.updateUserForm = this._formBuilder.group({
      first_name: [null],
      last_name: [null],
      email: [null],
      avartarUrl: [null],
    });
  }

  /* ----------==========     Fetch All User List    ==========---------- */

  getAllUsers() {
    let model = {
      page: this.page,
    };
    this.apiService.getAllUsers(model).subscribe((data) => {
      this.usersList = data["data"];
      this.totalItems = data["total"];
      console.log(this.usersList);
    });
  }

  /* ----------==========     Fetch User List(page number)    ==========---------- */

  gty(page: any) {
    this.apiService.getAllUsers(page).subscribe((data: any) => {
      this.usersList = data["data"];
      this.totalItems = data["total"];
      console.log(this.usersList);
    });
  }

  /* ----------==========     OnSelected User    ==========---------- */

  onSelected(i: any) {
    this.selectedUser = this.usersList[i];
    console.log(this.selectedUser);
  }

  /* ----------==========     Create User   ==========---------- */

  createUser() {
    let model = {
      first_name: this.createUserForm.value.first_name,
      last_name: this.createUserForm.value.last_name,
      email: this.createUserForm.value.email,
      avartarUrl: this.createUserForm.value.avartarUrl,
    };
    if (this.createUserForm.invalid) {
      return this.notificationService.error("Kindly fill all fields");
    }
    this.apiService.createUser(model).subscribe((data: any) => {
      console.log(data);
      this.notificationService.success(
        `user ${data.first_name} ${data.last_name} created succesfully`
      );
      this.createUserForm.reset();
    });
  }

  /* ----------==========     Update User   ==========---------- */
  updateUser() {
    let userId = {
      userId: this.selectedUser.id,
    };
    console.log(userId);
    let model = {
      first_name: this.updateUserForm.value.first_name,
      last_name: this.updateUserForm.value.last_name,
      email: this.updateUserForm.value.email,
      avartarUrl: this.updateUserForm.value.avartarUrl,
    };
    console.log(model);
    console.log("updateUserForm", this.updateUserForm);
    if (this.updateUserForm.invalid) {
      return this.notificationService.error("Kindly fill fields to update");
    }
    this.apiService.updateUser(userId, model).subscribe((data: any) => {
      console.log(data);
      this.notificationService.success(
        `user ${data.first_name} ${data.last_name} updated succesfully`
      );
      this.updateUserForm.reset();
      window.location.reload();
    });
  }

  /* ----------==========     Delete User    ==========---------- */
  openDeleteModal() {
    this.notificationService.confirmation(
      "it will be gone forever",
      () => {
        this.notificationService.success("deleted succesfully");
      },
      "Are you sure?",
      () => {
        this.notificationService.error("delete canceled");
      }
    );
  }

  /* ----------==========     Delete User    ==========---------- */
  deleteUser() {
    let model = {
      userId: this.selectedUser.id,
    };
    this.apiService.deleteUser(model).subscribe((data: any) => {
      console.log("data", data);
    });
  }

  /* ----------==========     Open view Modal    ==========---------- */
  openViewDialog() {
    this.dialog.open(this.viewModal);
  }

  /* ----------==========     Create Modal    ==========---------- */
  openCreateModal() {
    this.dialog.open(this.createModal);
  }

  /* ----------==========     Update Modal    ==========---------- */
  openUpdateModal() {
    this.dialog.open(this.updateModal);
  }
}
