import { Directive, Input, ElementRef, OnInit } from "@angular/core";

@Directive({
  selector: "[resizeHorizontalGraph]",
  standalone: true
})
export class ResizeHorizontalGraphDirective implements OnInit {
  @Input() public arr: any[] = [];
  @Input() public barSize: number = 0;

  constructor(private ref: ElementRef) {}

  ngOnInit() {
    if (this.arr.length && this.barSize > 0) {
      this.ref.nativeElement.style.height = `${this.arr.length * this.barSize}px`;
    }
  }
}