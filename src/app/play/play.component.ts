import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Observable} from "rxjs";
import {Preferences} from "../preferences/preferences.component.model";
import {RecordsService} from "../records.service";
import {TokenService} from "../token.service";

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss']
})
export class PlayComponent implements OnInit, OnDestroy {
  @ViewChild('gameModal') gameModal: ElementRef;
  public cardsPref: number;
  public timePref: number;
  public points:number = 0;
  public disposedTime: number = 0;
  public numPairsFind: number = 0;
  public msg: string;
  public cardSrc: string[] = [];
  public imgSrc: string[] = [];
  public saveRecord: string = '';
  public timerGame;

  private PENALIZER: number = 700;
  private CARD_BACK: number = 8;
  private pair: boolean = false;
  private differentPairs: number;
  private cardPlay;
  private timerPenalize;
  private allCards: string[] = ['assets/bastos1.jpg', "assets/bastos12.jpg", "assets/copas1.jpg",
    "assets/copas12.jpg", "assets/espadas1.jpg", "assets/espadas12.jpg",
    "assets/oros1.jpg", "assets/oros12.jpg", "assets/reverso.jpg"];


  constructor(private recordsService: RecordsService,
              public tokenService: TokenService) {  }

  ngOnInit(): void {
    this.cardsPref = parseInt(localStorage.getItem('cardsPref'));
    this.timePref = parseInt(localStorage.getItem('timePref'));

    this.timePref === undefined ? this.timePref = 0 : this.timePref;
    this.cardsPref === undefined ? this.cardsPref = 20 : this.cardsPref;
    this.cardsPref === 20 ? this.differentPairs = 5 :
      this.cardsPref === 26 ? this.differentPairs = 6 : this.differentPairs = 8;

    console.log('pref: ' + this.cardsPref + ' ' + this.timePref);
    this.createTable();
  }

  private createTable() {
    let randomCards = [];
    for (let i = 0; i < this.differentPairs; i++) {
      randomCards.push(i);
      randomCards.push(i);
      randomCards.push(i);
      randomCards.push(i);
      this.cardsPref === 26 && (i === 1) ? randomCards.push(i) && randomCards.push(i) : null;
    }
    randomCards = randomCards.sort(function () {
      return Math.random() - 0.5;
    });
    for (const random of randomCards) {
      this.cardSrc.push(this.allCards[random]);
      this.imgSrc.push(this.allCards[this.CARD_BACK]);
    }
    console.log(this.cardSrc);
    this.timePref !== 0 ? this.crono() : this.timePref;
  }

  public crono() {
    //this.timePref = 2;
    let context = this;
    let seconds = this.timePref;
    this.disposedTime = seconds;
    function showTime() {
      context.disposedTime = seconds;
      if (seconds <= 0) {
        this.msg = '¡ SE ACABO EL TIEMPO !' + '\n';
        context.endGame();
      }
      seconds--;
    }

    this.timerGame = setInterval(showTime, 1000);
  }

  public onclickCard(id: number){
    this.imgSrc[id] = this.cardSrc[id];

    if (this.pair !== false){
      if (this.cardSrc[id] === this.cardPlay.src) {
        this.points +=  15;
        this.numPairsFind++;
        /*document.getElementById(id).setAttribute("class",
          "blockClick");
        document.getElementById(cardPlay.id).setAttribute("class",
          "blockClick");*/

        if (this.numPairsFind === this.cardsPref/2) {
          this.msg = '¡ LO CONSEGUISTE !' + '\n';
          this.endGame();
        }
      } else {
        // table.setAttribute("class", "mt-2 container table rounded background blockClick");
        this.timerPenalize = setTimeout(() =>{
          this.points > 5 ? this.points -=  5 : this.points = 0;

          /*document.getElementById(cardPlay.id).setAttribute("class",
            "reactiveClick");*/
          // table.setAttribute("class", "mt-2 container table rounded background reactiveClick");

          this.imgSrc[id] = this.allCards[this.CARD_BACK];
          this.imgSrc[this.cardPlay.idPlay] = this.allCards[this.CARD_BACK];
        }, this.PENALIZER);
      }
      this.pair = false;
    } else {
      this.cardPlay = {idPlay: id, src: this.cardSrc[id]};
      // document.getElementById(this.cardPlay.id).setAttribute("class",
      //   "blockClick");
      this.pair = true;
    }
  }

  public restart() {
    this.ngOnDestroy();
  }

  private endGame() {
    clearInterval(this.timerGame);
    this.points = this.cardsPref === 26 ? this.points + 25 : this.cardsPref === 32 ? this.points + 50 : this.points;
    this.points = this.timePref === 60 ? this.points + 100 : this.timePref === 90 ? this.points + 75 :
      this.timePref === 120 ? this.points + 50 : this.timePref === 150 ? this.points + 25 : this.points;

    if (this.tokenService.exist) {
      //setTimeout(function() {
        //this.gameModal.nativeElement.show();
      //}, 1000);

      console.log("newREg")
      let jsonNewRecord = {punctuation: this.points, cards: this.cardsPref, disposedTime: this.disposedTime};
      this.recordsService.newRecordService(this.tokenService.token, jsonNewRecord).subscribe(
        value => {
          this.saveRecord = 'Record guardado';
          console.log("nuevo registro: "+value)
        }
      )
    }
  }

  ngOnDestroy() : void {
    clearInterval(this.timerGame);
  }
}
