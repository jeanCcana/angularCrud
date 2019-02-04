import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import {Router} from '@angular/router';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  private clienteTemp:Cliente=new Cliente();
  private titulo:string="Nuevo cliente 👨🏻‍💼"

  //clientes: Cliente[];
  clientes: Cliente[]

  constructor(private clienteService: ClienteService, private router: Router) { }

  ngOnInit(): void {
    this.getClientes()
  }

  
  public getClientes(): void{
    this.clienteService.getClientes().subscribe(
      (clientes) => { this.clientes = clientes }
    )
  }
  

  public create(): void{
    console.log(this.clienteTemp)
    this.clienteService.create(this.clienteTemp).subscribe(
      (response) =>this.getClientes()
    )
  }

}
