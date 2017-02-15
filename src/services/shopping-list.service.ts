import {Ingredient} from '../models/ingredient.model';
import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {AuthService} from './auth.service';
import 'rxjs/Rx';

@Injectable()
export class ShoppingListService {

  constructor(private http: Http, private authService: AuthService) {
  }

  private ingredients: Ingredient[] = [];

  addItem(name: string, amount: number) {
    this.ingredients.push(new Ingredient(name, amount));
  }

  addItems(items: Ingredient[]) {
    this.ingredients.push(...items);
  }

  getItems() {
    return this.ingredients.slice();
  }

  removeItem(index: number) {
    this.ingredients.splice(index, 1);
  }

  storeList(token: string) {
    const userId = this.authService.getActiveUeser().uid;
    return this.http.put('https://natural-system-135123.firebaseio.com/' + userId + '/shopping-list.json?auth=' + token, this.ingredients)
      .map((response: Response) => {
        return response.json;
      });
  }

  fetchList(token: string) {
    const userId = this.authService.getActiveUeser().uid;
    return this.http.get('https://natural-system-135123.firebaseio.com/' + userId + '/shopping-list.json?auth=' + token)
      .map((response: Response) => {
        return response.json();
      })
      .do((ingredients: Ingredient[]) => {
        if (ingredients) {
          this.ingredients = ingredients;
        } else {
          this.ingredients = [];
        }
      });
  }
}
