import {Recipe} from '../models/recipe.model';
import {Ingredient} from '../models/ingredient.model';
import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {AuthService} from './auth.service';
import 'rxjs/Rx';

@Injectable()
export class RecipesService {

  constructor(private http: Http, private authService: AuthService) {
  }

  private recipes: Recipe[] = [];

  addRecipe(title: string, description: string, difficulty: string, ingredients: Ingredient[]) {
    this.recipes.push(new Recipe(title, description, difficulty, ingredients));
  }

  getRecipes() {
    return this.recipes.slice();
  }

  updateRecipe(index: number, title: string, description: string, difficulty: string, ingredients: Ingredient[]) {
    this.recipes[index] = new Recipe(title, description, difficulty, ingredients);
  }

  removeRecipe(index: number) {
    this.recipes.splice(index, 1);
  }

  storeList(token: string) {
    const userId = this.authService.getActiveUeser().uid;
    return this.http.put('https://natural-system-135123.firebaseio.com/' + userId + '/recipes.json?auth=' + token, this.recipes)
      .map((response: Response) => {
        return response.json();
      });
  }

  fetchList(token: string) {
    const userId = this.authService.getActiveUeser().uid;
    return this.http.get('https://natural-system-135123.firebaseio.com/' + userId + '/recipes.json?auth=' + token)
      .map((response: Response) => {
      const recipes: Recipe[] = response.json() ? response.json(): [];
      for(let item of recipes) {
        if(!item.hasOwnProperty('ingredients')){
          item.ingredients = [];
        }
      }
        return recipes;
      })
      .do((recipes: Recipe[]) => {
        if (recipes) {
          this.recipes = recipes;
        } else {
          this.recipes = [];
        }
      });
  }
}
