import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'registro',
    loadChildren: () =>
      import('./pages/registro/registro.module').then((m) => m.RegistroModule),
  },
  {
    path: 'recovery',
    loadChildren: () =>
      import('./pages/recovery/recovery.module').then((m) => m.RecoveryModule),
  },
  {
    path: 'personalizado',
    loadChildren: () =>
      import('./pages/trab_personalizado/trab_personalizado.module').then((m) => m.PersonalizadoModule),
  },
  {
    path: 'accesorios',
    loadChildren: () =>
      import('./pages/accesorios/accesorios.module').then((m) => m.AccesoriosModule),
  },
  {
    path: 'inflables',
    loadChildren: () =>
      import('./pages/inflables/inflables.module').then((m) => m.InflablesModule),
  },
  {
    path: 'salones',
    loadChildren: () =>
      import('./pages/salones/salones.module').then((m) => m.SalonesModule),
  },
  {
    path: 'sonido',
    loadChildren: () =>
      import('./pages/sonido/sonido.module').then((m) => m.SonidoModule),
  },
  {
    path: 'piñatas',
    loadChildren: () =>
      import('./pages/piñatas/piñatas.module').then((m) => m.PiñatasModule),
  },
  {
    path: 'coctelería',
    loadChildren: () =>
      import('./pages/coctelería/coctelería.module').then((m) => m.CocteleríaModule),
  },
  {
    path: 'apartar/:id',
    loadChildren: () =>
      import('./pages/apartar/apartar.module').then((m) => m.ApartarModule),
  },
  {
    path: 'apartar',
    loadChildren: () =>
      import('./pages/apartar/apartar.module').then((m) => m.ApartarModule),
  },
  {
    path: 'detalles',
    loadChildren: () =>
      import('./pages/detalles/detalles.module').then((m) => m.DetallesModule),
  },
  {
    path: 'carrito-prod',
    loadChildren: () =>
      import('./pages/carrito-productos/carrito.module').then((m) => m.CarritoModule),
  },
  {
    path: 'carrito-serv',
    loadChildren: () =>
      import('./pages/carrito-servicios/carrito.module').then((m) => m.CarritoModule),
  },

  {
    path: 'productos',
    loadChildren: () =>
      import('./pages/producto/producto.module').then((m) => m.ProductoModule),
  },

  
  {
    path: 'comprobante/:id',
    loadChildren: () =>
      import('./pages/pdf/pdf.module').then((m) => m.PdfModule),
  },

  
  {
    path: 'datos-personales',
    loadChildren: () =>
      import('./pages/datos/datos.module').then((m) => m.DatosModule),
  },

  {
    path: 'metodos-envios',
    loadChildren: () =>
      import('./pages/envio/envio.module').then((m) => m.EnvioModule),
  },

  {
  path: 'resumen-pago/:tipo',
    loadChildren: () =>
      import('./pages/resumen-pago/resumen-pago.module').then((m) => m.ResumenPagoModule),
  },

  {
  path: 'cancel',
      loadChildren: () =>
        import('./pages/cancel/cancel.module').then((m) => m.CancelModule),
  },

  {
    path: 'success',
        loadChildren: () =>
          import('./pages/success/success.module').then((m) => m.SuccessModule),
    },



  
  
 



  //PONER TODAS LAS RUTAS ARRIBA
  { path: '**', pathMatch: 'full', redirectTo: 'home' },
];

const options: ExtraOptions = {
  onSameUrlNavigation: 'reload',
  scrollPositionRestoration: 'enabled',
  anchorScrolling: 'enabled'
}

@NgModule({
  imports: [RouterModule.forRoot(routes,  options)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
