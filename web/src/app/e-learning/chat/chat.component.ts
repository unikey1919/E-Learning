import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  constructor() { }
  files: any[] = [];
  ngOnInit(): void {
    this.files = [{
      id: "hello",
      test: "alo",
    },
    {
      id: "hello1",
      test: "alo1",
    },
  ]
  }

   closeForm() {
    (document.getElementById("myForm") as HTMLElement).style.display = "none";
  }

}
