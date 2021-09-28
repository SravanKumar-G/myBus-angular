export class cusSort {
    private sortOrder = 1;
    private collator = new Intl.Collator(undefined, {
        numeric: true,
        sensitivity: 'base'
    });

    // constructor() {
    // }

    public startSort(property: string | number, order: string, type = ''): any {
        if (order === 'desc') {
            this.sortOrder = -1;
        }
        return (a: { [x: string]: string; }, b: { [x: string]: string; }) => {
            if (type === 'date') {
                return this.sortDate(new Date(a[property]), new Date(b[property]));
            } else {
                return this.collator.compare(a[property], b[property]) * this.sortOrder;
            }
        };
    }
    private sortDate(a: number | Date, b: number | Date): any {
        if (a < b) {
            return -1 * this.sortOrder;
        } else if (a > b) {
            return this.sortOrder;
        } else {
            return 0;
        }
    }
}
