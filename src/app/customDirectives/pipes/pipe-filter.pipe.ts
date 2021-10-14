import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pipeFilter'
})
export class PipeFilterPipe implements PipeTransform {

  transform(items: any[], status: string): any {
    if (status === 'Paid' || status === 'ToPay') {
      return items.filter(item => item.paymentType === status);
    }else{
      return items;
    }
  }

}
