import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemService } from '../item.service';
import { Itemlocation } from '../itemlocation';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-details',
  template: `
  <article>
    <img class="listing-photo" [src]="itemLocation?.url"
      alt="Photo of {{itemLocation?.title}}"/>
    <section class="listing-description">
      <h2 class="listing-heading">{{itemLocation?.title}}</h2>
      <p class="listing-location">{{itemLocation?.id}}, {{itemLocation?.albumId}}</p>
    </section>
    <section class="listing-features">
      <h2 class="section-heading">About this item</h2>
      <ul>
        <li>Units available: 0</li>
        <li>Value: 0.00</li>
      </ul>
    </section>
    <section class="listing-apply">
      <h2 class="section-heading">Buy now</h2>
      <form [formGroup]="buyForm" (submit)="submitBuy()">
        <label for="quantity">Quantity</label>
        <input id="quantity" type="text" formControlName="quantity">
        <button type="submit" class="primary">Buy</button>
      </form>
    </section>
  </article>
  `,
  styleUrl: './details.component.css'
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  itemService = inject(ItemService);
  itemLocation: Itemlocation | undefined;
  buyForm = new FormGroup({
    quantity: new FormControl(0)
  });
  constructor() {
    const itemLocationId = parseInt(this.route.snapshot.params['id'], 10);
    this.itemService.getItemLocationById(itemLocationId).then(itemLocation => {
      this.itemLocation = itemLocation;
    });
  }
  submitBuy() {
    this.itemService.submitBuy(
      this.buyForm.value.quantity ?? 0
    );
  }
}
