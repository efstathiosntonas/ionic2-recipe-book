import {Component} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ShoppingListService} from '../../services/shopping-list.service';
import {Ingredient} from '../../models/ingredient.model';

@Component({
  selector   : 'page-shopping-list',
  templateUrl: 'shopping-list.html'
})
export class ShoppingListPage {

  listItems: Ingredient[];

  constructor(private shoppingListService: ShoppingListService) {
  }

  onAddItem(form: NgForm) {
    this.shoppingListService.addItem(form.value.ingredientName, form.value.amount);
    form.reset();
    this.loadItems();
  }

  ionViewWillEnter() {
    this.loadItems();
  }

  private loadItems() {
    this.listItems = this.shoppingListService.getItems();
  }

  onCheckItem(index:number) {
    this.shoppingListService.removeItem(index);
    this.loadItems();
  }

}
