import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
    selector: 'septa-navbar',
    styleUrls: [ './navbar.scss' ],
    templateUrl: './navbar.html'
})
export class NavbarComponent {
    @ViewChild('title') public title: ElementRef;

    private ngOnInit(): void {
        this.title.nativeElement.focus();
    }
}
