import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {MyApp} from './app.component';
import {EditRecipePage} from '../pages/edit-recipe/edit-recipe';
import {RecipesPage} from '../pages/recipes/recipes';
import {RecipePage} from '../pages/recipe/recipe';
import {ShoppingListPage} from '../pages/shopping-list/shopping-list';
import {TabsPage} from '../pages/tabs/tabs';
import {ShoppingListService} from '../services/shopping-list.service';
import {RecipesService} from '../services/recipes.service';
import {SignupPage} from '../pages/signup/signup';
import {SigninPage} from '../pages/signin/signin';
import {AuthService} from '../services/auth.service';
import {DatabaseOptionsPage} from '../pages/database-options/database-options';

@NgModule({
  declarations: [
    MyApp,
    EditRecipePage,
    RecipesPage,
    RecipePage,
    ShoppingListPage,
    TabsPage,
    SignupPage,
    SigninPage,
    DatabaseOptionsPage
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
    TabsPage,
    SignupPage,
    SigninPage,
    DatabaseOptionsPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, ShoppingListService, RecipesService, AuthService]
})
export class AppModule {}
