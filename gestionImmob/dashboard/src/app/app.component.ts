import { Component, OnInit, Inject, Renderer2, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/filter';
import { DOCUMENT } from '@angular/common';
import { LocationStrategy, PlatformLocation, Location } from '@angular/common';
import { NavbarComponent } from './shared/navbar/navbar.component';


//import {Subscription} from 'rxjs/Rx';
import {UsersApiService} from './users/users-api.service';
import {User} from './users/user.model';
import {BiensApiService} from './biens/biens-api.service';
import {Bien} from './biens/bien.model';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
    title = 'app';
    //usersListSubs: Subscription;
    //usersList: User[];
    //biensListSubs: Subscription;
    //biensList: Bien[];
    private _router: Subscription;
    @ViewChild(NavbarComponent) navbar: NavbarComponent;

    constructor( private usersApi: UsersApiService, private biensApi: BiensApiService, private renderer : Renderer2, private router: Router, @Inject(DOCUMENT,) private document: any, private element : ElementRef, public location: Location) { //this.usersList = []; //this.biensList = [];
    }
    ngOnInit() {
        //this.usersListSubs = this.usersApi
          //.getUsers()
          //.subscribe(res => {
            //  this.usersList = res;
            //},
            //console.error
         //);

         //this.biensListSubs = this.biensApi
          //.getBiens()
          //.subscribe(res => {
            //  this.biensList = res;
            //},
            //console.error
         //);
        var navbar : HTMLElement = this.element.nativeElement.children[0].children[0];
        this._router = this.router.events.filter(event => event instanceof NavigationEnd).subscribe((event: NavigationEnd) => {
            if (window.outerWidth > 991) {
                window.document.children[0].scrollTop = 0;
            }else{
                window.document.activeElement.scrollTop = 0;
            }
            this.navbar.sidebarClose();
        });
        this.renderer.listen('window', 'scroll', (event) => {
            const number = window.scrollY;
            if (number > 150 || window.pageYOffset > 150) {
                // add logic
                navbar.classList.remove('navbar-transparent');
            } else {
                // remove logic
                navbar.classList.add('navbar-transparent');
            }
        });
        var ua = window.navigator.userAgent;
        var trident = ua.indexOf('Trident/');
        if (trident > 0) {
            // IE 11 => return version number
            var rv = ua.indexOf('rv:');
            var version = parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
        }
        if (version) {
            var body = document.getElementsByTagName('body')[0];
            body.classList.add('ie-background');

        }

    }
    removeFooter() {
        var titlee = this.location.prepareExternalUrl(this.location.path());
        titlee = titlee.slice( 1 );
        if(titlee === 'signup' || titlee === 'nucleoicons'){
            return false;
        }
        else {
            return true;
        }
    }

    ngOnDestroy() {
      //this.usersListSubs.unsubscribe();
      //this.biensListSubs.unsubscribe();
    }
}
