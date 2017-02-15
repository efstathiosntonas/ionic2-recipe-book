import {Component} from '@angular/core';
import {AlertController, LoadingController, NavController, PopoverController} from 'ionic-angular';
import {EditRecipePage} from '../edit-recipe/edit-recipe';
import {Recipe} from '../../models/recipe.model';
import {RecipesService} from '../../services/recipes.service';
import {RecipePage} from '../recipe/recipe';
import {DatabaseOptionsPage} from '../database-options/database-options';
import {AuthService} from '../../services/auth.service';

@Component({
  selector   : 'page-recipes',
  templateUrl: 'recipes.html'
})
export class RecipesPage {
  recipes: Recipe[];

  constructor(public navCtrl: NavController, private recipesService: RecipesService, private popoverCtrl: PopoverController, private loading: LoadingController, private authService:AuthService, private alert: AlertController) {
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

  private handleError(errorMessage: string) {
    const alert = this.alert.create({
      title  : 'An error occured',
      message: errorMessage,
      buttons: ['Ok']
    });
    alert.present();
  }

  onShowOptions(event: MouseEvent) {
    const loading = this.loading.create({
      content: 'Please Wait'
    });
    const popover = this.popoverCtrl.create(DatabaseOptionsPage);
    popover.present({ev: event});
    popover.onDidDismiss(
      data => {
        if(!data) {
          return;
        }
        if (data.action == 'load') {
          loading.present();
          this.authService.getActiveUeser().getToken()
            .then(
              (token: string) => {
                this.recipesService.fetchList(token)
                  .subscribe((list: Recipe[]) => {
                    loading.dismiss();
                    if (list) {
                      this.recipes = list;
                    } else {
                      this.recipes = [];
                    }
                  }, error => {
                    loading.dismiss();
                    this.handleError((error.message));
                  });
              }
            );
        } else if (data.action == 'store') {
          loading.present();
          this.authService.getActiveUeser().getToken()
            .then(
              (token: string) => {
                this.recipesService.storeList(token)
                  .subscribe(() => loading.dismiss(), error => {
                    loading.dismiss();
                    this.handleError((error.message));
                  });
              }
            );
        }
      }
    );
  }


}
