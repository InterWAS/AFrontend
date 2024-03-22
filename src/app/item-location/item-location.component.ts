import { Component, Input } from '@angular/core';
import { Itemlocation } from '../itemlocation';

@Component({
  selector: 'app-item-location',
  template: `
  <section class="listing">
    <img class="listing-photo" [src]="itemLocation.thumbnailUrl" alt="Imagem de {{itemLocation.title}}">
    <h3 class="listing-heading" style="margin: 0 0 0px;">{{ itemLocation.title.substring(0, 19) + (itemLocation.title.length>20 ? "..." : "") }}</h3>
    <p class="listing-location" style="margin: 0 0 0px;">ID-{{itemLocation.albumId }}-{{ itemLocation.id}}</p>
    <a [routerLink]="['/details', itemLocation.id]" style="margin: 0 0 0px;">Exibir</a>
  </section>
  `,
  styleUrl: './item-location.component.css'
})
export class ItemLocationComponent {
  @Input() itemLocation!: Itemlocation;
}
