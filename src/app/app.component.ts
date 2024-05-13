import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './services/ui/custom-toastr.service'
import { AuthService } from './services/common/auth.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
declare var $: any

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
   constructor(public authService: AuthService, private toastrService: CustomToastrService, private router: Router){
    authService.identityCheck();
  }
  
  signOut(){
    localStorage.removeItem("accessToken");
    this.authService.identityCheck();
    this.router.navigate([""]);
    this.toastrService.message("Oturum Kapatılmıştır", "Oturum Kapatıldı",{
      messageType: ToastrMessageType.Warning,
      position: ToastrPosition.TopRight
    });
  }
}
