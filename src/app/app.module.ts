import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DirectivaComponent } from './directiva/directiva.component';
import { ClientesComponent } from './clientes/clientes.component';
import { ClienteService } from './clientes/cliente.service';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


const routes: Routes = [
   { path: '', redirectTo: '/clientes', pathMatch: 'full' },
   { path: 'clientes', component: ClientesComponent },
   { path: 'directivas', component: DirectivaComponent }

]

@NgModule({
   declarations: [
      AppComponent,
      HeaderComponent,
      FooterComponent,
      DirectivaComponent,
      ClientesComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
      RouterModule.forRoot(routes)
   ],
   providers: [ClienteService],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
