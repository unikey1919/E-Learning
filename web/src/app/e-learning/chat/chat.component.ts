import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MessageService } from 'primeng/api';
import { Room, UserRoom, ChatMessage } from 'src/app/shared/Models/chat';
import { ChatService } from 'src/app/shared/Services/chat.service';
import * as signalR from '@microsoft/signalr';
import * as $ from 'jquery';
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
  formChatMessage: ChatMessage = new ChatMessage();
  formShowMessage: ChatMessage = new ChatMessage();
  lstMessage: ChatMessage[];
  lstRoom: Room[];
  lstUser: UserRoom[];
  joinedRoom: string = '';
  joinedRoomId: number = 0;
  filter: string = '';
  myName: string = '';
  chatUsers: any[] = [];
  chatMessages: any[] = [];
  connection: signalR.HubConnection;
  token: any;
  isEditRoom: Boolean = false;
  serverInfoMessage: string = '';

  constructor(
    private modalService: BsModalService,
    private chatService: ChatService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    this.connection = new signalR.HubConnectionBuilder()
      .configureLogging(signalR.LogLevel.Information)
      .withUrl('https://localhost:44395/chatHub', {
        accessTokenFactory: () => this.token,
      })
      .build();

    this.connection.start().then(() => {
      console.log('SignalR Started....');
      this.getRoom();
      this.userList();
    });

    this.connection.on("newMessage", (messageView) => {
      var isMine = messageView.from === this.myName;
      // this.formChatMessage = new ChatMessage();
      this.formShowMessage = messageView;
      this.formShowMessage.isMine = isMine;
      var message = this.formShowMessage;
      this.chatMessages.push(message);
      $(".chat-body").animate({ scrollTop: $(".chat-body")[0].scrollHeight }, 1000);
    })

    this.connection.on("getProfileInfo",(displayName, avatar) => {
      this.myName = displayName;
      // viewModel.myAvatar(avatar);
      // viewModel.isLoading(false);
    });

    this.connection.on('addChatRoom', () => {
      this.getRoom();
    });

    this.connection.on('getProfileInfo', () => {
      this.userList();
    });

    this.connection.on('addUser', () => {
      this.userList();
    });

    this.connection.on("removeUser", (user) => {
      this.userList();
    });

    this.connection.on('updateChatRoom', () => {
      this.getRoom();
      this.roomUpdate();
    });
  
    this.connection.on("removeChatRoom",()=> {
      this.getRoom();
    });

    this.connection.on("onRoomDeleted",(message)=> {
      this.messageService.add({
        severity: 'error',
        summary: 'error',
        detail: message,
      });
      if(this.lstRoom.length == 0) this.joinedRoom = '';
      else{
        //join first room in list
        setTimeout(() => {
          $("ul#room-list li a")[0].click();
        }, 50);
      }
    });

    
  }

  closeForm() {
    (document.getElementById('myForm') as HTMLElement).style.display = 'none';
  }

  closeAddModel() {
    this.modalRef.hide();
    // this.formAddData = new Room();
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
        // console.log(this.lstRoom);
        // if (this.lstRoom.length > 0) this.joinRoom(this.lstRoom);
      },
      (error) => {}
    );
  }

  roomUpdate() {
    this.formAddData.id = this.joinedRoomId;
    this.joinRoom(this.formAddData);
  }

  joinRoom(room) {
    this.connection.invoke('join', room.name).then(() => {
      this.joinedRoom = room.name;
      this.joinedRoomId = room.id;
      this.userList();
      this.formAddData.name = room.name;
      this.messageHistory();
    });
  }

  userList() {
    this.connection.invoke('GetUsers', this.joinedRoom).then((result) => {
      this.lstUser = new Array();
      this.lstUser = result as UserRoom[];
      console.log(this.lstUser);
    });
  }

  onEditRoom(id: number, formAddData) {
    id = this.joinedRoomId;
    this.chatService.EditRoom(id, formAddData).subscribe(
      (res: any) => {    
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'error',
          detail: 'Fail to create Room',
        });
      }
    );
  }

  showEdit(action: number) {
    action == 1 ? (this.isEditRoom = true) : this.isEditRoom;
  }

  onDeleteRoom() {
    var id = this.joinedRoomId;
    this.chatService.DeleteRoom(id).subscribe(
      (res: any) => {    
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'error',
          detail: 'Fail to create Room',
        });
      }
    );
  }

  onPrivateChat(user){
    var username = user.username;
    var text = this.formChatMessage.content;
    if(text.startsWith("/")) text =  text.split(")")[1];
    
    text = "/private(" + username +")" + text.trim();
    if(!this.joinedRoom) text = "";
    
    this.formChatMessage.content = text;
  }

  sendNewMessage () {
    var text = this.formChatMessage.content;
    //send private
    if (text.startsWith("/")) {
        var receiver = text.substring(text.indexOf("(") + 1, text.indexOf(")"));
        var message = text.substring(text.indexOf(")") + 1, text.length);
        this.sendPrivate(receiver, message);
    }
    else {
        this.sendToRoom(this.joinedRoom, this.formChatMessage.content);
    }

    this.formChatMessage.content =''
  }

  onEnter(d,e){
    if(e.keyCode === 13){
      this.sendNewMessage();
    }
    return true;
  }

  sendPrivate(receiver, message) {
    if (receiver.length > 0 && message.length > 0) {
        this.connection.invoke("SendPrivate", receiver.trim(), message.trim());
    }
  }

  sendToRoom(roomName, message) {
    if(roomName.length > 0 && message.length > 0){
      this.formChatMessage.content = message;
      this.formChatMessage.room = roomName;
      this.chatService.SendMessage(this.formChatMessage).subscribe(
      (res: any) => {    
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'error',
          detail: 'Fail to send message',
        });
      });
    }
  }

  messageHistory() {
    this.chatService.MessageHistory(this.joinedRoom).subscribe(
      (res: any) => {  
        this.chatMessages = [];
        for (var i = 0; i < res.length; i++) {
          var isMine = res[i].from === this.myName;
          this.formShowMessage = res[i];
          this.formShowMessage.isMine = isMine;
          this.chatMessages.push(this.formShowMessage);
      }

      $(".chat-body").animate({ scrollTop: $(".chat-body")[0].scrollHeight }, 1000);
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'error',
          detail: 'Fail to take history message',
        });
      }
    )
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
