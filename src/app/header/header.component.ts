import { Component, OnInit } from '@angular/core'
import { Cliente } from '../clientes/cliente'
import { HeaderService } from './header.service';
declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  appName = "Clientes"
  clientes: Cliente[]

  constructor(private headerService: HeaderService) { }

  ngOnInit() {
    this.getClientes(' ')
  }

  public getClientes(nom: string): void {
    if (nom.length == 0)
      nom = ' '
    this.headerService.getClientes(nom).subscribe(
      (clientes) => { this.clientes = clientes }
    )
  }

  public close() {
    $('.navbar-collapse').collapse('hide');
  }
}
