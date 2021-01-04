import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import {BiensApiService} from '../../biens/biens-api.service';
import {Bien} from '../../biens/bien.model';

@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.scss']
})

export class LandingComponent implements OnInit {
  title = 'app';
  biensListSubs: Subscription;
  biensList: Bien[];
  focus: any;
  focus1: any;

  constructor(private biensApi: BiensApiService,) { this.biensList = []; }

  ngOnInit() {
         this.biensListSubs = this.biensApi
          .getBiens()
          .subscribe(res => {
              this.biensList = res;
            },
            console.error
         );}
  

}
