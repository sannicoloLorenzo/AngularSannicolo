import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
// import { NumberValidatorsService } from 'app/NumberValidatorsService';


import { DatiService } from '../services/dati.service';
import { Libro } from '../libro';

const listMsg = {
  titolorequired: "Il titolo è richiesto.",
  titolominlength: "Il titolo deve deve avere almeno 4 caratteri",
  autorerequired: "Il campo autore è obbligatorio.",
  prezzoCopertinarequired: "Il prezzo di copertina deve essere inserito > 0.",
  prezzoCopertinamin: "Deve essere maggiore di 0",
  prezzoCopertinanan: "Il prezzo deve essere un valore >0"
};


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  @Input() libro: Libro = new Libro(); //this.iniLibro();
  @Output() fatto = new EventEmitter<boolean>();

  librofrm: FormGroup;

  constructor(public datiService: DatiService, public fb: FormBuilder) {
    this.librofrm = fb.group(new Libro());
  }

  // numberValidator: ValidatorFn = (c: AbstractControl): ValidationErrors | null => {
  //   if ((c.value) <= 0) {
  //     return { min: true };
  //   }
  //   return null;
  // };

  numberValidator(control: FormControl) {
    if (isNaN(control?.value))
      return {
        nan: true
      }
    if ((1 * control?.value) <= 0)
      return {
        min: true
      }
    return null;
  }
  ngOnInit(): void {
    console.log(this.libro)
    this.librofrm = this.fb.group({
      id: [this.libro.id],
      'titolo': new FormControl(this.libro.titolo, [Validators.required, Validators.minLength(4)]),
      'autore': new FormControl(this.libro.autore, [Validators.required]),
      //'prezzoCopertina': new FormControl(this.libro.prezzoCopertina, [NumberValidatorsService.min(0)]),
      'prezzoCopertina': new FormControl(this.libro.prezzoCopertina, [Validators.required,this.numberValidator])
    });
  }


  onSubmit(libro: Libro) {
    if (this.libro.id != 0)
      this.datiService.update(libro).subscribe(res => {
        this.fatto.emit(true);
      }
      )
    else this.datiService.add(libro).subscribe(res => {
      this.fatto.emit(true);
    })
  }

  annulla() {
    this.fatto.emit(false);
  }

  getErrorMessage_field(element: string) {
    let err = ""
    if (this.librofrm.get(element).errors) {
      Object.entries(this.librofrm.get(element).errors).forEach(
        ([errorName, errorValue]) => {

          console.log(element, errorValue, errorName)

          err = listMsg[element + errorName];
        }
      );
    };
    return err;
  }


  // getErrorMessage() {
  //   let err=""
  //   //console.log(this.librofrm.controls)
  //   Object.keys(this.librofrm.controls).forEach(element => {
  //    // console.log(this.librofrm.get(element).errors)
  //     if (this.librofrm.get(element).errors) {
  //       //if form control has an error and error is not null

  //       Object.entries(this.librofrm.get(element).errors).forEach(
  //         ([errorName, errorValue]) => {
  //             console.log(element,errorValue,errorName)
  //             err= element+" "+ errorName;
  //         }
  //       );
  //     };
  //   })

  // return err;

  // if (this.librofrm.controls.errors )
  // if (this.librofrm.controls['titolo'].hasError('required')) {
  //   return 'You must enter a value min';
  // }

  // return this.librofrm.controls['titolo'].hasError('required') ? 'Not a valid email' : '';
  // }

}
