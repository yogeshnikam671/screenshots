import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import * as firebase from 'firebase';
import {AppService} from '../app.service';

@Component({
  selector: 'app-screenshots',
  templateUrl: './screenshots.component.html',
  styleUrls: ['./screenshots.component.scss']
})
export class ScreenshotsComponent implements OnInit {
  ids = [];
  files: any;
  downloadUrls = [];
  answerId: string;
  isVisible = false;

  constructor(
    private appService: AppService,
    private _cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.getImageFileIds();
  }

  updateView(){
    this.downloadUrls.forEach((downloadURL, index) =>{
      let image = document.getElementById(this.ids[index]);
      // @ts-ignore
      image.src = downloadURL;
    })
  }

  getImageFileIds(){
    this.appService.getImageFiles().subscribe(res=>{
      this.files = res;
      this.files.forEach(file=>{
        this.downloadUrls.push(file.payload.doc.data().downloadURL);
        this.ids.push(file.payload.doc.data().path.split('/')[1]);
      })
      this._cdr.detectChanges();
      this.updateView();
    })
  }

  viewAnswer(id: string) {
      this.answerId = id;
      this.isVisible = !this.isVisible;
  }
}
