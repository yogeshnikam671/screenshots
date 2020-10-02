import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import {Observable, Subject} from 'rxjs';
import {NgxImageCompressService} from 'ngx-image-compress';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  subject = new Subject();
  observable = this.subject.asObservable();
  files: File[];
  task: AngularFireUploadTask;
  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL: string;
  postId = 0;

  constructor(private firestore: AngularFirestore,
              private storage: AngularFireStorage,
              private imageCompress: NgxImageCompressService) { }

  saveImageFiles(files){
    this.files = files;
    Array.from(files).forEach(file=>{
      this.saveImageFile(file);
    })
    console.log('Posted');
  }

  saveImageFile(file){
    const path = `images/${file.name}`;
    const ref = this.storage.ref(path);
    this.task = this.storage.upload(path, file);
    this.percentage = this.task.percentageChanges();
    this.task.snapshotChanges().subscribe(async(res) =>{
      this.subject.next({done: res.bytesTransferred, total: res.totalBytes})
      this.downloadURL = await ref.getDownloadURL().toPromise();
      if(res.state === 'success'){
        this.firestore.collection('files').add( { downloadURL: this.downloadURL, path }).then(res=>{
          console.log('stored', this.downloadURL);
        })
      }
    })
  }

  getImageFiles(){
    return this.firestore.collection('files').snapshotChanges();
  }

  saveAnswers(answers){
    this.firestore.collection('answers').doc('all').set(answers).then(res=>{
      console.log('Saved');
    })
  }

  getAnswers(){
    return this.firestore.collection('answers').snapshotChanges();
  }

}
