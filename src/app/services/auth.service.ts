import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { User } from '../interface/user';

import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { MessageService } from './message.service';
import { FirebaseError } from 'firebase/app';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLogged: Boolean = false;
  userID: any;
  user: User = { id: '', name: '', surname: '', email: '', stat: false };
  userRef?: AngularFirestoreDocument<User>;

  user2!: Observable<User>;

  constructor(
    private auth: AngularFireAuth,
    private router: Router,
    private db: AngularFirestore,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) { }

  test() {
    this.isLogged = true;
    console.log(this.isLogged);
    localStorage.setItem('user', 'adam');
  }

  // logowanie
  async signin(email: string, password: string) {
    await this.auth.signInWithEmailAndPassword(email, password)
      .then(res => {
        this.isLogged = true;
        this.userID = res.user?.uid;
        this.getUser(this.userID);
        localStorage.setItem('uid', this.userID);
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['/profile'], { relativeTo: this.route });
        this.db.collection('users');
        this.messageService.succes("Zalogowano pomyślnie");
      }).catch((err: FirebaseError) => {
        if (err.code === "auth/wrong-password") {
          this.messageService.error("Nie poprawne hasło");
        } else if (err.code === "auth/user-not-found") {
          this.messageService.error("Nie znaleziono użytkownika. Sprawdź czy poprawnie wpisałeś e-mail");
        }
      });

  }

  // rejestracja
  async signup(user: User, password: string) {
    await this.auth.createUserWithEmailAndPassword(user.email, password)
      .then(async res => {
        this.isLogged = true;
        this.user = user;
        console.log(this.user);
        this.userID = res.user?.uid;
        this.user.id = this.userID;
        this.creatUser(this.userID, user);
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['/profile'], { relativeTo: this.route });
      }).then(() => {
        this.messageService.succes("Rejestracja przebiegła pomyślnie");
      }).catch((err: FirebaseError) => {

        if (err.code === 'auth/email-already-in-use') {
          this.messageService.error("Istnieje już użytkownik o takim emailu: " + user.email);
        }
        else if(err.code === 'auth/invalid-email') {
          this.messageService.error('Sprawdź czy poprawnie został wpisany e-mail');
        }
        else {
          this.messageService.error("Coś poszło nie tak, kod błędu: " + err.code);
        }

      });
  }

  creatUser(uid: string, user: User) {
    this.db.collection('users').doc<User>(uid).set({ id: uid, stat: false, email: user.email, name: user.name, surname: user.surname });
  }

  editNameSurnameUser(data: User) {
    this.db.collection('users').doc<User>(data.id).update({ name: data.name, surname: data.surname }).then(() => {
      this.messageService.succes("Pomyślnie edytowano dane użytkownika");
    }).catch((err: FirebaseError) => {
      this.messageService.error("Coś poszło nie tak, kod błędu: " + err.code);
    });
  }

  // wylogowanie sie

  logout() {
    this.auth.signOut().then(() => {
      this.messageService.succes("Pomyślnie wylogowano");
      localStorage.clear;
      this.isLogged = false;
      this.user = { id: '', name: '', surname: '', email: '' };
      localStorage.clear();
      this.router.navigate([''])
    }).catch((err: FirebaseError) => {
      this.messageService.error("Coś poszło nie tak, kod błędu: " + err.code);
    });;

  }

  getUser(uid: string) {

    this.userRef = this.db.doc('users/' + uid);
    this.userRef.snapshotChanges().pipe(
      map(res => ({ id: res.payload.id, ...res.payload.data() as User })))
      .subscribe(data => {
        this.user.id = data.id;
        this.user.email = data.email;
        this.user.name = data.name;
        this.user.surname = data.surname;
        this.user.stat = data.stat;

        //console.log(this.user);
      })
  }



  changePassword() {
    const auth = getAuth();
    console.log(this.user.email);
    sendPasswordResetEmail(auth, this.user.email)
      .then(() => {
        // Password reset email sent!
        // ..
      })
      .catch((error: { code: any; message: any; }) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        this.messageService.error(errorMessage);
        // ..
      });
  }

}
