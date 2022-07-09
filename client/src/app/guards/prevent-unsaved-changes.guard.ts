import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { MemberEditComponent } from '../modules/members/modules/member-edit/member-edit.component';

@Injectable({
  providedIn: 'root'
})
export class PreventUnsavedChangesGuard implements CanDeactivate<unknown> {
  canDeactivate(component: MemberEditComponent): boolean {
    if(component !== null && component !== undefined) {
      if((component.editForm !== null || component.editForm !==  undefined) && component.editForm.dirty) {
        return confirm('Are you sure you want to continue? Any unsaved changes will be lost.')
      }
    }
    return true;
  }
}
