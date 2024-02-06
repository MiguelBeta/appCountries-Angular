import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';


@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
})
export class SearchBoxComponent implements OnInit, OnDestroy {


  //Variable detiene cuando pare de teclear. Subject: Es un observable
  private debouncer: Subject<string> = new Subject<string>();
  private dobouncerSuscription?: Subscription;

  @Input()
  public placeholder: string = '';

  @Output()
  public onValue = new EventEmitter<string>();

  @Output()
  public onDebounce = new EventEmitter<string>();

  @Input()
  public initialValue: string = '';

  ngOnInit(): void {
    this.dobouncerSuscription = this.debouncer
    .pipe(
        debounceTime(300)
      ).
      subscribe( value => {
        this.onDebounce.emit( value );
      });
  }

  //Metodo para ser destruida una instancia cuando se llame el metodo
  ngOnDestroy(): void {
    this.dobouncerSuscription?.unsubscribe();
  }

  emitValue( value: string ): void{
    this.onValue.emit( value );

  }

  onKeyPress( searchTerm: string ){
    this.debouncer.next( searchTerm );
  }

}
