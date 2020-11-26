import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {Preferences} from "../preferences/preferences.component.model";
import {RecordsService} from "../records.service";
import {TokenService} from "../token.service";
import {PreferencesService} from "../preferences/preferences.service";

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss']
})
export class PlayComponent implements OnInit {
  @ViewChild('gameModal') gameModal: ElementRef;
  //public Pref$: Subject<Preferences> = new Subject<Preferences>();
  public Pref$: Observable<Preferences>;
  public cardsPref: number;
  public timePref: number;
  public points = 0;
  public seconds: number;
  public numPairsFind = 0;
  public msg;
  public cardSrc: string[] = [];
  public imgSrc: string[] = [];

  private PENALIZER = 700;
  private CARD_BACK = 8;
  private timerGame;
  private cardPlay;
  private timerPenalize;
  private pair = false;
  private differentPairs;
  private allCards: string[] = ['assets/bastos1.jpg', "assets/bastos12.jpg", "assets/copas1.jpg",
    "assets/copas12.jpg", "assets/espadas1.jpg", "assets/espadas12.jpg",
    "assets/oros1.jpg", "assets/oros12.jpg", "assets/reverso.jpg"];


  constructor(private recordsService: RecordsService,
              private tokenService: TokenService,
              private prefService: PreferencesService) {  }

  ngOnInit(): void {
    this.Pref$ = this.prefService.getPreferences$();
    this.Pref$.subscribe( value => {
      console.log("value: " + value);
      this.cardsPref = value.cards;
      this.timePref = value.time;
    });

    this.timePref === undefined ? this.timePref = 0 : this.timePref;
    this.cardsPref === undefined ? this.cardsPref = 20 : this.cardsPref;
    this.cardsPref === 20 ? this.differentPairs = 5 :
      this.cardsPref === 26 ? this.differentPairs = 6 : this.differentPairs = 8;
    //this.timePref = 3;
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
    this.msg = '¡ SE ACABO EL TIEMPO !' + '\n';
    // this.seconds = this.timePref;
    this.seconds = 3;

    function showTime() {
      if (this.seconds < 0) {
        clearInterval(this.timerGame);
        this.endGame();
        return;
      }
      this.seconds = this.seconds - 1;
      //console.log('seg: ' + this.seconds);
    }
    this.timerGame = setInterval(showTime, 1000);
  }

  public onclickCard(id){
    this.imgSrc[id] = this.cardSrc[id];
    this.endGame();

    if (this.pair !== false){
      if (this.cardSrc[id] === this.cardPlay.src) {
        this.points +=  15;
        this.numPairsFind++;
        /*document.getElementById(id).setAttribute("class",
          "blockClick");
        document.getElementById(cardPlay.id).setAttribute("class",
          "blockClick");*/

        if (this.numPairsFind === this.cardsPref / 2) {
          this.msg = '¡ LO CONSEGUISTE !' + '\n';
          this.endGame();
        }
      } else {
        // table.setAttribute("class", "mt-2 container table rounded background blockClick");
        this.timerPenalize = setTimeout(function(){
          //console.log('2SEG: ' + this.timerPenalize);
          this.points > 5 ? this.points -=  5 : this.points = 0;

          /*document.getElementById(cardPlay.id).setAttribute("class",
            "reactiveClick");*/
          // table.setAttribute("class", "mt-2 container table rounded background reactiveClick");

          console.log('PRUEBA')
          console.log(this.CARD_BACK);
          console.log(this.allCards[8]);
          console.log(this.allCards[this.CARD_BACK])
          //console.log(this.cardPlay.idPlay)
          //console.log(this.imgSrc[id])
          this.imgSrc[id] = this.allCards[this.CARD_BACK];
          //this.imgSrc[this.cardPlay.idPlay] = this.allCards[this.CARD_BACK];
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

  private endGame() {
    clearInterval(this.timerGame);
    this.points = this.cardsPref === 26 ? this.points + 25 : this.cardsPref === 32 ? this.points + 50 : this.points;
    this.points = this.timePref === 60 ? this.points + 100 : this.timePref === 90 ? this.points + 75 :
      this.timePref === 120 ? this.points + 50 : this.timePref === 150 ? this.points + 25 : this.points;

    if (this.tokenService.exist) {
      //Modal permita elegir si aceptas
      this.recordsService.newRecordService(this.tokenService.token, this.points, this.cardsPref, this.timePref).subscribe(
        value => {
          console.log(value)
        }
      )
    }

    //this.gameModal.nativeElement.show();
    //setTimeout(function() {
      //$("#gameModal").modal("show");
    //}, 1000);
    /*document.getElementById("acceptModal").addEventListener('click',function () {
      document.getElementById("play").click();
    });*/
  }
}
