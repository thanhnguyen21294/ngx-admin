import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable()
export class SelectService {
  private notify = new Subject<any>();
  ModifiedUserObservable$ = this.notify.asObservable();

  public notifyModified(data : any) {
    if(data) {
      this.notify.next(data);
    }
  }
}
