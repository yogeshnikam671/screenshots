import {ChangeDetectorRef, Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {AppService} from '../app.service';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AnswerComponent implements OnInit {
  @Input() name:string;
  @Input() actualId:string;
  answer: string;
  allAnswers = {};
  answers = [];
  result:string;

  constructor(private appService: AppService, private _cdr: ChangeDetectorRef) {
    this.result = '';
  }

  ngOnInit(): void {
    this.appService.getAnswers().subscribe(answers=>{
      answers.forEach(answer=>{
          if(answer.payload.doc.data()[this.name]){
            this.answers = answer.payload.doc.data()[this.name];
            this.result = this.answers.toString();
            console.log(this.result);
          }
      })
      if(answers.length !== 0){
        this.allAnswers = answers[0].payload.doc.data();
      }
    })
  }

  onClick() {
    if(this.answer){
      this.allAnswers[this.name] =
        this.allAnswers[this.name]? [...this.allAnswers[this.name], this.answer]: [this.answer];
      this.appService.saveAnswers(this.allAnswers);
    }
    this.answers = this.allAnswers[this.name];
    this.result = this.answers.toString();
    this._cdr.detectChanges();
    console.log(this.answers);
  }
}
