import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {EditRecipePage} from '../edit-recipe/edit-recipe';
import {Recipe} from '../../models/recipe.model';
import {RecipesService} from '../../services/recipes.service';
import {RecipePage} from '../recipe/recipe';

@Component({
  selector   : 'page-recipes',
  templateUrl: 'recipes.html'
})
export class RecipesPage {
  recipes: Recipe[];

  constructor(public navCtrl: NavController, private recipesService: RecipesService) {
  }

  onNewRecipe() {
    this.navCtrl.push(EditRecipePage, {mode: 'New'});
  }

  ionViewWillEnter() {
    this.recipes = this.recipesService.getRecipes();
  }

  onLoadRecipe(recipe: Recipe, index: number) {
    this.navCtrl.push(RecipePage, {
      recipe: recipe, index: index
    });
  }


}
