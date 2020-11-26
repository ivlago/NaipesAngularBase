import {Component, OnDestroy, OnInit} from '@angular/core';
import {RecordsService} from "../records.service";

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.scss']
})
export class RecordsComponent implements OnInit, OnDestroy {
  public records: [Object];
  private subscriptions = [];

  constructor(private recordsService: RecordsService) { }

  ngOnInit(): void {
    const topTen = this.recordsService.topTenService().subscribe(
      value => {
        // @ts-ignore
        this.records = value;
        for (let r of this.records) {
          let date = new Date(r['recordDate']);
          let recordDate = date.getDate() + "/" + (date.getMonth() +1) + "/" + date.getFullYear();
          r['recordDate'] = recordDate;
        }
      }
    );
    this.subscriptions.push(topTen);

    const userTopTen = this.recordsService.userTopTenService().subscribe(
      value => {
        console.log(value)
      }
    )
    this.subscriptions.push(userTopTen);
  }

  ngOnDestroy() : void {
    if(this.subscriptions.length > 0) {
      this.subscriptions.forEach((subscription) => {
        subscription.unsubscribe();
      });
    }
  }
}
