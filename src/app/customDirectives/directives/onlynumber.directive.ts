import {Directive, ElementRef, HostListener, Pipe, PipeTransform} from '@angular/core';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: 'input[numbersOnly]'
})
export class OnlynumberDirective {

    constructor(private eRef: ElementRef) { }
    private static sortOrder: '';
    private static orderBy = 'asc';

    // @ts-ignore
    static pagination(res, data): void {
        // tslint:disable-next-line:one-variable-per-declaration
        let count, add, total = 0, size = 0;
        count = res;
        if (data.pageSizes.length === 0) {
            if (count >= 10) {
                data.pageSizes.push(10);
            }
            for (let i = 0; i < 4; i++) {
                add = Math.ceil((10 + count) / 10);
                add = Math.ceil((add / 10)) * 20;
                total = total + add;
                if (total >= count) {
                    break;
                } else {
                    data.pageSizes.push(total);
                }
            }
            data.pageSizes.push(count);
        } else {
            data.pageSizes = [];
            if (count >= 10) {
                data.pageSizes.push(10);
            }
            for (let i = 0; i < 4; i++) {
                add = Math.ceil((10 + count) / 10);
                add = Math.ceil((add / 10)) * 20;
                total = total + add;
                if (total >= count) {
                    break;
                } else {
                    data.pageSizes.push(total);
                }
            }
            data.pageSizes.push(count);
        }
        data.pageSizes = [...new Set(data.pageSizes)];
        data.pageSizes.sort((a: number, b: number) => a - b);
        size = data.pageSizes.length;
    }

    // @ts-ignore
    static clickSorting(event, data): void {
        console.log(event.target.accessKey);
        if (event.target.accessKey) {
            this.sortOrder = event.target.accessKey;
            if (this.orderBy === 'desc') {
                this.orderBy = 'asc';
                data.sortOrder = this.sortOrder;
                data.sort = this.sortOrder + ',asc';
                data.orderBy = 'asc';
            } else {
                this.orderBy = 'desc';
                data.sortOrder = this.sortOrder;
                data.sort = this.sortOrder + ',desc';
                data.orderBy = 'desc';
            }
        }
    }
    // Allowing Only Number for Inputs
    @HostListener('input', ['$event']) onInputChange(event: any): void {
        const initialValue = this.eRef.nativeElement.value;
        this.eRef.nativeElement.value = initialValue.replace(/[^0-9]*/g, '');
        if (initialValue !== this.eRef.nativeElement.value) {
            event.stopPropagation();
        }
    }
}

