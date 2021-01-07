import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import {BiensApiService} from '../../biens/biens-api.service';
import {Bien} from '../../biens/bien.model';
import { Location } from '@angular/common';



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
  focus: any;
  focus1: any;

  constructor(private biensApi: BiensApiService, private location: Location) { this.biensList = []; }

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

      

//  supp(form: NgForm) {
  //  console.log(form.value);
   // const id = form.value['id'];
   // this.usersApi.deleteUser(id)
    //    .subscribe(res => {console.log(res);
     //   this.usersListSubs = this.usersApi.getUsers()
      //      .subscribe(res => {this.usersList = res;},
       //     console.error
        //    );
       // });
  //}


}
