import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChatMessage, Room } from '../Models/chat';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private httpClient: HttpClient) { }
  readonly baseURL = 'https://localhost:44395/api/Message';
  objectRoomModel: Room = new Room();
  objectMessageModel: ChatMessage = new ChatMessage();

  CreateRoom(objectRoomModel): Observable<any>{
    return this.httpClient.post(this.baseURL + '/CreateRoom', objectRoomModel);
  }

  GetRoomMessage(): Observable<any>{
    return this.httpClient.get(this.baseURL + '/GetRoomMessage');
  }

  EditRoom(id: number,objectRoomModel): Observable<any>{
    return this.httpClient.put(this.baseURL + `/EditRoom/${id}`, objectRoomModel);
  }

  DeleteRoom(id: number): Observable<any>{
    return this.httpClient.delete(this.baseURL + `/DeleteRoom/${id}`);
  }

  SendMessage(objectMessageModel): Observable<any>{
    return this.httpClient.post(this.baseURL,objectMessageModel);
  }

  MessageHistory(roomName: string): Observable<any>{
    return this.httpClient.get(this.baseURL + `/Room/${roomName}`);
  }
  
}
