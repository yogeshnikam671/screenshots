import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import * as firebase from 'firebase';
import Firestore = firebase.firestore.Firestore;

@Injectable({
  providedIn: 'root'
})
export class AppService {
  files: File[];
  constructor(private fireStore: Firestore) { }

  saveImageFiles(files){
    this.fireStore.collection("Images").add(files).then(res=>{
      console.log('Posted');
    },err=>{
      console.log(err);
    })
    this.files = files;
  }

  getImageFiles(){
    return this.fireStore.collection("Images").snapshotChanges();
  }
}
