import { Component, OnInit } from '@angular/core'
import { Cliente } from './cliente'
import { ClienteService } from './cliente.service'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import swal from 'sweetalert2'
declare var $: any;


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  private formulario: FormGroup
  public clienteTemp: Cliente = new Cliente()
  private titulo: string
  private btn: string
  private alert: string
  private clientes: Cliente[]
  private clientesb: Cliente[]

  private toast = swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
  });

  constructor(private fb: FormBuilder, private clienteService: ClienteService) { }

  ngOnInit(): void {
    $('#cuModal').on('shown.bs.modal', function () {
      $('#input').focus();
    })
    this.getClientesB('$')
    this.getClientes()
    this.createForm()
  }

  public getClientesB(nom: string): void {
    if (nom.length == 0)
      nom = '$'
    this.clienteService.getClientesB(nom).subscribe(
      (clientesb) => { this.clientesb = clientesb }
    )
  }

  public getClientes(): void {
    this.clienteService.getClientes().subscribe(
      (clientes) => { this.clientes = clientes }
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
          this.getClientes()
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
          this.getClientes()
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
    if (num == null) {
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
        this.getClientes()
        this.toast.fire({
          type: 'success',
          title: `Eliminado con éxito`
        })
      }
    )
  }

}
