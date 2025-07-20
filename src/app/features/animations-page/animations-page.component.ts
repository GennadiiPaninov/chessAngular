import { Component } from '@angular/core';
import {ShapeAnimationComponent} from "@shared/animations/shape-animation/shape-animation.component";

@Component({
  selector: 'app-animations-page',
  standalone: true,
  imports: [
    ShapeAnimationComponent
  ],
  templateUrl: './animations-page.component.html',
  styleUrl: './animations-page.component.scss'
})
export class AnimationsPageComponent {

}
