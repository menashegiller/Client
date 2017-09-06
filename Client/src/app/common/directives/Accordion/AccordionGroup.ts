import {
    Component,
    Input,
    Host,
    forwardRef,
    Inject,
    ContentChild,
    ElementRef,
    ChangeDetectorRef,
    Output,
    EventEmitter
} from "@angular/core";
import {Accordion} from "./Accordion";
import {AccordionToggle} from "./AccordionToggle";

@Component({
    selector: "accordion-group",
    template: `
<div class="accordionHeader No_PaddingRight NoBorderTop BoxStrokeline accordionHover 
    panel panel-default" [class.dropup]="isOpened" [class.disabled]="disabled">
     <span class="downIcon upIcon icon-05" [class.upIcon]="isOpened" (click)="checkAndToggle(idElement)"></span>    
     <div class="" role="tab" (click)="checkAndToggle(idElement)">
        <a *ngIf="heading" role="button" data-toggle="collapse" [attr.aria-expanded]="isOpened">
            {{ heading }}
        </a>
        <ng-content select="accordion-heading"></ng-content>
        <div class="caret" [style.display]="accordion.showArrows ? '' : 'none'"></div>
     </div>
    <div *ngIf="isOpened" class="panel-collapse collapse in" role="tabpanel" [attr.aria-labelledby]="heading">
      <div class="panel-body"><ng-content></ng-content></div>
    </div>
</div>
`
/*  <span class="downIcon icon-05" [class.upIcon]="isOpened" (click)="checkAndToggle()"></span>
  <div class="panel panel-default" [class.dropup]="isOpened" [class.disabled]="disabled">
    <div class="" role="tab" (click)="checkAndToggle()">
      <div class="accordionHeader">
              <a *ngIf="heading" role="button" data-toggle="collapse" [attr.aria-expanded]="isOpened">
              {{ heading }}</a>
        <ng-content select="accordion-heading"></ng-content>
        <div class="caret" [style.display]="accordion.showArrows ? '' : 'none'"></div>
      </div>
    </div>
    <div *ngIf="isOpened" class="panel-collapse collapse in" role="tabpanel" [attr.aria-labelledby]="heading">
      <div class="panel-body"><ng-content></ng-content></div>
    </div>
  </div>*/

})
export class AccordionGroup {

    @Input()
    heading: string;

    @Input()
    isOpened: boolean = false;

    @Input() 
    idElement: string = '';
    
    @Output()
    onOpen = new EventEmitter();

    @Output()
    onClose = new EventEmitter();

    @Output()
    onToggle = new EventEmitter();

    @ContentChild(AccordionToggle)
    toggler: ElementRef;

    @Input()
    disabled: boolean = false;

    constructor(@Host() @Inject(forwardRef(() => Accordion)) public accordion: Accordion,
                private cdr: ChangeDetectorRef) {
    }

    checkAndToggle(location:string) {
        // if custom toggle element is supplied, then do nothing, custom toggler will take care of it
        if (this.toggler)
            return;
      //  window.location.hash = location;
        this.toggle();
    }

    toggle() {
        if (this.disabled)
            return;

        const isOpenedBeforeWeChange = this.isOpened;
        if (this.accordion.closeOthers)
            this.accordion.closeAll();

        this.isOpened = !isOpenedBeforeWeChange;
        if (this.isOpened) {
            this.onOpen.emit();
        } else {
            this.onClose.emit();
        }
        this.onToggle.emit(this.isOpened);
    }

    openOnInitialization() {
        this.isOpened = true;
        this.cdr.detectChanges();
    }

}
