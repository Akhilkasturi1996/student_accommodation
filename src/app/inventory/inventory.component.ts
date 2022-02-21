import {Component, OnInit} from '@angular/core';
import {RoomService} from '../services/Room&Block Services/room.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  rooms = [];
  tempRoom = [];
  block = [];
  tempBlock = [];


  constructor(private roomService: RoomService) {
  }

  async ngOnInit() {
    await this.roomService.getRooms().toPromise().then(
      res => {
        this.rooms = res;
      }
    ).catch(
      err => {
        console.log(err);
      }
    );
    if (this.rooms['success']) {
      this.tempRoom = this.rooms['data'];
    }

    await this.roomService.getBlock().toPromise().then(
      res => {
        this.block = res;
      }
    ).catch(
      err => {
        console.log(err);
      }
    );
    if (this.block['success']) {
      this.tempBlock = this.block['data'];
    }

    console.log(this.tempBlock);
  }

  filterTableData(values: any) {

    if (values.value.trim() === '') {
      this.tempRoom = this.rooms['data'];
      return;
    }
    let value = values.value;
    let roomId = [];
    this.tempRoom = [];
    this.rooms['data'].forEach(e => {
      if (e.blockName.toLowerCase().includes(value.toLowerCase())) {
        this.tempRoom.push(e);
      }
    });
  }

  filterBlockTableData(values: any) {

    if (values.value.trim() === '') {
      this.tempRoom = this.rooms['data'];
      return;
    }
    let value = values.value;
    let roomId = [];
    this.tempRoom = [];
    this.rooms['data'].forEach(e => {
      if (e.blockName.toLowerCase().includes(value.toLowerCase())) {
        this.tempRoom.push(e);
      }
    });
  }

}
