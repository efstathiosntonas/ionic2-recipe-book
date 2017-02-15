import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import {EditRecipePage} from '../pages/edit-recipe/edit-recipe';
import {RecipesPage} from '../pages/recipes/recipes';
import {RecipePage} from '../pages/recipe/recipe';
import {ShoppingListPage} from '../pages/shopping-list/shopping-list';
import {TabsPage} from '../pages/tabs/tabs';
import {ShoppingListService} from '../services/shopping-list.service';
import {RecipesService} from '../services/recipes.service';

@NgModule({
  declarations: [
    MyApp,
    EditRecipePage,
    RecipesPage,
    RecipePage,
    ShoppingListPage,
    TabsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    EditRecipePage,
    RecipesPage,
    RecipePage,
    ShoppingListPage,
    TabsPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, ShoppingListService, RecipesService]
})
export class AppModule {}
