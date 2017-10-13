import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    exports: [
        CommonModule,
        FormsModule,
        RouterModule
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule
    ]
})
export class SharedModule {}
