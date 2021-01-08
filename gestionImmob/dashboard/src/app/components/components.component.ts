import { Component, OnInit, Renderer2 ,Input} from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

import { Subscription } from 'rxjs/Subscription';
import {UsersApiService} from '../users/users-api.service';
import {User} from '../users/user.model';
import { Location } from '@angular/common';
import { NgForm }   from '@angular/forms';

@Component({
    selector: 'app-components',
    templateUrl: './components.component.html',
    styles: [`
    ngb-progressbar {
        margin-top: 5rem;
    }
    `]
})

export class ComponentsComponent implements OnInit {
    page = 4;
    page1 = 5;
    focus;
    focus1;
    focus2;
    date: {year: number, month: number};
    model: NgbDateStruct;
    @Input() user: User;

    private _router: Subscription;

    constructor( private renderer : Renderer2, private usersApi: UsersApiService,  private location: Location) {}
    isWeekend(date: NgbDateStruct) {
        const d = new Date(date.year, date.month - 1, date.day);
        return d.getDay() === 0 || d.getDay() === 6;
    }

    isDisabled(date: NgbDateStruct, current: {month: number}) {
        return date.month !== current.month;
    }

    ngOnInit() {
        let input_group_focus = document.getElementsByClassName('form-control');
        let input_group = document.getElementsByClassName('input-group');
        for (let i = 0; i < input_group.length; i++) {
            input_group[i].children[0].addEventListener('focus', function (){
                input_group[i].classList.add('input-group-focus');
            });
            input_group[i].children[0].addEventListener('blur', function (){
                input_group[i].classList.remove('input-group-focus');
            });
        }
    }

    save(form: NgForm) {
     console.log(form.value);
     const pseudo = form.value['pseudo'];
     const password = form.value['password'];
     this.usersApi.connect(pseudo, password)
         .subscribe(res => {console.log(res);
         });
     location.replace('/#/user-profile'); 
    }

}
