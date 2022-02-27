import {Component, OnInit, ViewChild} from '@angular/core';
import {RoomService} from '../services/Room&Block Services/room.service';
import {SweetAlertsService} from '../services/alerts/sweet-alerts.service';
import {PopUpModelComponent} from '../room-booking/PopUp Model/pop-up-model/pop-up-model.component';
import {BookingService} from '../services/booking Service/booking.service';
import Swal from 'sweetalert2';

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
  isupdate = false;
  roomID;

  @ViewChild(PopUpModelComponent) child: PopUpModelComponent;

  constructor(private roomService: RoomService,
              private bookingService: BookingService,
              private sweetAlert: SweetAlertsService) {
  }

  ngOnInit() {
    this.getRooms();

    this.getBlock();
  }

  async getRooms() {
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
      this.tempBlock = this.block['data'];
      return;
    }
    let value = values.value;
    this.tempBlock = [];
    this.block['data'].forEach(e => {
      if (e.blockName.toLowerCase().includes(value.toLowerCase())) {
        this.tempBlock.push(e);
      }
    });
  }

  createBlock(e: any) {
    for (let i = 0; i < this.block['data'].length; i++) {
      if (e.blockNO === this.block['data'][i]['blockNO'].toString()) {
        if (e.blockName.toLowerCase() === this.block['data'][i]['blockName'].toLowerCase()) {
          this.sweetAlert.errorAlerts('Cannot Save', 'Block No and Block Name Already Exists');
          return;
        }
      }
    }
    this.roomService.createBlock(e).subscribe(res => {
        if (res['success']) {
          this.getBlock();
          this.sweetAlert.customSuccessAlert('Block Created Successfully');
        }
      },
      err => {
        console.log(err);
      });
  }

  createRoom(e: any) {
    for (let i = 0; i < this.rooms['data'].length; i++) {
      if (e.blockID === this.rooms['data'][i]['blockID'].toString()) {
        if (Number(e.roomNo) === this.rooms['data'][i]['roomNo']) {
          this.sweetAlert.errorAlerts('Cannot Save', 'Room No and Room Name Already Assigned to Block');
          return;
        }
      }
    }
    this.roomService.createRoom(e).subscribe(res => {
        if (res['success']) {
          this.getRooms();
          this.sweetAlert.customSuccessAlert('New Room Created Successfully');
        }
      },
      err => {
        console.log(err);
      });
  }

  updateRoom(clickedRoom) {
    this.isupdate = true;
    this.child.callRoomUpdate(clickedRoom);
  }

  callUpdateBlock(clickedBlock) {
    this.isupdate = true;
    this.child.callBlockUpdate(clickedBlock);
  }

  updateRooms(e: any) {
    for (let i = 0; i < this.rooms['data'].length; i++) {
      if (e.blockID === this.rooms['data'][i]['blockID']) {
        if (Number(e.roomNo) === this.rooms['data'][i]['roomNo']) {
          this.sweetAlert.errorAlerts('Cannot Save', 'Room No and Room Name Already Assigned to Block');
          return;
        }
      }
    }

    this.roomService.updateRoombyId(e).subscribe(res => {
        if (res['success']) {
          this.getRooms();
          this.sweetAlert.customSuccessAlert('Room Updated Successfully');
        }
      },
      err => {
        console.log(err);
      });
  }

  updateBlock(e) {
    for (let i = 0; i < this.block['data'].length; i++) {
      if (e.blockNO === this.block['data'][i]['blockNO']) {
        if (e.blockName.toLowerCase() === this.block['data'][i]['blockName'].toLowerCase()) {
          this.sweetAlert.errorAlerts('Cannot Save', 'Block No and Block Name Already Exists');
          return;
        }
      }
    }
    this.roomService.updateBlockById(e).subscribe(res => {
        if (res['success']) {
          this.getBlock();
          this.sweetAlert.customSuccessAlert('Block Updated Successfully');
        }
      },
      err => {
        console.log(err);
      });
  }

  async deleteRoom(roomId: number) {
    this.roomID = {roomID: roomId};
    let bookings;
    await this.bookingService.getAllBookings().toPromise().then(res => {
      if (res['success']) {
        bookings = res['data'];
      }
    }).catch(err => {
      console.log(err);
    });


    let exists = bookings.filter(e => {
      return e.roomID === roomId;
    });
    if (exists.length > 0) {
      this.sweetAlert.errorAlerts('Unable to Delete', 'There is a Booking in this Room Number');
      return;
    }


    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.roomService.deleteRoomById(this.roomID).subscribe(res => {
            if (res['success']) {
              this.getRooms();
              Swal.fire(
                'Deleted!',
                'Room has been deleted.',
                'success'
              );
            }
          },
          error => {
            console.log(error);
          });
      }
    });
  }

  async deleteBlock(blockid:number) {

    let bookings;
    await this.bookingService.getAllBookings().toPromise().then(res => {
      if (res['success']) {
        bookings = res['data'];
      }
    }).catch(err => {
      console.log(err);
    });


    let exists = bookings.filter(e => {
      return e.blockID === blockid;
    });
    if (exists.length > 0) {
      this.sweetAlert.errorAlerts('Unable to Delete', 'There is a Booking in this Block');
      return;
    }

    const slBlock = {'blockID': Number(blockid)};
    // this.bookingService.get
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.roomService.deleteBlockById(Number(blockid)).subscribe(res => {
            if (res['success']) {
              this.getBlock();
              Swal.fire(
                'Deleted!',
                'Block has been deleted.',
                'success'
              );
            }
          },
          error => {
            console.log(error);
          });
      }
    });
  }


}
