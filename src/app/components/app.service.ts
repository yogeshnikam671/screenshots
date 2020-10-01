import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  files: File[];
  private subject = new Subject<any>();
  constructor() { }

  saveImageFiles(files){
    this.files = files;
    this.subject.next(files);
  }

  getImageFiles(){
    return this.subject.asObservable();
  }
}
