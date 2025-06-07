import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';

import {NgClass, NgIf, NgSwitch, NgSwitchCase} from "@angular/common";
import {svgName, tagType, variant} from "../../../core/models/common-models/button.model";

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [NgIf, NgClass, NgSwitch, NgSwitchCase],
  templateUrl: './button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class ButtonComponent {
  @Output() clicked = new EventEmitter<void>()
  @Input() label: string = ""
  @Input() svgName: svgName | "" = ""
  @Input() variant: variant | "" = "";
  // свг и текст меняются местами
  @Input() reverse: boolean = false
  @Input() width: 'full' | '' = ''
  // без таба
  @Input()tabindex: string = ""
  @Input() disabled: boolean = false
  @Input() link: string = '/'
  @Input() tag: tagType = 'button'
  @Input() type: string = ''
  handleClick(event: MouseEvent) {
    event.stopPropagation()
    this.clicked.emit()
  }
}
