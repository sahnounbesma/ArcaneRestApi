import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import {BiensApiService} from '../../biens/biens-api.service';
import {Bien} from '../../biens/bien.model';
import { Location } from '@angular/common';
import { NgForm }   from '@angular/forms';


@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.scss']
})

export class LandingComponent implements OnInit {
  @Input() bien: Bien;
  
  title = 'app';
  biensListSubs: Subscription;
  biensList: Bien[];
  biensListVille: Bien[];
  biensListType: Bien[];
  biensListPiece: Bien[];
  focus: any;
  focus1: any;

  constructor(private biensApi: BiensApiService, private location: Location) { this.biensList = []; this.biensListVille = []; this.biensListPiece = [];}

  ngOnInit() {
         this.biensListSubs = this.biensApi
          .getBiens()
          .subscribe(res => {
              this.biensList = res;
            },
            console.error
         );}
  
save(form: NgForm) {
     const nom = form.value['nom'];
     const description = form.value['description'];
     const ville = form.value['ville'];
     const pieces = form.value['pieces'];
     const caracteristiques = form.value['caracteristiques'];
     const proprietaire = form.value['proprietaire'];
     const type_bien = form.value['type_bien'];
     const id = form.value['id'];
     this.biensApi.updateBien(id, nom, description, type_bien , ville, pieces, caracteristiques, proprietaire)
         .subscribe(res => {console.log(res);
         this.biensListSubs = this.biensApi.getBiens()
             .subscribe(res => {this.biensList = res;},
             console.error
          );
    });
  }

      

 supp(form: NgForm) {
    console.log(form.value);
    const id = form.value['id'];
    this.biensApi.deleteBien(id)
        .subscribe(res => {console.log(res);
        this.biensListSubs = this.biensApi.getBiens()
            .subscribe(res => {this.biensList = res;},
            console.error
            );
        });
  }

ajout(form: NgForm) {
     console.log(form.value);
     const nom = form.value['nom'];
     const description = form.value['description'];
     const ville = form.value['ville'];
     const pieces = form.value['pieces'];
     const caracteristiques = form.value['caracteristiques'];
     const proprietaire = form.value['proprietaire'];
     const type_bien = form.value['type_bien'];
     this.biensApi.addBien(nom, description, type_bien , ville, pieces, caracteristiques, proprietaire)
         .subscribe(res => {console.log(res);
         this.biensListSubs = this.biensApi.getBiens()
             .subscribe(res => {this.biensList = res;},
             console.error
          );
    });
  }


ville(form: NgForm) {
     console.log(form.value);
     const ville = form.value['ville'];
     this.biensApi.searchBienVille(ville)
         .subscribe(res => {console.log(res);
                            this.biensListVille = res;
                            console.log(this.biensListVille);
                            },
             console.error
          );
      
    }

type(form: NgForm) {
     console.log(form.value);
     const type_bien = form.value['type_bien'];
     this.biensApi.searchBienType(type_bien)
         .subscribe(res => {console.log(res);
                            this.biensListType = res;
                            console.log(this.biensListType);
                            },
             console.error
          );
      
    }

piece(form: NgForm) {
     console.log(form.value);
     var pieces = form.value['pieces'];
     this.biensApi.searchBienPiece(pieces)
         .subscribe(res => {console.log(res);
                            this.biensListPiece = res;
                            console.log(this.biensListPiece);
                            },
             console.error
          );
      
    }
    




}
