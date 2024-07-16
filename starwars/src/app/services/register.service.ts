import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private submitSubject = new Subject<void>();

  get submitObservable() {
    return this.submitSubject.asObservable();
  }

  triggerSubmit() {
    this.submitSubject.next();
  }
}