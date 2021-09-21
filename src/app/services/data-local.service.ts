import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage-angular';
import {Article} from '../interfaces/interfaces';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  public noticias: Article[] = [];
  private storage: Storage | null = null;

  constructor(
    private _storage: Storage,
    private toastCtrl: ToastController
  ) {
    this.init();
  }

  async init() {
    // eslint-disable-next-line no-underscore-dangle
    this.storage = await this._storage.create();
    await this.cargarFavoritos();
  }

  guardarNoticia(noticia: Article) {
    const existe = this.noticias.find(noti => noti.title === noticia.title);

    if (!existe) {
      this.noticias.unshift(noticia);
      this.storage.set('favoritos', this.noticias).then(resp => {
        console.log(resp);
        this.presentToast('Agregado en favoritos');
      });
    }
  }

  async cargarFavoritos() {
    const favoritos = await this.storage.get('favoritos');

    if (favoritos) {
      this.noticias = favoritos;
    }
  }

  async borrarNoticia(noticia: Article) {
    this.noticias = this.noticias.filter( noti => noti.title !== noticia.title);
    this.storage.set('favoritos', this.noticias)
            .then( _ => this.presentToast('Borrada de favoritos'));
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 1500
    });
    toast.present();
  }
}
