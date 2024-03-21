import { Component, inject } from '@angular/core';
import { Itemlocation } from '../itemlocation';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-home',
  template: `
  <section>
    <form>
      <mat-form-field class="example-full-width">
        <mat-label>Filtrar</mat-label>
        <input matInput placeholder="Digite algo..." value="" type="text" #filter>
      </mat-form-field>
      <button mat-raised-button color="primary" type="button" (click)="filterResults(filter.value)">Pesquisar</button>
    </form>
  </section>
  <section class="results">
    <app-item-location
      *ngFor="let itemLocation of filteredItemList"
      [itemLocation]="itemLocation">
    </app-item-location>
  </section>
  `,
  styleUrl: './home.component.css'
})
export class HomeComponent {
  itemLocationList: Itemlocation[] = [];
  itemService: ItemService = inject(ItemService);
  filteredItemList: Itemlocation[] = [];
  constructor() {
    this.itemService.getAllItemLocations().then((itemLocationList: Itemlocation[]) => {
      this.itemLocationList = itemLocationList;
      this.filteredItemList = itemLocationList;
    });
  }

  filterResults(text: string) {
    if (!text) {
      this.filteredItemList = this.itemLocationList;
      return;
    }

    this.filteredItemList = this.itemLocationList.filter(
      itemLocation => itemLocation?.id.toString().includes(text.toLowerCase())
    );
  }

}
