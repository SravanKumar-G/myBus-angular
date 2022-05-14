import { Component, OnInit } from '@angular/core';
import {ApiServiceService} from '../../../../services/api-service.service';
import {ApiUrls} from '../../../../_helpers/apiUrls';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-whatsup-app-conversations',
  templateUrl: './whatsup-app-conversations.component.html',
  styleUrls: ['./whatsup-app-conversations.component.css']
})
export class WhatsupAppConversationsComponent implements OnInit {
  currentPageOfWhatsAppConversations: any = [
    {
      toNumber: '9765678934',
      toName: 'Sireesha',
      type: 'gdfh',
      sentBy: 'siri ',
      sentOn: '3/5/1998',
      lastReplyAt: '2:67 AM',
      id: 1,
      status: 'failed',
      sendWhatsMessage: [

      ]
    },
    {
      toNumber: '8974567834',
      toName: 'trip',
      type: 'hdf',
      sentBy: 'siri Hari',
      sentOn: '2/6/1988',
      lastReplyAt: '2:56 PM',
      id: 2,
      sendWhatsMessage: [

      ]
    }
    ];
  public sendWhatsMessage: any = [];
  sendData: any;

  constructor(public apiService: ApiServiceService,
              private apiUrls: ApiUrls,
              private httpClient: HttpClient) { }

  ngOnInit(): void {
    // this.whatsupdetails();
  }

  whatsupdetails(): void{
    this.httpClient.get('http://localhost:3000/userDetails').subscribe((res: any) => {
      if (res){
        this.currentPageOfWhatsAppConversations = res;
      }
    });
  }

  replyMessage(sendData: any, i: number, whatsAppConversation: { toNumber: any; id: any; }): void {
    if (sendData){
      const data = {
        message: sendData,
        time: new Date().getTime(),
        incoming: true,
      };
      const data1 = {
        message: sendData,
        time: new Date().getTime(),
        incoming: false
      };
      this.currentPageOfWhatsAppConversations[i].sendWhatsMessage.push(data, data1);
    }
  }
}
