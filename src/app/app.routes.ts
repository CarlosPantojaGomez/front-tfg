import {RouterModule, Routes} from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { ProductosComponent } from './components/productos/productos.component';
import { ProductoComponent } from './components/productos/producto.component';
import { RegistrarseComponent} from './components/registrarse/registrarse.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { LoginComponent } from './components/login/login.component';
import { ChatComponent } from './components/chat/chat.component';
import { HomeUsuarioComponent } from './components/home-usuario/home-usuario.component';
import { NoticiaComponent } from './components/noticia/noticia.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AdminComponent } from './components/admin/admin.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { BasketComponent } from './components/basket/basket.component';

const APP_ROUTES: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'home/:id', component: HomeUsuarioComponent},
    {path: 'productos', component: ProductosComponent},
    {path: 'producto/:id', component: ProductoComponent},
    {path: 'noticia/:id', component: NoticiaComponent},
    {path: 'registrarse/:id', component: RegistrarseComponent},
    {path: 'usuarios', component: UsuariosComponent},
    {path: 'login', component: LoginComponent},
    {path: 'cesta', component: BasketComponent},
    {path: 'chat', component: ChatComponent},
    {path: 'perfil/:id', component: ProfileComponent},
    {path: 'admin', component: AdminComponent},
    {path: 'employee', component: EmployeeComponent},
    {path: '**', pathMatch: 'full', redirectTo: 'home'}

];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);