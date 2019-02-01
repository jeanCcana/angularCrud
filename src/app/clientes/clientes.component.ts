import { Component } from '@angular/core';
import { Cliente } from './cliente';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'
})
export class ClientesComponent {

  clientes: Cliente[] = [
    { id: 1, nombre: 'Carlos', apellido: 'Perez', email: 'cperez@outlook.com', createAt: '2017-12-11' },
    { id: 2, nombre: 'Cesar', apellido: 'Perez', email: 'cperez@outlook.com', createAt: '2017-12-11' },
    { id: 3, nombre: 'Christian', apellido: 'Perez', email: 'cperez@outlook.com', createAt: '2017-12-11' },
    { id: 4, nombre: 'Carla', apellido: 'Perez', email: 'cperez@outlook.com', createAt: '2017-12-11' },
    { id: 5, nombre: 'Carolina', apellido: 'Perez', email: 'cperez@outlook.com', createAt: '2017-12-11' }
  ];

}
