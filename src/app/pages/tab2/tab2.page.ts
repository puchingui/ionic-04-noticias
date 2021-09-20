import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {IonSegment} from '@ionic/angular';
import {NoticiasService} from '../../services/noticias.service';
import {Article} from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit, AfterViewInit {

  @ViewChild(IonSegment) segment: IonSegment;

  categorias = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];
  noticias: Article[] = [];

  constructor(
    private noticiasService: NoticiasService
  ) {}

  ngOnInit() {
    this.cargarNoticias(this.categorias[0]);
  }

  ngAfterViewInit(): void {
    this.segment.value = this.categorias[0];
  }

  cambioCategoria(event): void {
    this.noticias = [];
    this.cargarNoticias(event.detail.value);
  }

  cargarNoticias(categoria: string, event?): void {
    this.noticiasService.getTopHeadlinesCategoria(categoria)
      .subscribe( resp => {
        // console.log(resp);
        this.noticias.push(...resp.articles);
        if (event) {
          event.target.complete();
        }
      });
  }

  loadData(event): void {
    this.cargarNoticias(this.segment.value, event);
  }

}
