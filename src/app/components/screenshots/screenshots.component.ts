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
  ques: string;
  answerBank: Object;

  constructor(
    private appService: AppService,
    private _cdr: ChangeDetectorRef) {
    this.appService.getAnswers().subscribe(answers=>{
      if(answers.length !== 0){
        this.answerBank = answers[0].payload.doc.data();
        }
      }
    );
  }

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

  onClick() {
    console.log(this.ids);
    this.ids.forEach(id=>{
      if(this.answerBank[id] && this.isAvailable(this.answerBank[id])){
        console.log(id);
        const screenshot = document.getElementById(id);
        screenshot.scrollIntoView();
      }
    })
  }

  isAvailable(answers):boolean{
    console.log(answers);
    let isFlag = false;
    const ans = answers;
    ans.forEach(entry =>{
      const keyword = entry.toString();
      if(keyword.includes(this.ques.toLowerCase())){
        console.log('YESH');
        isFlag = true;
      }
    })
    return isFlag;
  }
}
