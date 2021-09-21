import {Component, OnInit} from '@angular/core';
import {NoticiasService} from '../../services/noticias.service';
import {Article} from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  noticias: Article[] = [];

  constructor(
    private noticiasService: NoticiasService
  ) {}

  ngOnInit(): void {
    this.cargarNoticias();
  }

  loadData(event): void {
    this.cargarNoticias(event);
  }

  cargarNoticias( event? ): void {
    this.noticiasService.getTopHeadlines()
      .subscribe( resp => {
        // console.log(resp);

        if(resp.articles.length === 0) {
          event.target.disabled = true;
          event.target.complete();
        }

        this.noticias.push(...resp.articles);
      });

    if (event) {
      event.target.complete();
    }
  }

}
