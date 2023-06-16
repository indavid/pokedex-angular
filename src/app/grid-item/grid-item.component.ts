import { Component, Input, SimpleChange } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-grid-item',
  templateUrl: './grid-item.component.html',
  styleUrls: ['./grid-item.component.scss'],
})
export class GridItemComponent {
  constructor(private http: HttpClient) {}

  @Input() pokemon: any = {};
  @Input() id: number = 0;

  ngOnInit() {}

  ngOnChanges(changes: any) {
    if (changes.pokemon && !changes.pokemon.firstChange) {
      console.log('id', this.id);
    }
  }

  capitalizeText(text: string): string {
    if (!text) return '';
    return text.charAt(0).toUpperCase() + text.slice(1);
  }
}
