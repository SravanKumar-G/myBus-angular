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
  currentPageOfWhatsAppConversations: any = [{}];
  public listOfRoutes: Array<any> = [];
  data: any = {
    phoneNumber: '',
    message: ''
  };
  public currentPageOfWhatsAppConversationsList: any;
  // @ts-ignore
  public conversationData: boolean;
  singleConversationList: any;
  name: any;
  phoneNumber: any;
  public travelDatesData: Array<any> = [];

  constructor(public apiService: ApiServiceService,
              private apiUrls: ApiUrls,
              private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.listOfRoutes = ['All', 'A.S.Peta', 'Bangalore', 'Chennai', 'chirala', 'Hyderabad', 'Nellore', 'Ongole', 'Pamuru',
      'Srikakulam', 'Tirupathi', 'Vijayawada', 'Visakhapatnam' ];
    this.getAll();
  }
// getAll(): void{
//     console.log(this.data.phoneNumber);
//     this.apiService.getAll(this.apiUrls.getAllConversations + this.data.phoneNumber, {}).subscribe((res: any) =>{
//       if (res){
//         this.currentPageOfWhatsAppConversations = res;
//         this.conversationData = false;
//         console.log(this.currentPageOfWhatsAppConversations, '========>');
//       }
//     });
// }
  getAll(): void{
    this.apiService.getAll(this.apiUrls.getAllConversations, {phoneOrPnrNumber: this.data.phoneOrPnrNumber, from: this.data.from, to: this.data.to}).subscribe((res: any) => {
      if (res){
        this.currentPageOfWhatsAppConversations = res;
        this.conversationData = false;
      }
    });
  }
  // replyMessage1(): void{
  //   // this.singleConversationList.push({
  //   //   inComing: false,
  //   //   message: this.data.message,
  //   //   response: null,
  //   //   sentAt: 1663069391927,
  //   //   sentBy: '584bdac177c88b7456bfd5f2',
  //   // });
  //   this.apiService.getAll(this.apiUrls.replyWhastappMessage, {phoneNumber: '91' + this.phoneNumber, message: this.data.message}).subscribe((res: any) => {
  //     // if (res){
  //     this.currentPageOfWhatsAppConversationsList = res;
  //     this.data.message = '';
  //       // this.getAll();
  //     this.getMessageByNum({phoneNumber: this.phoneNumber});
  //     // }
  //   });
  // }
  replyMessage(): void{
    this.apiService.getAll(this.apiUrls.replyOneMessge, {phoneNumber: '91' + this.phoneNumber, message: this.data.message}).subscribe((res: any) => {
      // if (res){
      this.currentPageOfWhatsAppConversationsList = res;
      this.data.message = '';
      this.getMessageByNum({phoneNumber: this.phoneNumber});
      this.getAll();
      // }
    });
  }

  getMessageByNum(item: any): void{
    this.travelDatesData = item.travelDates;
    this.name = item.name;
    this.phoneNumber = item.phoneNumber;
    this.apiService.getAll(this.apiUrls.getConversationsByNum + item.phoneNumber, {}).subscribe((res: any) => {
      if (res){
        this.singleConversationList = res;
        this.conversationData = true;
      }
    });
  }
}
