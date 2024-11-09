import {Component, OnDestroy, OnInit} from '@angular/core';
import {ApiServiceService} from '../../../../services/api-service.service';
import {ApiUrls} from '../../../../_helpers/apiUrls';
import { HttpClient } from '@angular/common/http';
import {Observable, Subscription, timer} from 'rxjs';
import Swal from "sweetalert2";

@Component({
  selector: 'app-whatsup-app-conversations',
  templateUrl: './whatsup-app-conversations.component.html',
  styleUrls: ['./whatsup-app-conversations.component.css']
})
export class WhatsupAppConversationsComponent implements OnInit, OnDestroy {
  currentPageOfWhatsAppConversations: any = [{}];
  public listOfRoutes: Array<any> = [];
  data: any = {
    phoneNumber: '',
    message: '',
    serviceNumbers: []
  };
  listOfServiceNumber: Array<any> = [];
  public currentPageOfWhatsAppConversationsList: any;
  // @ts-ignore
  public conversationData: boolean;
  singleConversationList: any;
  name: any;
  phoneNumber: any;
  serviceNumber: any;
  isReplyPending: boolean = false;
  isComplaint: boolean = false;
  public travelDatesData: Array<any> = [];
  public sub: any = Subscription;
  everyFiveSec: Observable<number> = timer(0, 70000);
  public index: any = 0;
  constructor(public apiService: ApiServiceService,
              private apiUrls: ApiUrls,
              private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.listOfRoutes = ['All', 'A.S.Peta', 'Bangalore', 'Chennai', 'chirala', 'Hyderabad', 'Nellore', 'Ongole', 'Pamuru',
      'Srikakulam', 'Tirupathi', 'Vijayawada', 'Visakhapatnam' ];
    this.getAll(false);
    // this.conversationData = false;
    this.getServiceReports();
    this.timerFun();
  }

  timerFun(): void{
    this.sub = this.everyFiveSec.subscribe(() => {
      this.getAll(true);
      this.getMessageByNum(this.currentPageOfWhatsAppConversations[this.index], this.index);
    });
  }
  ngOnDestroy(): void{
    this.sub.unsubscribe();
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
  getAll(booleanVa: any): void{
    this.apiService.getAll(this.apiUrls.getAllConversations, {phoneOrPnrNumber: this.data.phoneOrPnrNumber,
      serviceNumbers: this.data.serviceNumbers,
      isReplyPending: this.data.isReplyPending,
      isComplaint: this.data.isComplaint,
      from: this.data.from, to: this.data.to}).subscribe((res: any) => {
      if (res){
        this.currentPageOfWhatsAppConversations = res;
        this.conversationData = booleanVa;
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
    if(this.data.message.trim().length > 0) {
      this.apiService.getAll(this.apiUrls.replyOneMessge, {
        phoneNumber: this.phoneNumber,
        message: this.data.message
      }).subscribe((res: any) => {
        // if (res){
        this.currentPageOfWhatsAppConversationsList = res;
        this.data.message = '';
        this.getMessageByNum({phoneNumber: this.phoneNumber}, '');
        this.getAll('');
        // }
      });
    }
  }



  getMessageByNum(item: any, index: any): void{
    this.index = index;
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
  getServiceReports(): void{
    this.apiService.get(this.apiUrls.getServiceReport).subscribe((res: any) => {
      if (res){
        this.listOfServiceNumber = res;
      }
    });
  }

  escalateTicket(travelDateInfo: any): void {
    /*this.apiService.update(this.apiUrls.bookingFeedbackStatusUpdate + id,
        {
          serviceFeedbackId: id,
          status: 'Escalated'
        }).subscribe((res: any) => {
      Swal.fire('Great', 'Booking feedback status is successfully updated', 'success');
    }, error => {
      Swal.fire('Error', 'Booking feedback status update failed', 'error');
    });*/
  }

  sendDiscountMessage() : void{
    this.apiService.get(this.apiUrls.sendDiscountInfo + this.phoneNumber).subscribe((res: any) => {
      this.getMessageByNum({phoneNumber: this.phoneNumber}, '');
    });
  }

  addComment(): void{
    if(this.data.message.trim().length > 0) {
      this.apiService.getAll(this.apiUrls.addCommentToWhatsappMessage + this.phoneNumber, {phoneNumber: '91' + this.phoneNumber, message: this.data.message}).subscribe((res: any) => {
        this.getMessageByNum({phoneNumber: this.phoneNumber}, '');
      });
    }
  }
}
