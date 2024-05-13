import { group } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { User } from '../../../entities/user';
import { UserService } from '../../../services/common/models/user.service';
import { Create_User } from '../../../contracts/users/create_users';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../../services/ui/custom-toastr.service';
import { MessageType } from '../../../services/admin/alertify.service';
import { BaseComponent } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent extends BaseComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private userService: UserService, private toastrService: CustomToastrService, spinner: NgxSpinnerService){
    super(spinner)
  }

  frm: FormGroup
  ngOnInit(): void {
    this.frm = this.formBuilder.group({
      nameSurname: ["",[
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(3),
      ]],
      userName: ["",[
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(3),
      ]],
      email: ["",[
        Validators.required,
        Validators.maxLength(50),
        Validators.email
      ]],
      password: ["",[
        Validators.required
      ]],
      passwordConfirm: ["",[
        Validators.required
      ]]
    },{
      validators: (group: AbstractControl): ValidationErrors | null =>{
        let sifre = group.get("password").value;
        let sifreTekrar = group.get("passwordConfirm").value;
        return sifre === sifreTekrar ? null : {notSame: true};
      }
    })
  }
  get component(){
    return this.frm.controls;
  }
  sumbitted: boolean = false;
 async onSubmit(user: User){
      this.sumbitted = true;

      if(this.frm.invalid)
        return;

      const result: Create_User = await this.userService.create(user);
      if(result.succeeded){
        this.toastrService.message(result.message,"Kullanıcı Kayıt İşlemi Başatılı",{
          messageType: ToastrMessageType.Success,
          position: ToastrPosition.TopRight,
        })
      }else{
        this.toastrService.message(result.message, "Kullanıcı Kayıt İşlemi Başarısız",{
          messageType: ToastrMessageType.Error,
          position: ToastrPosition.TopRight
        })
      }
  }
}
