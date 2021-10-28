import { Component, OnInit } from '@angular/core';
import { AlertsService } from '../../services/extras/alerts/alerts.service';
import { StripeService } from '../../services/stripe/stripe.service';
import { CarritoProductoService } from '../../services/carrito-producto/carrito-producto.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DireccionesService } from 'src/app/services/direcciones/direcciones.service';
import { VentasService } from 'src/app/services/ventas/ventas.service';
import { RentaServiciosService } from '../../services/renta_servicios/renta-servicios.service';
import { CarordenService } from '../../services/carorden/carorden.service';
import { CarritoServiciosService } from '../../services/carrito-servcios/carrito-servicios.service';
import { ServiciosService } from '../../services/servicios/servicios.service';
import { ProductosService } from 'src/app/services/productos/productos.service';

import {
  loadStripe,
  Stripe,
  StripeCardElement,
  StripeElement,
  StripeElements,
} from '@stripe/stripe-js';

@Component({
  selector: 'app-resumen-pago',
  templateUrl: './resumen-pago.component.html',
  styleUrls: ['./resumen-pago.component.css']
})
export class ResumenPagoComponent implements OnInit {
  
  tipo!: string;
stripe_key!: string;
admin_id!: number;
nombrepaqueteria: string;
// url_licencia: string = `${URL_IMGS}licencias/`;
// url_membresia: string = `${URL_IMGS}membresias/`;
// licencia!: Licencia;
// pagos_licencia!: Pagos_licencia;
// membresia!: Membresia;
// compra!: Compra;
// detalle!: Detalle;
urlimg = 'https://servifiestas.com.mx/punto_venta/assets/images/logo-servifiestas.png"';


stripe: any;
elements!: StripeElements;
card!: StripeElement;
clientSecret!: any;
tipe: any;
style = {
  base: {
    color: '#32325d',
    fontFamily: 'Arial, sans-serif',
    fontSmoothing: 'antialiased',
    fontSize: '16px',
    '::placeholder': {
      color: '#32325d',
    },
  },
  invalid: {
    fontFamily: 'Arial, sans-serif',
    color: '#fa755a',
    iconColor: '#fa755a',
  },
};



  constructor(
    private alertService:AlertsService,
    private  stripeService: StripeService,
    private carritoService: CarritoProductoService, 
    private router: Router,
    private rutaActiva: ActivatedRoute,
    private ventasService: VentasService,
    private direccionesService: DireccionesService,
    private serviciosService: ServiciosService,
    private rentaService:  RentaServiciosService,
    private  carordenService:  CarordenService,
    private carritoServiceServicios: CarritoServiciosService,
    private productoService: ProductosService

    ) { }

  ngOnInit(): void {
    

    
    this.tipe= this.rutaActiva.snapshot.params.tipo;
    console.log(this.tipe);
    if( this.tipe == 'productos'){
      this.datauser();
      this.datopago();
      this.getcarr();
    }else{
        this.get();
    }
    this.stripeInitialize();
  }

  
  datauser(){
     const lista = this.getDatauser();
     console.log(lista);
  }
  
 total: number;
 subtotal: number;
 constoenvio: number;
  datopago(){
    const datopago = this.getdatepago();
    this.subtotal = datopago.totalpagar;
    this.total = datopago.subtotal;
    this.constoenvio = datopago.preciopaqueteria;
    this.nombrepaqueteria = datopago.nombrepaquete;
    console.log(datopago);
  }
  
   
  getDatauser(): any[] {
    return JSON.parse(localStorage.getItem('data_user'));
  }



  getdatepago(){
    return JSON.parse(localStorage.getItem('dato_pago'));
  }

   listacar: any [] = [];
   totalproducto: number = 0;
  getcarr(){
  const cart = JSON.parse(localStorage.getItem('cartproductos'));
  // console.log(cart);
  this.listacar = cart;
  console.log(this.listacar);
  console.log(this.listacar.length);
  this.totalproducto = this.listacar.length;
  }

  stripeInitialize = async () =>{
    this.stripe_key = 'pk_test_51JforyGm74XpSQdW9wiW7P0WrM5W1BMO7fq5URdhyUG7CWrU6oefiXxQI8FgLUG7dtIMi8fizBPT9MN4ongY0LhL00ucjWFRcy';
    this.stripe = await loadStripe(this.stripe_key);
    this.stripeService.create({}).subscribe((res: any)=>{
      console.log(res);
    // this.clientSecret = res.output.clientSecret;
    // console.log('Cliente secreto', this.clientSecret)
    });
  };

  makePayment(){
    console.log(this.tipe);

    if(this.tipe == 'productos'){
        this.pagoProductos();
    }else{
      this.pagarservicios();
    }
     
  }
  
