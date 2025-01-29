import { Directive, Input, ElementRef, OnInit, inject } from '@angular/core';

@Directive({
  selector: '[resizeHorizontalGraph]',
  standalone: true,
})
export class ResizeHorizontalGraphDirective implements OnInit {
  private ref = inject(ElementRef);

  @Input() public arr: any[] = [];
  @Input() public barSize: number = 0;

  ngOnInit() {
    if (this.arr.length && this.barSize > 0) {
      this.ref.nativeElement.style.height = `${
        this.arr.length * this.barSize
      }px`;
    }
  }
}
