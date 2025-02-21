import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../api';
import { AuthLoginModel } from '../../api/auth/authModel';
import { CommonModule } from '@angular/common';
import { UserService } from 'src/app/api/user/user.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.less',
  providers: [UserService]
})
export class LoginComponent {
  router = inject(Router);
  loginObj: AuthLoginModel = {
    email: '',
    password: ''
  }

  constructor(private  userService : UserService) {}

  async onLogin(){
    try{
      const response = await AuthService.login(this.loginObj);
      if(response && response.data.role === "ADMIN"){
        localStorage.setItem('access_token', response.data.token); 
        localStorage.setItem('role', response.data.role);
        this.router.navigate(['/category']);
        this.userService.getMyInfo().then((res) => {
          localStorage.setItem('userInfo', JSON.stringify(res.data.user));
        })
      }
    }catch(err){
      alert('err');
    }
  }


}
