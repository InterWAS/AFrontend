import { Component, inject } from '@angular/core';
import { Itemlocation } from '../itemlocation';
import { ItemService } from '../item.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-home',
  template: `
  <section>
    <form>
      <mat-form-field style="padding: 0px 20px 0 0px;">
        <mat-label>Filtrar</mat-label>
        <input matInput name="filtro" placeholder="Digite algo..." [(ngModel)]="value" type="text" #filter>
        @if (value) {
          <button matSuffix mat-icon-button aria-label="Limpar" (click)="value=''">
            <mat-icon>close</mat-icon>
          </button>
        }
      </mat-form-field>
      <button mat-fab color="primary" aria-label="Pesquisar" type="button" (click)="filterResults(filter.value)">
        <mat-icon>search</mat-icon>
      </button>
    </form>
  </section>
  <mat-paginator [length]="totalItems" [pageSize]="pageSize" [pageIndex]="currentPage" (page)="pageChanged($event)"></mat-paginator>
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
  totalItems = 5000;
  pageSize = 100;
  currentPage = 0;
  defaultTotalItems = 5000;
  value = '';
  selected = 'id';
  ascendingOrder = true;
  ultimoFiltro = '';

  constructor() {
    // Carrega todos os itens e faz a paginação inicial
    this.totalItems = this.defaultTotalItems;
    this.itemService.getAllItemLocations().then((itemLocationList: Itemlocation[]) => {
      this.itemLocationList = itemLocationList;
      this.filteredItemList = itemLocationList.slice(this.currentPage * this.pageSize, ((this.currentPage + 1) * this.pageSize) - 1);
    });
  }

  // Rotina para filtrar os resultados
  filterResults(text: string) {
    if (this.currentPage > 0) {
      if (this.ultimoFiltro != text) {
        this.currentPage = 0;
      }
    }
    // Salva último
    this.ultimoFiltro = text;

    // Se estiver em branco mostra todos
    if (!text) {
      this.filteredItemList = this.itemLocationList;
      this.totalItems = this.defaultTotalItems;
      this.paginate();
      return;
    }

    // Efetua a filtragem dos items por ID ou Titulo
    this.filteredItemList = this.itemLocationList.filter(
      itemLocation => itemLocation?.id.toString().includes(text.toLowerCase()) || itemLocation?.title.includes(text.toLowerCase())
    );
    // Reseta a paginação após a filtragem
    //this.currentPage = 0;
    this.totalItems = this.filteredItemList.length;
    this.paginate();
  }

  // Evento invocado pelo componente de paginação
  pageChanged(event: PageEvent) {
    this.currentPage = event.pageIndex;
    // Recarrega lista de filtrados
    this.filterResults(this.ultimoFiltro);
    //this.filteredItemList = this.itemLocationList;
    // Muda a página e atualiza
    //this.paginate();
  }

  // Rotina para fazer a paginação 
  paginate() {
    // TODO: Ordenar por ID ou Titulo
    // this.sortByField(this.value);
    // Faz a paginação recortando da lista
    this.filteredItemList = this.filteredItemList.slice(this.currentPage * this.pageSize, ((this.currentPage + 1) * this.pageSize) - 1);
  }

  // Rotina para ordenar pelo campo selecionado
  sortByField(field: string) {

    // Carrega o campo
    const dynamicKey = field as keyof Itemlocation;

    // Faz a ordenação da lista
    // TODO: Ordem acendente ou descendente
    if (this.ascendingOrder) {
      this.itemLocationList = this.itemLocationList.sort((a, b) => {
        if (a[dynamicKey] < b[dynamicKey])
          return -1;
        if (a[dynamicKey] > b[dynamicKey])
          return 1;
        return 0;
      });
    } else {
      this.itemLocationList = this.itemLocationList.sort((a, b) => {
        if (a[dynamicKey] < b[dynamicKey])
          return 1;
        if (a[dynamicKey] > b[dynamicKey])
          return -1;
        return 0;
      });
    }

  }
}
