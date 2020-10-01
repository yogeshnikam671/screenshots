import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';

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

  constructor() {
  }

  ngOnInit(): void {
    this.allAnswers = JSON.parse(localStorage.getItem('answers'));
    if(this.allAnswers === null){
      this.allAnswers = {};
    }else{
    this.answers = this.allAnswers[this.name];
    }
  }

  onClick() {
    if(this.answer && !this.allAnswers[this.name]?.includes(this.answer)){
      this.allAnswers[this.name] =
        this.allAnswers[this.name]? [...this.allAnswers[this.name], this.answer]: [this.answer];
      console.log(this.allAnswers);
      localStorage.setItem('answers', JSON.stringify(this.allAnswers));
    }
    this.allAnswers = JSON.parse(localStorage.getItem('answers'));
    this.answers = this.allAnswers[this.name];
  }
}
