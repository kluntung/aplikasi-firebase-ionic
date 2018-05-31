import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Loading, LoadingController, Alert, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../home/home';
import { validateArgCount } from '@firebase/util';


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  //global variable 

  public loginForm: FormGroup;
  public loading: Loading;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public formBuilder: FormBuilder,
    public authProvider: AuthProvider,
    public alertCtrl: AlertController) {

    //fungsi validasi form
    this.loginForm = formBuilder.group({
      email: [
        '',//tanda petik satu merupakan tipe string
        Validators.compose([Validators.required])
      ],
      password: [
        '',
        Validators.compose([Validators.required, Validators.minLength(6)])
      ]
    });
  }

  //fungsi untuk login user
  loginUser(): void {
    //cek apakah form login sudah valid apa belum
    if (!this.loginForm.valid) {
      console.log(`Form belum valid : ${this.loginForm.value}`);
    } else {
      // baca nilai input yg ada di form
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;

      //cocokan dgn firebase
      this.authProvider.loginUser(email, password).then(
        //resolve
        authData => {
          this.loading.dismiss().then(() => {
            this.navCtrl.setRoot(HomePage);
          });
        },
        error => {
          //reject
          this.loading.dismiss().then(() => {
            const alert:Alert = this.alertCtrl.create({
              message:error.message,
              buttons: [{
                text:'OK', role:'cancel'
              }]
            });
            alert.present();
          });
        }
      );
      this.loading = this.loadingCtrl.create();
      this.loading.present();
    }
  }

  //fungsi untuk membuka form signup
  goToSignup():void{
    this.navCtrl.push('SignupPage')
  }

  //fungsi untuk membuka reset pasword

  goToResetPassword():void{
    this.navCtrl.push('ResetPasswordPage');
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
