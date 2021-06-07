import { Component, Input, HostListener, OnInit, AfterViewInit } from '@angular/core';
import { State } from '@progress/kendo-data-query';
import { ColumnComponent } from '@progress/kendo-angular-grid';
import { IntlService } from '@progress/kendo-angular-intl';

const hasClass = (el, className) => new RegExp(className).test(el.className);
@Component({
  selector: 'app-grid-menu-column',
  templateUrl: './grid-menu-column.component.html',
  styleUrls: ['./grid-menu-column.component.scss'],
})

export class GridMenuColumnComponent implements OnInit, AfterViewInit {



  @Input() column: ColumnComponent;
  @Input() gridCurrentState: State;
  @Input() tooltip: string;
  @Input() textMatIcon: string;
  @Input() fontIcon: string;
  @Input() fontSet: string;
  @Input() columnAlign: string;
  @Input() title: string;
  @Input() multiTitle: any;
  @Input() type = 'default';
  @Input() disabledClick = false;

  public element: HTMLElement;


  constructor(public intlService: IntlService,
  ) {

  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {

  }

  @HostListener('click', ['$event.target'])
  onClick(element) {
    const e = element.querySelector('.k-grid-column-menu.k-grid-filter');

    if (e) {
      setTimeout(() => {
        if (!this.disabledClick) {
          e.click();
        }
      });
    } else {
      const extraElements = hasClass(element, 'gc-column-menu');
      if (extraElements) {
        const ep = element.parentElement.parentElement.querySelector('.k-grid-column-menu.k-grid-filter');
        if (ep) {
          setTimeout(() => {
            if (!this.disabledClick) {
              ep.click();
            }
          });
        }
      }
    }
  }

  public isOrdered(columnName: string, dir: 'asc' | 'desc'): boolean {
    const order = this.gridCurrentState.sort;
    let hide = false;

    order.forEach((col, index) => {
      if (col.field === columnName && col.dir === dir) {
        hide = true;
      }
    });
    return hide;
  }

  public getOrder(columnName: string): number {
    const order = this.gridCurrentState.sort;
    let indexOrder: number;
    if (order?.length === 1) {
      indexOrder = 0;
    } else {
      order.forEach((col, index) => {
        if (col.field === columnName) {
          indexOrder = index + 1;
        }
      });
    }
    return indexOrder;
  }


}
