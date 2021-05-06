import { trigger, state, style, animate, transition } from '@angular/animations';


export const SlideAnimation = 
  trigger('slideIn', [
    state('open', style({
      opacity: 1
    })),
    state('closed', style({
      opacity: 0
    })),
    transition('open <=> closed', [
      animate('300ms')
    ]),
    transition('closed <=> open', [
      animate('300ms')
    ]),
  ])
;


  export const fadeIn = 

 
  trigger('fadeIn', [

    transition(':enter', [
      
      style({
        opacity: 0,
      transform: 'translateY(-5%)'
    }), 
    animate('300ms linear', 
    style({
        opacity: 1,
        transform: 'translateY(0)'
    }))
    ]),

    transition(':leave', [style({
      opacity: 0
  })
  ]),


  ]);
