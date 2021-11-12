import { Injectable } from "@angular/core";
import { AppSettings } from "../app.config";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  public token: string;
  constructor(private _http: HttpClient) {}

  /* ----------==========     Fetch All User List API    ==========---------- */
  getAllUsers(page: any) {
    return this._http.get(AppSettings.API_ENDPOINT + `api/users?page=${page}`);
  }

  /* ----------==========     Create User API    ==========---------- */
  createUser(model: any) {
    return this._http.post(AppSettings.API_ENDPOINT + "api/users", model);
  }

  /* ----------==========     Delete User API    ==========---------- */
  deleteUser(userId: any) {
    return this._http.post(
      AppSettings.API_ENDPOINT + `api/users/${userId}`,
      null
    );
  }

  /* ----------==========     Update User API    ==========---------- */
  updateUser(userId: any, model: any) {
    return this._http.patch(
      AppSettings.API_ENDPOINT + `api/users/${userId}`,
      model
    );
  }

  /* ----------==========     Login API    ==========---------- */
  loginUser(model: any) {
    return this._http.post(AppSettings.API_ENDPOINT + "api/login", model);
  }

  clearLoggedInUser() {
    sessionStorage.removeItem("currentUser");
  }
}