  pago: any = {};
  idventa: number;
  async pagoProductos(){
    const obj =  this.PreparaDatosVenta();
    const dir = this.preparaDireccion();
    let idcliente = localStorage.getItem('id');

    this.ventasService.post(obj).subscribe((data: any)=>{
      console.log(data)
       this.idventa = data.id;
       
        this.stock();
       localStorage.setItem('idventa',data.id);
       console.log(data.id);
      const newdir = {
       calle: dir.calle,
       num_int:dir.num_int ,
       colonia: dir.colonia,
       entre_calle: dir.entre_calle,
       cp:dir.cp ,
       estado:dir.estado ,
       ciudad: dir.ciudad,
       id_cliente: idcliente,
       id_venta: data.id
 
      }
 
      this.direccionesService.post(newdir).subscribe((data: any)=>{
        console.log(data);
      },((err: any)=>{
        console.log(err);
      })
      );   
 
 
 
    }, ((err: any)=>{
        console.log(err);
    })
    )

    console.log(this.idventa);
    console.log('Costo envio', this.constoenvio);
    console.log('Total',  this.total);
      let idventas = localStorage.getItem('idventa');
    this.stripeService.createSessionSuscripcion({
      name: 'Productos',
      type:'Productos',
      ammount: Number(this.total) + Number(this.constoenvio) ,
      object_id: idventas,
      admin_id: 1,
      object: idventas,
      image: this.urlimg
    }).subscribe(async (res: any)=>{
      console.log(res);
      this.pago.stripe_id = res.checkout_session.id;
         


      this.stripe
      .redirectToCheckout({sessionId: res.checkout_session.id}).then((result: any)=>{
        if(result.error) {
          alert(result.error);
        }
      }).catch((error: any)=>{
        console.log('Error', error);
      })

    })

  }
  cancelar(){
     this.carritoService.deletCarproduct();
     this.router.navigate(['/home']);
  }

 
  PreparaDatosVenta(){

    let fecha = this.preparafecha();
    let refer = this.generarcodigo(20);
    let idliente= localStorage.getItem('id');
        const obj = {
            refer: refer ,
            fecha: fecha,
            empleado: 'Administrador',
            total: Number(this.subtotal) + Number (this.constoenvio),
            sucursal: 'web',
            status: 'Pendiente',
            cliente: 'Pablo',
            pago_inicial:  Number(this.subtotal ) + Number (this.constoenvio),
            forma_pago: 'Stripe',
            paqueteria:  this.nombrepaqueteria,
            costo_flete:Number (this.constoenvio) ,
            voucher: 'N/A',
            id_cliente: Number(idliente),
            estado:'Pendiente'
  
        }
        console.log(obj);
        return obj;
   }

   preparaDireccion(){

   const dir = JSON.parse(localStorage.getItem('data_user'));
    const obj = {
      calle: dir.calle,
      num_int: dir.num_int,
      colonia: dir.colonia,
      entre_calle: dir.entre_calles,
      cp: dir.cp,
      estado: dir.estado,
      ciudad: dir.ciudad,
    }
     
    return obj;
  }
  preparafecha(){
    var fechahoy;
    var hoy = new Date();
    var fecha = hoy.getDate() + '-' + (hoy.getMonth() +1) + '-' + hoy.getFullYear();
    var hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
    var fechaHora = fecha + ' ' + hora;
    console.log(fechaHora);
    fechahoy = fechaHora; 
    return fecha;
  }
  generarcodigo(length: number): string {
   let result = '';
   let characters =
     'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   let charactersLength = characters.length;
   for (var i = 0; i < length; i++) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
   } 
    console.log(result);
 
 
    return result;
 }

 listaProductosVendidos: any [] = [];
 preparaProudctosVendidos (){
  var precioxproducto = 0;
  const lista =  this.carritoService.getcarproductos();
  for(let item of lista){
    precioxproducto = (Number(item.precio_unitario) * (item.cuantos));
    const obj = {
      producto_id: item.id,
      piezas: item.cuanty, 
     }
     this.listaProductosVendidos.push(obj);
  }
  return  this.listaProductosVendidos;
}
  
 stock(){
  console.log('entra en stock');
    const obj = JSON.parse(localStorage.getItem('cartproductos'))
    console.log('productos', obj);

    for( let item of obj){
            this.productoService.stock(item.id, item.cuanty).subscribe((data: any)=>{
              console.log(data);
            }) 
    }

} 



  pagarservicios(){

    const objForm = JSON.parse(localStorage.getItem('data_user_service'));
    const objDato  = this.preparaDatos();
     
     const obj = {
      refer: objDato.refer,
      fecha: objDato.fecha,
      fecha_evento: objForm.fecha_evento,
      empleado:objDato.empleado,
      total: this.subtotal,
      sucursal:  objDato.sucursal,
      status: objDato.status,
      cliente: objForm.cliente,
      pago_inicial: 0,
      estado: objDato.estado,
      forma_pago:  objDato.forma_pago,
      google_maps: objForm.google_maps,
      lugar_evento: objForm.lugar_evento,
       hora_evento: objForm.hora_evento,
       zona_evento:objForm.zona_evento,
      voucher: 'N/A',
      // total: this.subtotal
     }
     console.log();
  
     console.log('Formulario completo');
     this.rentaService.post(obj).subscribe((data: any)=>{
       console.log(data);
      //  this.closemodal();
       this.carOrdenService(obj , data.id); 
      //  this.router.navigate(['/comprobante', data.id]);
      localStorage.setItem('idrenta',data.id);  
     },((err: any)=>{
       console.log(err);
     }) 
     )
    
     let idrenta = localStorage.getItem('idrenta');
    this.stripeService.createSessionSuscripcion({
      name: 'Servicios',
      type:'Servicios',
      ammount:   this.subtotal,
      object_id:idrenta,
      admin_id: idrenta,
      object: idrenta,
      image: this.urlimg
    }).subscribe(async (res: any)=>{
      console.log(res);
      this.pago.stripe_id = res.checkout_session.id;
         
      this.stripe
      .redirectToCheckout({sessionId: res.checkout_session.id}).then((result: any)=>{
        if(result.error) {
          alert(result.error);
        }
      }).catch((error: any)=>{
        console.log('Error', error);
      })

    })

  }
  

