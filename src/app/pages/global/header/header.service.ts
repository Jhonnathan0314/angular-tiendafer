import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable()
export class HeaderService {

    // private subject = new BehaviorSubject<boolean>(false);
    // showMenu$?: Observable<boolean> = this.subject.asObservable();

    showMenu: boolean = false

    show(){
        // this.subject.next(true);
        this.showMenu = true
    }

    hide(){
        // this.subject.next(false);
        this.showMenu = false
    }

}