import { HttpClient } from '@angular/common/http';
import { afterNextRender, Component, HostListener, inject, Injector, OnInit } from '@angular/core';

const largeScreenSize = 720;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'TodoList';
  injector = inject(Injector);
  isLargeScreen: boolean = true;

  ngOnInit(): void {
  afterNextRender(() => this.checkScreenSize(), {injector: this.injector});
}

  @HostListener('window:resize', ['$event'])
  onResize(event:any): void{
    this.checkScreenSize();
  }

  /** Changes css based on screen size */
  checkScreenSize(): void {
    this.isLargeScreen = window.innerWidth > largeScreenSize; // Adjust breakpoint as needed
  }
}
