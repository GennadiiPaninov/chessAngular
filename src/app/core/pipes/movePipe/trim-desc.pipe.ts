import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'trimDesc',
  standalone: true,
  pure: true
})
export class TrimDescPipe implements PipeTransform {
  transform(desc: string): string {
    if(desc.length > 25){
      return desc.slice(0, 25) + '...'
    }
    return desc
  }

}

