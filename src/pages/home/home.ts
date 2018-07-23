import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ListPage } from '../list/list';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  categories: string[];

  constructor(public navCtrl: NavController) {

    this.categories = ['FICTION','DRAMA','HUMOUR','POLITICS','PHILOSOPHY','HISTORY','ADVENTURE'];
  }

  goToListPage(category) {
    //push another page onto the history stack
    //causing the nav controller to animate the new page in
    this.navCtrl.push(ListPage, {
      category: category
    });
  }

}
