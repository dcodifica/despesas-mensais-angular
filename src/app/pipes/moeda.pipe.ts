import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'moeda'
})
export class MoedaPipe implements PipeTransform {

  transform(value: number): string {
    return value.toLocaleString(
      'pt-br', { style: 'currency', currency: 'BRL' }
    );
  }

}
