import { Injectable } from '@angular/core';
import { Itemlocation } from './itemlocation';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  readonly url = 'https://jsonplaceholder.typicode.com/photos';

  async getAllItemLocations(): Promise<Itemlocation[]> {
    const data = await fetch(this.url);
    return await data.json() ?? [];
  }

  async getItemLocationById(id: number): Promise<Itemlocation | undefined> {
    const data = await fetch(`${this.url}/${id}`);
    return await data.json() ?? {};
  }

  submitBuy(quantity: number) {
    console.log(`Item buy received: quantity: ${quantity}.`);
  }

  constructor() { }
}
