import {
  Component,
  Input,
  forwardRef, inject,
} from '@angular/core';
import {
  ControlContainer,
  ControlValueAccessor, FormControl,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import {CommonModule, NgClass, NgIf} from '@angular/common';
import {svgName} from "../../../core/models/button.model";
import {ButtonComponent} from "../button/button.component";
import {InputErrorsService} from "../../../core/inputErrorsService/input-errors.service";

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
  @Input() svgName: svgName | '' = ''
  @Input() password: boolean = false
  @Input() formControlName?: string;
  @Input() autocomplete: string = 'off';

  value: string = '';
  disabled = false;
  isPasswordVisible: boolean = false
  private controlContainer = inject(ControlContainer);
  private inputErrorsService = inject(InputErrorsService)

  onChange = (value: string) => {
  };
  onTouched = () => {
  };

  showPassword(): void {
    this.isPasswordVisible = !this.isPasswordVisible
    this.isPasswordVisible ? this.type = 'text' : this.type = 'password'
  }

  writeValue(value: string): void {
    console.log(value)
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
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


  get control(): FormControl | null {
    if (!this.formControlName) return null;
    const ctrl = this.controlContainer?.control?.get(this.formControlName);
    return ctrl instanceof FormControl ? ctrl : null;
  }
  get errorMessage(): string |null {
    const control = this.control
    return this.inputErrorsService.getError(control)
  }
}
