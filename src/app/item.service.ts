import { Injectable } from '@angular/core';
import { Itemlocation } from './itemlocation';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  // Endereço da API para consumo
  readonly url = 'https://jsonplaceholder.typicode.com/photos';

  // Carrega todos os itens da API
  async getAllItemLocations(): Promise<Itemlocation[]> {
    const data = await fetch(this.url);
    return await data.json() ?? [];
  }

  // Carrega um item através do ID
  async getItemLocationById(id: number): Promise<Itemlocation | undefined> {
    const data = await fetch(`${this.url}/${id}`);
    return await data.json() ?? {};
  }

  // TODO: Colocar item no carrinho
  submitBuy(quantity: number) {
    console.log(`Item buy received: quantity: ${quantity}.`);
  }

  constructor() { }
}
