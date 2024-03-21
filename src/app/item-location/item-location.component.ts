import { Component, Input } from '@angular/core';
import { Itemlocation } from '../itemlocation';

@Component({
  selector: 'app-item-location',
  template: `
  <section class="listing">
    <img class="listing-photo" [src]="itemLocation.thumbnailUrl" alt="Photo of {{itemLocation.title}}">
    <h2 class="listing-heading">{{ itemLocation.title }}</h2>
    <p class="listing-location">{{ itemLocation.id}}, {{itemLocation.albumId }}</p>
    <a [routerLink]="['/details', itemLocation.id]">Learn More</a>
  </section>
  `,
  styleUrl: './item-location.component.css'
})
export class ItemLocationComponent {
  @Input() itemLocation!: Itemlocation;
}
