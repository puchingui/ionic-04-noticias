import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage-angular';
import {Article} from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  private storage: Storage | null = null;
  private noticias: Article[] = [];

  constructor( private _storage: Storage ) {
    this.init();
  }

  async init() {
    // eslint-disable-next-line no-underscore-dangle
    this.storage = await this._storage.create();
  }

  guardarNoticia(noticia: Article) {
    const existe = this.noticias.find(noti => noti.title === noticia.title);

    if (!existe) {
      this.noticias.unshift(noticia);
      this.storage.set('favoritos', this.noticias).then(resp => {
        console.log(resp);
        alert('Salvado en favorito');
      });
    }
  }

  cargarFavoritos() {

  }
}
