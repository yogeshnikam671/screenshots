import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
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

  constructor(private appService: AppService) {
  }

  ngOnInit(): void {
    this.appService.getAnswers().subscribe(answers=>{
      answers.forEach(answer=>{
          if(answer.payload.doc.data()[this.name]){
            this.answers = answer.payload.doc.data()[this.name];
          }
      })
      if(answers.length !== 0){
        this.allAnswers = answers[0].payload.doc.data();
      }
    })
  }

  onClick() {
    if(this.answer && !this.allAnswers[this.name]?.includes(this.answer)){
      this.allAnswers[this.name] =
        this.allAnswers[this.name]? [...this.allAnswers[this.name], this.answer]: [this.answer];
    }
    this.appService.saveAnswers(this.allAnswers);
    this.answers = this.allAnswers[this.name];
  }
}
