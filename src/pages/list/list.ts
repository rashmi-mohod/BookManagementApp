import { Component } from '@angular/core';
import { NavController, NavParams, Config } from 'ionic-angular';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from '../../../node_modules/rxjs/Observable';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  
  
  icons: string[];
  items: Array<{title: string, author: string, category: string, pdf: any,html:any, text1:any, text2:any,
     images: any}>;
  selectedCategory: any;
  configUrl: string;
  config: any;
  forwardUrl: any;
  category: any;
  notPresent: boolean;
  myInput: string;
  booklist: any;
  filteredList: { title: string; author: string; category: string; }[];
  


  constructor(public navCtrl: NavController, public navParams: NavParams,
    private http: HttpClient) {
      this.items = [];
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedCategory = navParams.get('category');

    this.configUrl = 'http://gutendex.com/books/?mime_type=image';
    this.showConfigResponse(this.configUrl);
    
  }
 
  showConfigResponse(url) {
    this.getConfigResponse(url)
      .subscribe(resp => {
        this.config = { ... resp.body };
        console.log(this.config);
        this.forwardUrl = this.config.next;
        
        for (let i = 0; i < this.config.results.length ; i++) {
          this.category = null;
          let stringToSplit = this.config.results[i].subjects;
          for (let j = 0; j < stringToSplit.length ; j++) {
          let x = stringToSplit[j].split(" ");
            for(let k=0; k< x.length; k++){
              if(x[k].toLowerCase() == this.selectedCategory.toLowerCase()){
                this.category = this.selectedCategory.toLowerCase();
               
                break;
              }
              
            }

          //console.log(x[0]);

          }
          if(this.category != null){
            if(this.config.results[i].authors.length > 0){
              this.items.push({
                title: this.config.results[i].title,
                author: this.config.results[i].authors[0].name,
                category: this.category,
                pdf: this.config.results[i].formats["application/pdf"],
                html: this.config.results[i].formats["text/html; charset=utf-8"],
                text1: this.config.results[i].formats["text/plain; charset=utf-8"],
                text2: this.config.results[i].formats["text/plain; charset=iso-8859-1"],
                images : this.config.results[i].formats["image/jpeg"]
            });
          }
          else{
            this.items.push({
              title: this.config.results[i].title,
              author: 'anonymus',
              category: this.category,
              pdf: this.config.results[i].formats["application/pdf"],
              html: this.config.results[i].formats["text/html; charset=utf-8"],
              text1: this.config.results[i].formats["text/plain; charset=utf-8"],
              text2: this.config.results[i].formats["text/plain; charset=iso-8859-1"],
              images : this.config.results[i].formats["image/jpeg"]
            });
          }
          
        }
      }
       this.filteredList  = Object.assign([], this.items);
      });

  }
    
  getConfigResponse(url): Observable<HttpResponse<Config>> {
    return this.http.get<Config>(
      url, { observe: 'response' });
  }

  itemTapped(event, item) {
    let url = "none";
    if(item.pdf != undefined || item.pdf != null ){
      url = item.pdf;
      window.open(url);
    }
    else if(item.html != undefined|| item.html != null){
      url = item.html;
      window.open(url);
    }
    else if(item.text1 != undefined||item.text1 != null){
      url = item.text1;
      window.open(url);
    }else if(item.text2 != undefined||item.text2 != null){
      url = item.text2;
      window.open(url);
    }
    else{
      alert("No viewable version available");
    }
    
  }

  doInfinite(infiniteScroll) {
    console.log('Begin async operation');
    this.showConfigResponse(this.forwardUrl);
      infiniteScroll.complete();
  }
  onInput(ev){
// if the value is an empty string don't filter the items
    if (this.myInput && this.myInput.trim() != '') {
    this.filteredList = this.items.filter((item) => {
    return (item.title.toLowerCase().indexOf(this.myInput.toLowerCase()) > -1 ||
    item.author.toLowerCase().indexOf(this.myInput.toLowerCase()) > -1
  );
  })
}
}



}


