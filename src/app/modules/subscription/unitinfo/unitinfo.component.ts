import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/api/auth/auth.service';
import { StorageService } from 'src/app/storage.service';

@Component({
  selector: 'unitinfo',
  templateUrl: './unitinfo.component.html',
  //styleUrls: ['./plan.component.css']
})
export class unitinfoComponent implements OnInit {
  public product: any;
  title = 'Zona Propietarios - YAMAHA';
  public filterParam: any;
  public receivedData: string='';
  public token: any;

  constructor(private storageService: StorageService,
    private authService: AuthService,
    private route: ActivatedRoute
    , private _formBuilder: FormBuilder
    ,private router: Router) { }

  async ngOnInit() {
    if(this.storageService.getItem('LSEngineNo') == null)
      this.router.navigate(['/']);

    // this.otpvalidateFormGroup = this._formBuilder.group({
    //     txtOtp: new FormControl(null)
    //   });

  

    this.filterParam = this.route
    .paramMap
    .subscribe(params => {
      // Defaults to 0 if no query param provided.
      console.log(params.get('productId') || 0);
      this.product = params.get('productId') || 0
    });
    console.log('this.product '+this.product);

    this.receivedData = this.storageService.getItem('LSEngineNo') || '';

    try {
      this.token = await this.authService.authenticate(this.receivedData);
      console.log('Received token:', this.token);
    } catch (error) {
      console.error('Error while fetching OTP:', error);
    }

    }

  logout(){
    this.router.navigate(['/']);
  }
}
