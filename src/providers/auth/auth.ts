//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { User } from '@firebase/auth-types';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {
  currentUser = firebase.auth().currentUser;
/*
  constructor(public http: HttpClient) {
    console.log('Hello AuthProvider Provider');
  }*/

  // fungsi untuk login
  loginUser(email: string, password: string): Promise<void> {
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
  }

  //fungsi untuk signup

  signupUser(email: string, password: string): Promise<void> {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(newUser => {
        firebase
          .database()
          //.ref(`/userProfile/${newUser.uid}/email`)// gunakan tanda cacing biar tidak error
          .ref(`/userProfile/${this.currentUser.uid}/email`)
          .set(email);
      })

      // then boleh banyak nama then chain

      .catch(error => {
        console.error(error);
        throw new Error(error);
      });
  }

  //fungsi reset password
  resetPassword(email: string): Promise<void> {
    return firebase
      .auth()
      .sendPasswordResetEmail(email);
  }

  //fungsi logout

  logoutUser(): Promise<void> {
    const userId: string = firebase
      .auth()
      .currentUser.uid;
    firebase.database()
      .ref(`/userProfile/${userId}`)
      .off();

    return firebase.auth().signOut();
  }

}


  //shift + alt + f merapikan code