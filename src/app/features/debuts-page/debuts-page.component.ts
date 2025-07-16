import { Component } from '@angular/core';
import { DebutListComponent } from '@shared/blocks/debuts/debuts-list/debut-list.component';
import { DebutsSortComponent } from '@shared/blocks/debuts/debuts-sort/debuts-sort.component';

@Component({
  selector: 'app-debuts-page',
  standalone: true,
  imports: [DebutListComponent, DebutsSortComponent],
  templateUrl: './debuts-page.component.html',
  styleUrl: './debuts-page.component.scss',
})
export class DebutsPageComponent {}
