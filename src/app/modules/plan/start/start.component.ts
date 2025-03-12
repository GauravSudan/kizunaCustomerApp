import { NoopScrollStrategy } from '@angular/cdk/overlay';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { MatStepper } from '@angular/material/stepper';
import { VerifyComponent } from 'src/app/shared/verify/verify.component';
import { AuthService } from 'src/app/api/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { EngineEmailRequest } from 'src/app/api/Data/Request.type';

@Component({
  selector: 'start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit, OnDestroy {
  title = 'Zona Propietarios - YAMAHA';
  filterParam: any;
  product: any;
  isModalVisible: boolean = false;
  submitted: boolean = false;
  public txtEmail!: string;
  public txtEngineNo!: string;
  public loginForm!: FormGroup;
  public isLoading: boolean = false;

  constructor(private _formBuilder: FormBuilder, private _router: Router,
    private _matDialog: MatDialog,
    private authService: AuthService,
    //private myStepper: MatStepper,
    private route: ActivatedRoute,
    private toastr: ToastrService) { }

  ngOnInit() {
    // this.loginForm = this._formBuilder.group({
    //   txtEngineNo: new FormControl(null) ,
    //   txtEmail: new FormControl(null) 
    // });

    this.loginForm = this._formBuilder.group({
      txtEngineNo: new FormControl(null, [Validators.required, Validators.minLength(1)]) ,
      txtEmail: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]) 
    });

    this.filterParam = this.route
      .paramMap
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        console.log(params.get('productId') || 0);
        this.product = params.get('productId') || 0
      });

    //this.filterParam.subscribe((param: any) => console.log('product.....' + param));
  }

 
  ngOnDestroy() {
    this.filterParam.unsubscribe();
  }

  // async checkVerify(){
  //   const dialogRef = this._matDialog.open(VerifyComponent, {
  //     autoFocus: true,
  //     disableClose: true,
  //     scrollStrategy: new NoopScrollStrategy(),
  //     data: [{
  //       email: this.loginForm.get('txtEmail')?.value,
  //       engineNo: this.loginForm.get('txtEngineNo')?.value
  //     }
  //     ]
  //   });

  //     dialogRef.afterClosed().subscribe(result => {
  //       this.isLoading = false;  // Set the received data from dialog
  //     });
  // }
  async checkVerify() {
    this.submitted = true;

    if(this.loginForm.valid){
      this.isLoading = true;
      // const ParamQuery =  new EngineEmailRequest();
      // ParamQuery.engineNo = this.loginForm.get('txtEngineNo')?.value.trim();
      // ParamQuery.email = this.loginForm.get('txtEmail')?.value.trim(); 

      const ParamQuery = { 
        engineNo : this.loginForm.get('txtEngineNo')?.value.trim(),
        email : this.loginForm.get('txtEmail')?.value.trim() 
      }
      
      try {
        const token = await this.authService.checkEngine(ParamQuery);
        if(token!= null && token.content!= null){
          if(token.content.status == 1){
            this.toastr.success('Motor encontrado!!')

          const dialogRef = this._matDialog.open(VerifyComponent, {
            autoFocus: true,
            disableClose: true,
            scrollStrategy: new NoopScrollStrategy(),
            data: [{
              email: this.loginForm.get('txtEmail')?.value,
              engineNo: this.loginForm.get('txtEngineNo')?.value
            }
            ]
          });

            dialogRef.afterClosed().subscribe(result => {
              this.isLoading = false;  // Set the received data from dialog
            });
          }
          else if(token.content.status == 2){
            this.isLoading = false;
            this.toastr.error('Error al enviar el correo electrónico, comuníquese con el administrador.');
          }
          else{
            this.isLoading = false;
            this.toastr.warning('Motor no encontrado!!');
          }
          
        }
        else{
          this.isLoading = false;
          this.toastr.warning('Motor no encontrado!!');
        }
      } catch (error) {
        this.isLoading = false;
        this.toastr.error('Error al comprobar el motor:'+ error);
      }


      
    }
    else{
      this.toastr.error('Complete los detalles requeridos.');
    }
    
  }

  
  goForward(stepper: MatStepper): void {
    stepper.next();
  }
 


}
