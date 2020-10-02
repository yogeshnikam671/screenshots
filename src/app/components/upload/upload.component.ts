import { Component, OnInit } from '@angular/core';
import {AppService} from '../app.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  done: number;
  total: number;
  constructor(private appService:AppService){
    this.appService.subject.subscribe((uploadObj:any)=>{
      this.done = uploadObj.done;
      this.total = uploadObj.total;
    })
  }

  ngOnInit(): void {
  }

  async processFile(imageInput: any) {
    await this.appService.saveImageFiles(imageInput.files);
  }
}
