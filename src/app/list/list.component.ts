import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { DatiService } from '../services/dati.service';
import { Libro } from '../libro';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  displayedColumns: string[] = ['demo-position', 'demo-name', 'demo-weight', 'demo-symbol', 'demo-upd', 'demo-canc'];

  libri$: Observable<Libro[]>= new Observable<Libro[]>();
  isAdd: boolean = false;
  libro?: Libro = new Libro();

  constructor(public datiService: DatiService) {
    this.libri$ = this.datiService.getAll()
  }

  add() {
    this.isAdd = !this.isAdd;
  }

  canc(id: number) {
    this.datiService.canc(id).subscribe(res => {

      console.log(res);
      this.libri$ = this.datiService.getAll()

    });
    // console.log("ho cancellato il libro")
  }

  update(libro: Libro) {
    this.libro = libro;
    this.add();
  }

  onFatto(fatto: boolean) {
    this.add();
    this.libro = new Libro();
    if (fatto)
      this.libri$ = this.datiService.getAll()
  }
}
