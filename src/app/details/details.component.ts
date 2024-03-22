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
      alt="Imagem de {{itemLocation?.title}}"/>
    <section class="listing-description" style="padding: 0px 0px 0 20px;">
      <h3 class="listing-heading">{{itemLocation?.title}}</h3>
      <p class="listing-location">ID-{{itemLocation?.albumId}}-{{itemLocation?.id}}</p>
      <a [routerLink]="['/']" style="margin: 0 0 0px;">Voltar</a>
    </section>
  </article>
  `,
  styleUrl: './details.component.css'
})

// TODO: Implantar um service para salvar dados do carrinho in memory 
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

  // TODO: Implantar salvar no carrinho
  submitBuy() {
    this.itemService.submitBuy(
      this.buyForm.value.quantity ?? 0
    );
  }
}
