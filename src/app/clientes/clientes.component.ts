import { Component, OnInit } from '@angular/core'
import { Cliente } from './cliente'
import { ClienteService } from './cliente.service'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import swal from 'sweetalert2'
import * as io from 'socket.io-client'
declare var $: any;


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  public formulario: FormGroup
  public clienteTemp: Cliente = new Cliente()
  public titulo: string
  public btn: string
  public alert: string
  public clientes: Cliente[]
  public clientesb: Cliente[]
  public lastId: number
  private socket

  private toast = swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
  });

  constructor(private fb: FormBuilder, private clienteService: ClienteService) {
    this.socket = io()
  }

  ngOnInit(): void {
    $('#cuModal').on('shown.bs.modal', function () {
      $('#input').focus();
    })
    this.getClientesB('$')
    this.getClientes(0)
    this.createForm()
  }

  public getClientesB(nom: string): void {
    if (nom.length == 0)
      nom = '$'
    this.clienteService.getClientesB(nom).subscribe(
      (clientesb) => { this.clientesb = clientesb }
    )
  }

  public getClientes(ind: number): void {
    this.clienteService.getClientes().subscribe(
      (clientes) => {
        this.clientes = clientes
        if (ind == 0)
          this.lastId = -1
        else if (ind == 1)
          //Ultimo id generado
          this.lastId = this.clientes[this.clientes.length - 1].id
        else if (ind == 2)
          //Ultimo id actualizado
          this.lastId = this.clienteTemp.id
      }
    )
  }

  public create(): void {
    $('#cuModal').modal('hide');
    this.clienteTemp.nombre = this.capitalizeFirstLetter(this.formulario.get('nombre').value)
    this.clienteTemp.apellido = this.capitalizeFirstLetter(this.formulario.get('apellido').value)
    this.clienteTemp.email = this.formulario.get('email').value
    console.log(this.clienteTemp.id)
    if (this.clienteTemp.id) {
      this.clienteService.update(this.clienteTemp.id, this.clienteTemp).subscribe(
        () => {
          this.getClientes(2)
          this.toast.fire({
            type: 'success',
            title: `${this.alert}`
          })
          //swal.fire('Nuevo cliente', `Cliente ${this.clienteTemp.nombre} creado con éxito!`, 'success')
        }
      )
    } else {
      this.clienteService.create(this.clienteTemp).subscribe(
        () => {
          this.getClientes(1)
          this.toast.fire({
            type: 'success',
            title: `${this.alert}`
          })
        }, (error) => {
          this.toast.fire({
            type: 'error',
            title: "El email " + this.clienteTemp.email + " ya se encuentra registrado"
          })
        }
      )
    }

  }

  public createForm() {
    this.formulario = this.fb.group({
      nombre: [this.clienteTemp.nombre, Validators.required],
      apellido: [this.clienteTemp.apellido, Validators.required],
      email: [this.clienteTemp.email, Validators.compose([Validators.required, Validators.email])]
    });
  }

  public capitalizeFirstLetter(string) {
    return string.split(' ')
      .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
      .join(' ')
  }

  public setTitle(num: number) {
    if (num == 0) {
      this.clienteTemp = new Cliente()
      this.formulario.reset()
      this.titulo = "Nuevo cliente 👨🏻‍💼"
      this.btn = "Agregar cliente"
      this.alert = "Agregado con éxito"
    }
    else {
      //console.log(num)
      this.cargarCliente(num)
      this.titulo = "Editar cliente 👨🏻‍💼"
      this.btn = "Editar cliente"
      this.alert = "Editado con éxito"
    }
  }

  public cargarCliente(id: number): void {
    this.clienteService.getCliente(id).subscribe(
      (cliente) => {
        //console.log(cliente)
        this.clienteTemp = cliente
        //console.log(this.clienteTemp)
        this.formulario.patchValue(this.clienteTemp)
      }
    )
  }

  public eliminarCliente(id: number): void {
    this.clienteService.delete(id).subscribe(
      () => {
        this.getClientes(0)
        this.toast.fire({
          type: 'success',
          title: `Eliminado con éxito`
        })
      }
    )
  }

}
