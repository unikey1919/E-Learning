export class ChatMessage {
    content: string = '';
    timestamp: string = '';
    from: string = '';
    room: string = '';
    isMine: Boolean = false;
}

export class Room {
    id: number = 0;
    name: string = '';
}

export class UserRoom {
    username: string = '';
    fullName: string = '';
    avatar: string = '';
    currentRoom: string = '';
    device: string = '';
}