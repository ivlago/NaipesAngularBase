import {Component, OnDestroy, OnInit} from '@angular/core';
import {RecordsService} from "../records.service";
import {UserService} from "../user.service";
import {TokenService} from "../token.service";

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.scss']
})
export class RecordsComponent implements OnInit, OnDestroy {
  public message: string = '';
  public records;
  public userRecords;
  private subscriptions = [];

  constructor(private recordsService: RecordsService,
              private userService: UserService,
              private tokenService: TokenService) { }

  ngOnInit(): void {
    const topTen = this.recordsService.topTenService().subscribe(
      value => {
        this.records = value;
        for (let r of this.records) {
          let date = new Date(r['recordDate']);
          let recordDate = date.getDate() + "/" + (date.getMonth() +1) + "/" + date.getFullYear();
          r['recordDate'] = recordDate;
        }
      }, error => {
        console.log(error.status);
      }
    );
    this.subscriptions.push(topTen);

    if (this.userService.userLog !== undefined) {
      let token = this.tokenService.getToken();
      const userTopTen = this.recordsService.userTopTenService(this.userService.userLog, token).subscribe(
        observe => {
          this.tokenService.saveToken(observe.headers.get('Authorization'));
          this.userRecords = observe.body;
          for (let ur of this.userRecords) {
            let date = new Date(ur['recordDate']);
            let recordDate = date.getDate() + "/" + (date.getMonth() +1) + "/" + date.getFullYear();
            ur['recordDate'] = recordDate;
          }
        }, err => {
          console.log(err.status)
        }
      )
      this.subscriptions.push(userTopTen);
    }
  }

  public borrarUserRecords() {
    const deleteRecords = this.recordsService.deleteUserRecordsService(this.tokenService.getToken()).subscribe(
      observe => {
        this.message = 'Datos eliminados correctamente';
        this.userRecords = [];
      }, error => {
        error.status === 401 ? this.message = 'El token no es correcto' :
        this.message = 'Error al eliminar los datos';
        console.log(error.status)
      }
    );
    this.subscriptions.push(deleteRecords);
  }

  ngOnDestroy() : void {
    if(this.subscriptions.length > 0) {
      this.subscriptions.forEach((subscription) => {
        subscription.unsubscribe();
      });
    }
  }
}