// metodo de servicios

 servicios: any [] = [];
  get(){
    const lista =  JSON.parse(localStorage.getItem('cartservice'));
      
    // console.log('lista de servicio',lista);
    if(lista == null){
       var mensaje = 'No existen productos registrados';
       var titulo = 'Carrito';
      //  this.alerservice.warnig(mensaje, titulo);  
    }else {
    this.servicios = lista;
    this.constoenvio = 0;
    this.totalproducto = this.servicios.length;
    console.log('lista carrito', this.servicios);
    this.setTotal();  
    }
  }

  setTotal(){ 
    var subtotal = 0;
    var total = 0;
    // var subtotal =0;
    var preciomayorista = 0;
    var precio_unidad = 0;
  for (let item of this.servicios) {
     if(item.cuanty >= 10 ) {
             console.log('precio mayorista');
             preciomayorista  = preciomayorista + (Number(item.cuanty)*Number(item.precio_mayorista));
             console.log('Precio mayorista', item.precio_mayorista);
             console.log('total mayorista', preciomayorista);
  
     }else{
      precio_unidad  = precio_unidad + Number(item.cuanty)*Number(item.precio_venta);  
      console.log('precio', precio_unidad  );
     }
  } 
  //  console.log('precio final',  precio_unidad + preciomayorista );
  var cantidad_pagar = 0;
  cantidad_pagar = precio_unidad + preciomayorista ;
  this.subtotal =  Math.round(cantidad_pagar);
  console.log('Precio Final', this.subtotal);
  }




  carOrdenService(obj, id){
    
    console.log(obj, id);


    for(let item of this.servicios  ){

      const objOrden = {
        id_renta: id,
        nombre: item.servicio, 
        id_servicio: item.id,
        cantidad: item.cuanty,
        precio_unitario:item.precio_venta,
        identificador: item.codigo,
        tipo:'cart', 
        metodo: 0,
        c_e: 0,
        promocion: 'no', 

    }   

    this.carordenService.post(objOrden).subscribe((data: any)=>{
      console.log(data);
    }, ((err: any)=>{
       console.log(err);
    })
    ) 

    }
    
      
   
}

preparaDatos(){
  let referencia = this.generarcodigo(20); 
  var fecha  = this.preparafecha(); 
  var feccha:string = fecha;
  const obj = {
             refer: referencia,
             fecha:feccha, 
             empleado: 'Empleado',
             total: this.subtotal,
             sucursal: 'Sucursal',
             status: 'Pendiente', 
             estado: 'Pnediente',
             forma_pago: 'Efectivo',                 
  }    
  
  return obj;

}



insert(){    
  const objForm = JSON.parse(localStorage.getItem('data_user_service'));;
  const objDato  = this.preparaDatos();
   
   const obj = {
    refer: objDato.refer,
    fecha: objDato.fecha,
    fecha_evento: objForm.fecha_evento,
    empleado:objDato.empleado,
    total: this.subtotal,
    sucursal:  objDato.sucursal,
    status: objDato.status,
    cliente: objForm.cliente,
    pago_inicial: 0,
    estado: objDato.estado,
    forma_pago:  objDato.forma_pago,
    google_maps: objForm.google_maps,
    lugar_evento: objForm.lugar_evento,
     hora_evento: objForm.hora_evento,
     zona_evento:objForm.zona_evento,
    voucher: 'N/A',
    // total: this.subtotal
   }
   console.log();

   console.log('Formulario completo');
   this.rentaService.post(obj).subscribe((data: any)=>{
     console.log(data);
    //  this.closemodal();
     this.carOrdenService(obj , data.id); 
     this.router.navigate(['/comprobante', data.id]);

   },((err: any)=>{
     console.log(err);
   }) 
   )
   
   
}

salir(){
   this.router.navigate(['/home']);
}




}
