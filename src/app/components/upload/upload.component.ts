import { Component, OnInit } from '@angular/core';
import {AppService} from '../app.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  constructor(private appService:AppService){
  }

  ngOnInit(): void {
  }

  async processFile(imageInput: any) {
    await this.appService.saveImageFiles(imageInput.files);
  }
}
