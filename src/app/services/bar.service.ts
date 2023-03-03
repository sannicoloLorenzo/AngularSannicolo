import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BarService {
  $mainNav : Subject<boolean>= new Subject();
  // $leavesNav : Subject<boolean>= new Subject();

  constructor() {
    this.$mainNav.next(true);
    // this.$leavesNav.next(false);
   }

  get(bar : string) {
    // switch(bar) {
    //   case "main": {
    //     return this.$mainNav;
    //     break
    //   }
    //   case "leaves": {
    //     // return this.$leavesNav;
    //     break
    //   }

    // }
    return this.$mainNav;
  }

  sendNext(bar:string, valore:boolean){
    // switch(bar) {
    //   case "main": {
    //     this.$mainNav.next(valore);
    //     console.log(bar,valore)
    //     break
    //   }
    //   case "leaves": {
    //     return this.$leavesNav.next(valore);
    //     break
    //   }
    // }
    this.$mainNav.next(valore);
        console.log(bar,valore)
  }

  getMainNav(){
    return this.$mainNav;
  }
  // getleavesNav(){
  //   return this.$leavesNav;
  // }


}
