import { Component,  EventEmitter, Input, Output, ViewChild} from '@angular/core';

import {NgClass, NgIf} from "@angular/common";
import {svgName, variant} from "../../../core/models/button.model";

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [NgIf, NgClass],
  templateUrl: './button.component.html',

})
export class ButtonComponent {
  @Output() clicked = new EventEmitter<void>();
  @Input() label: string = ""
  @Input() svgName: svgName | "" = ""
  @Input() variant: variant | "" = "";
  // свг и текст меняются местами
  @Input() reverse: boolean = false
  @Input() width: 'full' | '' = ''
  // без таба
  @Input()tabindex: string = ""
  @Input() disabled: boolean = false
  handleClick(){
    this.clicked.emit()
  }
}
