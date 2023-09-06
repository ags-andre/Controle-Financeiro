import { Injectable } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  constructor(
    private ngxLoader: NgxUiLoaderService,
  ) {}

  private loaderSubject = new BehaviorSubject<boolean>(false);

  public loading: Observable<boolean> = this.loaderSubject.asObservable();

  public show(): void {
    this.ngxLoader.startLoader('loader01');
    this.loaderSubject.next(true);
  }

  public hide(): void {
    this.ngxLoader.stopLoader('loader01');
    this.loaderSubject.next(false);
  }
}
