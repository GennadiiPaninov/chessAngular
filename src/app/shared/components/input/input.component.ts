import {
  Component,
  Input,
  forwardRef,
  OnInit,
  inject
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  FormControl,
  NgControl, ReactiveFormsModule
} from '@angular/forms';
import {CommonModule, NgClass, NgIf} from '@angular/common';
import {svgName} from "../../../core/models/button.model";
import {ButtonComponent} from "../button/button.component";

@Component({
  selector: 'app-input',
  standalone: true,
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  imports: [CommonModule, NgClass, NgIf, ButtonComponent],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ]
})
export class InputComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() type: string = 'text';
  @Input() placeholder = '';
  @Input() id: string = crypto.randomUUID();
  @Input() error: string = ''
  @Input() svgName: svgName | '' = ''
  @Input() password: boolean = false

  value: string = '';
  disabled = false;
  isPasswordVisible: boolean = false

  onChange = (value: string) => {};
  onTouched = () => {};
  showPassword():void{
    this.isPasswordVisible = !this.isPasswordVisible
    this.isPasswordVisible ? this.type = 'text' : this.type = 'password'
  }
  writeValue(value: string): void {
    console.log(value)
    this.value = value;
  }

  registerOnChange(fn: any): void {
    console.log(fn)
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    console.log(fn)
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onInput(event: Event) {
    const target = event.target as HTMLInputElement;
    console.log(target.value)
    this.value = target.value;
    this.onChange(this.value);
    this.onTouched();
  }

}
