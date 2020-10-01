import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
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
    private _cdr: ChangeDetectorRef) {
    this.appService.getImageFiles().subscribe(imageFiles=>{
      this.files = imageFiles;
      this.ids = this.getImageFileIds();
      this._cdr.detectChanges();
      this.updateView();
    });
  }

  ngOnInit(): void {}

  updateView(){
    this.ids.forEach((id, index)=>{
      const image = document.getElementById(id);
      // @ts-ignore
      image.src = URL.createObjectURL(this.files[index]);
    })
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
