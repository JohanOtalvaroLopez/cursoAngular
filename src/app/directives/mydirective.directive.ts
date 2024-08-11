import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appMydirective]'
})
export class MydirectiveDirective implements OnInit{

  constructor(private eleRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit(): void {
      this.renderer.setStyle(this.eleRef.nativeElement,'background-color','blue');
  }
}
