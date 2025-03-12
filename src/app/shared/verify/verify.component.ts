import { NoopScrollStrategy } from '@angular/cdk/overlay';
import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/api/auth/auth.service';
import { StorageService } from 'src/app/storage.service';

@Component({
    selector: 'verify-applicant',
    templateUrl: './verify.component.html',
    styleUrls:['./verify.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VerifyComponent {
    public product: any;
    public filterParam: any;
    public otpvalidateFormGroup!: FormGroup; 
    public submitted: boolean = false;
    public txtOtp: string = '';
    public msg:string = '';
    public email: string='';
    public engineNo: string='';
    

    constructor(private authService: AuthService,private _router: Router,private _formBuilder: FormBuilder,private route: ActivatedRoute, 
        private dialogRef: MatDialogRef<VerifyComponent>,private toastr: ToastrService,
        @Inject(MAT_DIALOG_DATA) public data: any, private storageService: StorageService) { }

        ngOnInit() {
            // this.otpvalidateFormGroup = this._formBuilder.group({
            //     txtOtp: new FormControl(null)
            //   });

            this.email = this.data[0].email;
            this.engineNo = this.data[0].engineNo;
            this.storageService.setItem('LSEngineNo',  this.engineNo );

            this.otpvalidateFormGroup = this._formBuilder.group({
                txtOtp: new FormControl(null, [Validators.required, Validators.minLength(6)])
              });
           
            this.filterParam = this.route
            .paramMap
            .subscribe(params => {
              // Defaults to 0 if no query param provided.
              console.log(params.get('productId') || 0);
              this.product = params.get('productId') || 0
            });
            console.log('this.product '+this.product);
              //this.filterParam.subscribe((param: any) => console.log('product.....' + param));
            }

    closemodal(){
        this.dialogRef.close();
    }
    onKeyPress(event: KeyboardEvent) {
      //const regex = /^[a-zA-Z0-9]*$/; // Only allow letters and numbers
      const regex = /^[0-9]*$/; // Only   numbers
      if (!regex.test(event.key)) {
        event.preventDefault();  // Prevent the key from being entered if it's not allowed
      }
    }
   
    async checkOTP() {
        this.submitted = true;
        if(this.otpvalidateFormGroup.valid){

            const ParamQuery = { 
                otp : this.otpvalidateFormGroup.get('txtOtp')?.value.trim(),
                email : this.email 
              }
              const token = await this.authService.checkOTP(ParamQuery);
              if(token!= null && token.content.status == 1){
                this.dialogRef.close();
                this._router.navigate(['warrantyverification', 'start'],
                { queryParams: { productId: 'valid' } });
                // this._router.navigate(['warrantyverification', 'plan', this.product, 'start'],
                //     { queryParams: { productId: this.engineNo } });
                
              }
              else  if(token!= null && token.content.status == 2){
                this.dialogRef.close();
                this.toastr.warning('La OTP expiró, solicítela nuevamente.');
                
              }
              else{
                this.toastr.error('OTP es incorrecto.');
              }

           
            
        }
        else{
            this.toastr.error('OTP está vacío o no es válido.');
        }
        
    }
}
