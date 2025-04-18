import {Component, Input} from '@angular/core';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-field',
  standalone: true,
  imports: [NgIf],
  templateUrl: './field.component.html',
  styleUrl: './field.component.scss',
})
export class FieldComponent {
  @Input() label: string = '';
  @Input() hint: string = '';
  @Input() required = false;
}
