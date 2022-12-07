import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { SETTINGS} from '@angular/fire/firestore';
import { HttpClientModule } from "@angular/common/http";

//rutas
import {APP_ROUTING} from './app.routes';

//servicios
import {UsuariosService} from './services/usuarios.service';
import {ProductosService} from './services/productos.service';
import {ChatService} from './services/chat.service';
import {AuthenticationService} from './services/authentication.service';
import {NoticiasService} from './services/noticias.service';
import {EventManagerService} from './services/eventManager.service';
import {BillService} from './services/bill.service';
import {CountryService} from './services/country.service';
import {MailService} from './services/mail.service';
import {ProjectService} from './services/project.service';
//pipes
import { KeysPipe } from './pipes/keys.pipe';

///////////////////

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { ProductosComponent } from './components/productos/productos.component';
import { FooterComponent } from './components/footer/footer.component';
import { TarjetasComponent } from './components/tarjetas/tarjetas.component';
import { TarjetaComponent } from './components/tarjetas/tarjeta.component';
import { RegistrarseComponent } from './components/registrarse/registrarse.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { UsuarioComponent } from './components/usuarios/usuario.component';
import { ProductoComponent } from './components/productos/producto.component';
import { LoginComponent } from './components/login/login.component';
import { ChatComponent } from './components/chat/chat.component';
import { HomeUsuarioComponent } from './components/home-usuario/home-usuario.component';
import { NoticiaComponent } from './components/noticia/noticia.component';
import { FeaturesComponent } from './components/features/features.component';
import { ManualsComponent } from './components/manuals/manuals.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SeguridadComponent }from './components/profile/seguridad.component';
import { DatosComponent }from './components/profile/datos.component';
import { CompradosComponent }from './components/profile/comprados.component';
import { ContactoComponent }from './components/profile/contacto.component';
import { AdminComponent } from './components/admin/admin.component';
import { AdminUsersComponent } from './components/admin/adminUsers.component';
import { AdminProductsComponent } from './components/admin/adminProducts.component';
import { ModalComponent } from './components/modal/modal.component';
import { UsersTableComponent } from './components/admin/usersTable.component';
import { NewUserComponent } from './components/admin/newUser.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { NewProductComponent } from './components/admin/new-product.component';
import { DownloadComponent } from './components/download/download.component';
import { AdminProjectsComponent } from './components/admin/admin-projects/admin-projects.component';
import { AdminTasksComponent } from './components/admin/admin-tasks/admin-tasks.component';
import { NewProjectComponent } from './components/admin/admin-projects/new-project.component';
import { NewTaskComponent } from './components/admin/admin-tasks/new-task/new-task.component';
import { AdminNoticiasComponent } from './components/admin/admin-noticias/admin-noticias.component';
import { NewNoticiaComponent } from './components/admin/admin-noticias/new-noticia/new-noticia.component';
import { AdminMainComponent } from './components/admin/admin-main/admin-main.component';
import { AdminMensajesComponent } from './components/admin/admin-mensajes/admin-mensajes.component';
import { NewMensajeComponent } from './components/admin/admin-mensajes/new-mensaje/new-mensaje.component';
import { DetailsProjectComponent } from './components/admin/admin-projects/details-project/details-project.component';
import { DetailsTaskComponent } from './components/admin/admin-tasks/details-task/details-task.component';
import { ProfilePictureComponent } from './components/profile/profile-picture/profile-picture.component';
import { OrderByPipe } from './helpers/orderByPipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    CarouselComponent,
    ProductosComponent,
    FooterComponent,
    TarjetasComponent,
    TarjetaComponent,
    RegistrarseComponent,
    UsuariosComponent,
    UsuarioComponent,
    ProductoComponent,
    KeysPipe,
    LoginComponent,
    ChatComponent,
    HomeUsuarioComponent,
    NoticiaComponent,
    FeaturesComponent,
    ManualsComponent,
    ProfileComponent,
    SeguridadComponent,
    DatosComponent,
    CompradosComponent,
    ContactoComponent,
    AdminComponent,
    AdminUsersComponent,
    AdminProductsComponent,
    ModalComponent,
    UsersTableComponent,
    NewUserComponent,
    EmployeeComponent,
    NewProductComponent,
    DownloadComponent,
    AdminProjectsComponent,
    AdminTasksComponent,
    NewProjectComponent,
    NewTaskComponent,
    AdminNoticiasComponent,
    NewNoticiaComponent,
    AdminMainComponent,
    AdminMensajesComponent,
    NewMensajeComponent,
    DetailsProjectComponent,
    DetailsTaskComponent,
    ProfilePictureComponent,
    OrderByPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    APP_ROUTING,
    BrowserAnimationsModule
  ],
  providers: [{ provide: SETTINGS, useValue: {} },
              UsuariosService,
              ProductosService,
              ChatService,
              AuthenticationService,
              NoticiasService,
              EventManagerService,
              BillService,
              CountryService,
              MailService,
              ProjectService],
  bootstrap: [AppComponent]
})
export class AppModule { }