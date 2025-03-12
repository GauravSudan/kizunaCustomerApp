import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss']
})
export class SubscriptionComponent {
  isLinear: boolean = true;
  title = 'Zona Propietarios - YAMAHA';
  // firstFormGroup = this._formBuilder.group({
  //   firstCtrl: ['', Validators.nullValidator],
  // });
  // secondFormGroup = this._formBuilder.group({
  //   secondCtrl: ['', Validators.nullValidator],
  // });
  thirdFormGroup = this._formBuilder.group({
    thirdCtrl: ['', Validators.nullValidator],
  });
  fourthFormGroup = this._formBuilder.group({
    fourthCtrl: ['', Validators.nullValidator],
  });
  isEditable = true

  constructor(private _formBuilder: FormBuilder,
    private _router: Router
  ) { }

  subscribenav() {
    this._router.navigate(['warrantyverification', 'fz']);
  }
  logout(){
    this._router.navigate(['/']);
  }
}
