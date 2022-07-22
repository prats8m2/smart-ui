import { Injectable } from "@angular/core";
import { IPermissions } from "./../interfaces/permissions";
import { HttpClient } from "@angular/common/http";
import { USER } from "../constants/api";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class SidenavService {

  isSidebarVisible = false;
  sidebarVisibilityChange: Subject<boolean> = new Subject<boolean>();

  constructor(private http: HttpClient) {
    this.sidebarVisibilityChange.subscribe(value => {
      this.isSidebarVisible = value;
    });
  }

  getPermissions(uiPermissions: any, navItems: any) {
    const hideSection = [];
    for (const key in uiPermissions) {
      const permission = uiPermissions[key];
      if (!permission.status) {
        hideSection.push(`/${permission.name}`);
      }
    }
    for (let index = 0; index < navItems.length; index++) {
      const element = navItems[index];
      if (element.path) {
        if (hideSection.includes(element.path)) {
          navItems.splice(index, 1);
        }
      } else {
        if (element.items) {
          // console.log(element.items.length)
          for (let idx = 0; idx < element?.items?.length; idx++) {
            const ele = element.items[idx];
            // console.log(ele)
            if (hideSection.includes(ele.path)) {
              if (navItems[index]) element.items.splice(idx, 1);
            }
          }
          navItems[index] = element;
        }
      }
    }
    return navItems;
  }

  getAssignedFolder() {
    return this.http
      .get(USER.GET_ASSIGNED_FOLDERS)
      .toPromise()
      .then((response) => {
        const result = JSON.parse(JSON.stringify(response));
        return result;
      });
  }
}
