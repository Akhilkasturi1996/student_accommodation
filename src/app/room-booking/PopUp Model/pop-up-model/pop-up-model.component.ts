import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {RoomService} from '../../../services/Room&Block Services/room.service';

@Component({
  selector: 'app-pop-up-model',
  templateUrl: './pop-up-model.component.html',
  styleUrls: ['./pop-up-model.component.css']
})
export class PopUpModelComponent implements OnInit {
  blockHidden = false;
  submitted = false;
  block = [];
  tempBlock = [];
  roomID;
  roomNo;
  blockID;
  blockNo;

  @Input() isUpdate = false;
  @Input() roomHidden = false;

  constructor(private roomService: RoomService) {
  }

  @Output() popUpItemEvent = new EventEmitter<any>();
  @Output() popUpRoomDataEvent = new EventEmitter<any>();
  @Output() popUpUpdateRoomEvent = new EventEmitter<any>();
  @Output() popUpUpdateBlockEvent = new EventEmitter<any>();

  BlockForm = new FormGroup({
    blockNo: new FormControl('', [Validators.required]),
    blockName: new FormControl('', [Validators.required]),
    genderType: new FormControl('male')
  });

  RoomForm = new FormGroup({
    roomNo: new FormControl('', [Validators.required]),
    status: new FormControl('active'),
    blockID: new FormControl('', [Validators.required])
  });

  ngOnInit(): void {
    this.getBlock();
  }

  async getBlock() {
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
  }

  get b() {
    return this.BlockForm.controls;
  }

  get r() {
    return this.RoomForm.controls;
  }

  toggle() {
    this.submitted = false;
    this.blockHidden = !this.blockHidden;
    if (this.roomHidden || this.isUpdate) {
      this.roomHidden = false;
      this.isUpdate = false;
    }
  }

  toggleRoomCreate() {
    this.submitted = false;
    this.roomHidden = !this.roomHidden;
    if (this.blockHidden || this.isUpdate) {
      this.blockHidden = false;
      this.isUpdate = false;
    }
  }

  sendCreateBlockData() {
    this.submitted = true;
    if (this.BlockForm.invalid) {
      return;
    }
    this.popUpItemEvent.emit(this.BlockForm.value);
    this.blockHidden = !this.blockHidden;
    this.BlockForm.reset();
    this.submitted = false;
  }

  sendCreateRoomData() {
    this.submitted = true;
    if (this.RoomForm.invalid) {
      return;
    }
    this.popUpRoomDataEvent.emit(this.RoomForm.value);
    this.roomHidden = !this.roomHidden;
    this.RoomForm.reset();
    this.submitted = false;
  }

  callRoomUpdate(roomdata) {
    this.RoomForm.get('roomNo').disable();
    this.isUpdate = true;
    this.roomHidden = true;
    this.RoomForm.get('roomNo').patchValue(roomdata.roomNo);
    this.RoomForm.get('blockID').patchValue(roomdata.blockID);
    this.RoomForm.get('status').patchValue(roomdata.status.toLowerCase());
    this.roomID = roomdata.roomID;
    this.roomNo = roomdata.roomNo;
  }

  callBlockUpdate(blockData) {
    this.BlockForm.get('blockNo').disable();
    this.isUpdate = true;
    this.blockHidden = true;
    this.BlockForm.get('blockNo').patchValue(blockData.blockNO);
    this.BlockForm.get('blockName').patchValue(blockData.blockName);
    this.BlockForm.get('genderType').patchValue(blockData.genderType);
    this.blockID = blockData.blockID;
    this.blockNo = blockData.blockNO;
  }

  updateRoomData() {
    this.submitted = true;
    if (this.RoomForm.invalid) {
      return;
    }
    this.RoomForm.value['roomId'] = this.roomID;
    this.RoomForm.value['roomNo'] = Number(this.roomNo);
    this.RoomForm.value['blockID'] = Number(this.RoomForm.value.blockID);
    this.popUpUpdateRoomEvent.emit(this.RoomForm.value);
    this.roomHidden = !this.roomHidden;
    this.RoomForm.reset();
    this.submitted = false;
    this.isUpdate = false;
    this.RoomForm.get('roomNo').enable();
  }

  updateBlockData() {
    this.submitted = true;
    if (this.BlockForm.invalid) {
      return;
    }
    this.BlockForm.value['blockID'] = Number(this.blockID);
    this.BlockForm.value['blockNo'] = Number(this.blockNo);
    this.popUpUpdateBlockEvent.emit(this.BlockForm.value);
    this.blockHidden = !this.blockHidden;
    this.BlockForm.reset();
    this.submitted = false;
    this.isUpdate = false;
    this.BlockForm.get('blockNo').enable();
  }

}
