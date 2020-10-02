import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import * as firebase from 'firebase';
import {AppService} from '../app.service';

@Component({
  selector: 'app-screenshots',
  templateUrl: './screenshots.component.html',
  styleUrls: ['./screenshots.component.scss']
})
export class ScreenshotsComponent implements OnInit {
  ids: string[];
  files: File[];
  answerId: string;
  isVisible = false;

  constructor(
    private appService: AppService,
    private _cdr: ChangeDetectorRef) {}

  ngOnInit(): void {}

  updateView(file){
    const storage = firebase.storage();
    const storageRef = storage.ref();
    storageRef.child('images/'+ file.name).getDownloadURL().then(function(url){
      console.log(file.name);
      let img = document.getElementById(file.name);
      // @ts-ignore
      img.src = url;
    });
  }

  getImageFileIds(){
    const ids = Array.from(this.files)?.map(file=>{
      return file.name;
    });
    return ids? ids: [];
  }

  viewAnswer(id: string) {
      this.answerId = id;
      this.isVisible = !this.isVisible;
  }
}
