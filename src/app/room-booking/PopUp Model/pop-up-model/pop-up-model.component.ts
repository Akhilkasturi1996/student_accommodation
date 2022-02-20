import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-pop-up-model',
  templateUrl: './pop-up-model.component.html',
  styleUrls: ['./pop-up-model.component.css']
})
export class PopUpModelComponent implements OnInit {
  blockHidden=false;
  roomHidden=false;

  constructor() { }

  ngOnInit(): void {
  }

  toggle(){
    this.blockHidden = !this.blockHidden;
  }
  toggleRoomCreate(){
    this.roomHidden = !this.roomHidden;
  }

}
