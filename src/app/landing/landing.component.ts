import { Component, OnDestroy, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Subscription } from 'rxjs';
import { AuthService } from '../shared/services/auth.service';


@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit, OnDestroy {

  userIsAuthenticated = false;
  private authListenerSubs: Subscription;

  dynamicSlides = [
    {
      id: 1,
      src:'assets/images/1.jpg',
      alt:'Side 1',
      title:'~gbenga fagbola',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil numquam quis labore vitae doloremque dolore deserunt natus accusamus magni minima.'
    },
    {
      id: 2,
      src:'assets/images/2.jpg',
      alt:'Side 2',
      title:'~sowemimo tobi',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil numquam quis labore vitae doloremque dolore deserunt natus accusamus magni minima.'
    },
    {
      id: 3,
      src:'assets/images/3.jpg',
      alt:'Slide 3',
      title:'~giwa titlayo',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil numquam quis labore vitae doloremque dolore deserunt natus accusamus magni minima.'
    },
    {
      id: 4,
      src:'assets/images/4.jpg',
      alt:'Side 4',
      title:'~john tosin',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil numquam quis labore vitae doloremque dolore deserunt natus accusamus magni minima.'
    },
    {
      id: 5,
      src:'assets/images/6.jpg',
      alt:'Side 5',
      title:'~joseph daniel',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil numquam quis labore vitae doloremque dolore deserunt natus accusamus magni minima.'
    }
  ]

  constructor(private authService: AuthService) {}

 customOptions: OwlOptions = {
   loop: true,
   mouseDrag: true,
   touchDrag: true,
   pullDrag: false,
   dots: false,
   autoplay:true,
   autoplayTimeout:5000,
   autoplayHoverPause:true,
   slideBy: 1,
   navText: ['&#8249', '&#8250;'],
   responsive: {
     0: {
       items: 1
     },
     400: {
       items: 1
     },
     760: {
       items: 1
     },
     1000: {
       items: 1
     }
   },
   nav: true
 }

  ngOnInit(): void {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }

}
