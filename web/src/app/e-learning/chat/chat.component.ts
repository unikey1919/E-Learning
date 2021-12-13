import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MessageService } from 'primeng/api';
import { Room, UserRoom } from 'src/app/shared/Models/chat';
import { ChatService } from 'src/app/shared/Services/chat.service';
import * as signalR from '@microsoft/signalr';
import { HubConnectionBuilder, IHttpConnectionOptions } from '@microsoft/signalr';
 
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  providers: [MessageService],
})
export class ChatComponent implements OnInit {
  modalRef: BsModalRef;
  files: any[] = [];
  isAddRoom: Boolean = false;
  formAddData: Room = new Room();
  lstRoom: Room[];
  lstUser: UserRoom[];
  joinedRoom: string = '';
  joinedRoomId: string = '';
  filter: string = '';
  chatUsers:any[] = [];
  connection: signalR.HubConnection;
  token: any;

  constructor(
    private modalService: BsModalService,
    private chatService: ChatService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.token = localStorage.getItem('token')
    this.connection = new signalR.HubConnectionBuilder()
    .configureLogging(signalR.LogLevel.Information)
    .withUrl('https://localhost:44395/chatHub', { accessTokenFactory: () => this.token } )
    .build();

    this.connection.start().then(() => {
      console.log('SignalR Started....');
      this.getRoom();
    });

    this.connection.on('addChatRoom', () => {
      this.getRoom();
    });

    this.connection.on('getProfileInfo', () => {
      this.userList();
    });
  }

  closeForm() {
    (document.getElementById('myForm') as HTMLElement).style.display = 'none';
  }

  closeAddModel() {
    this.modalRef.hide();
    this.formAddData = new Room();
  }

  openModalWithClass(template: TemplateRef<any>, subjectId: number) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg', ignoreBackdropClick: true })
    );
  }

  onSubmit() {
    this.chatService.CreateRoom(this.formAddData).subscribe(
      (res: any) => {
        if (res.isError == true) {
          this.messageService.add({
            severity: 'error',
            summary: 'error',
            detail: 'Fail to create assignment',
          });
        } else {
          this.closeAddModel();
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Room is created',
          });
        }
      },
      (err) => {}
    );
  }

  getRoom() {
    this.chatService.GetRoomMessage().subscribe(
      (res) => {
        this.lstRoom = [];
        this.lstRoom = res as Room[];
        console.log(this.lstRoom);
        if (this.lstRoom.length > 0) this.joinRoom(this.lstRoom);
      },
      (error) => {}
    );
  }

  joinRoom(room) {
    this.connection.invoke('join', room.name).then(() => {
      this.joinedRoom = room.name;
      this.joinedRoomId = room.id;
      this.userList();
    });
  }

  userList() {
    this.connection.invoke('GetUsers', this.joinedRoom).then((result) => {
      this.lstUser = new Array;
      this.lstUser = result as UserRoom[];
      console.log(this.lstUser);
    });
  }

  // filteredChatUsers() {
  //   if (!this.filter) {
  //     return this.chatUsers;
  //   } else {
  //     return ko.utils.arrayFilter(self.chatUsers(), function (user) {
  //       var displayName = user.displayName().toLowerCase();
  //       return displayName.includes(self.filter().toLowerCase());
  //     });
  //   }
  // }
}
