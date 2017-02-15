import {Component} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ShoppingListService} from '../../services/shopping-list.service';
import {Ingredient} from '../../models/ingredient.model';
import {AlertController, LoadingController, PopoverController} from 'ionic-angular';
import {DatabaseOptionsPage} from '../database-options/database-options';
import {AuthService} from '../../services/auth.service';

@Component({
  selector   : 'page-shopping-list',
  templateUrl: 'shopping-list.html'
})
export class ShoppingListPage {

  listItems: Ingredient[];

  constructor(private shoppingListService: ShoppingListService, private popoverCtrl: PopoverController, private authService: AuthService, private loading: LoadingController, private alert: AlertController) {
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

  private handleError(errorMessage: string) {
    const alert = this.alert.create({
      title  : 'An error occured',
      message: errorMessage,
      buttons: ['Ok']
    });
   alert.present();
  }

  onCheckItem(index: number) {
    this.shoppingListService.removeItem(index);
    this.loadItems();
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
                this.shoppingListService.fetchList(token)
                  .subscribe((list: Ingredient[]) => {
                    loading.dismiss();
                    if (list) {
                      this.listItems = list;
                    } else {
                      this.listItems = [];
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
                this.shoppingListService.storeList(token)
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
