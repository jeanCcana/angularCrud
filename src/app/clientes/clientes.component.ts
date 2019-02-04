import { Component, OnInit } from '@angular/core'
import { Cliente } from './cliente'
import { ClienteService } from './cliente.service'
import { Router } from '@angular/router'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import swal from 'sweetalert2'


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  private formulario: FormGroup;
  private clienteTemp: Cliente = new Cliente()
  private titulo: string
  private clientes: Cliente[]

  constructor(private fb: FormBuilder, private clienteService: ClienteService) { }

  ngOnInit(): void {
    this.getClientes()
    this.createForm()
  }

  public getClientes(): void {
    this.clienteService.getClientes().subscribe(
      (clientes) => { this.clientes = clientes }
    )
  }

  public create(): void {
    this.clienteTemp.nombre = this.capitalizeFirstLetter(this.formulario.get('nombre').value)
    this.clienteTemp.apellido = this.capitalizeFirstLetter(this.formulario.get('apellido').value)
    this.clienteTemp.email = this.formulario.get('email').value
    this.clienteService.create(this.clienteTemp).subscribe(
      (response) => {
        this.getClientes()
        swal.fire('Nuevo cliente', `Cliente ${this.clienteTemp.nombre} creado con éxito!`, 'success')
      }
    )
  }

  public createForm() {
    this.formulario = this.fb.group({
      nombre: [null, Validators.required],
      apellido: [null, Validators.required],
      email: [null, Validators.compose([Validators.required, Validators.email])]
    });
  }

  public capitalizeFirstLetter(string) {
    return string.split(' ')
      .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
      .join(' ')
  }

  public setTitle(num) {
    if (num == null) {
      this.clienteTemp = new Cliente()
      this.titulo = "Nuevo cliente 👨🏻‍💼"
    }
    else {
      console.log(num)
      this.cargarCliente(num)
      this.titulo = "Editar cliente 👨🏻‍💼"
    }
  }

  public cargarCliente(id): void {
    this.clienteService.getCliente(id).subscribe(
      (cliente) => {
        console.log(cliente)
        this.clienteTemp = cliente
      }
    )
  }

}
