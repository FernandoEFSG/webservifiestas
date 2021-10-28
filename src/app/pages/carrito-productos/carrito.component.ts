import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CarritoProductoService } from '../../services/carrito-producto/carrito-producto.service';
import { AlertsService } from '../../services/extras/alerts/alerts.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { VentasService } from 'src/app/services/ventas/ventas.service';
import { StripeService } from '../../services/stripe/stripe.service';
import { DireccionesService } from 'src/app/services/direcciones/direcciones.service';
import { Router } from '@angular/router';
import {
  loadStripe,
  Stripe,
  // StripeCardElement,
  // StripeElement,
  // StripeElements,
  // StripePaymentRequestButtonElement,
  // PaymentRequest,
} from '@stripe/stripe-js'; 
declare var $;

declare var paypal: any;
@Component({
  selector: 'app-home',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  subtotal: number;
  isdisable: boolean = true;
  fragmento: any;
  fragmento1: any;
  isdisablepago: boolean = true;  
  tokenStripe: any;
  preciopaqueteria: any;
  nombrepaqueteria: any;

  accesorios:any = [
    { img: './assets/imgs/accesorios/globos-corazon.jpg',nombre:'Globos corazon', precio: '50.00', stock:'100', descripcion: 'Globo de corazon metálico' },
    { img: './assets/imgs/accesorios/globos-numeros.jpg',nombre:'Globos numeros asdasdsaddasdadas', precio: '90.50', stock:'500', descripcion: 'Globo de numeros para cumpleaños' },
    { img: './assets/imgs/accesorios/globos-metalicos.jpg',nombre:'Globos metalicos', precio: '35.50', stock:'1000', descripcion: 'Globos metalicos' },
    { img: './assets/imgs/accesorios/antifaz-dorado.jpg',nombre:'Antifaz dorado', precio: '35.00', stock:'1000', descripcion: 'Antifaz dorado con brillantina' },
    { img: './assets/imgs/accesorios/gorros-multicolor.jpg',nombre:'Gorros multicolor', precio: '235.00', stock:'1000', descripcion: 'Gorros para cumpleaños de varios colores' },
    /*{ img: './assets/imgs/accesorios/paquete-accesorios.jpg',nombre:'Paquete accesorios', precio: '35.00', stock:'1000', descripcion: 'Paquete para fiestas. i' },
    { img: './assets/imgs/accesorios/platos-pastel.jpg',nombre:'Platos pastel', precio: '35.50', stock:'1000', descripcion: 'Platos para pastel de varios colores' },
    { img: './assets/imgs/accesorios/venetian.jpg',nombre:'Mascaras', precio: '35.50', stock:'1000', descripcion: 'Mascaras venecianas' },
    */
  ]
  

 urlimg = 'https://servifiestas.com.mx/punto_venta/assets/images/products/';



  lista_shipment:any = [
    {proveedor:'Fedex',service:'estandar', precio:'280.00', duracion:'2 a 5 días hábiles', total:'2880.00'},
    {proveedor:'Estafeta',service:'estandar', precio:'220.00', duracion:'tiempo variado', total:'2820.00'},
    {proveedor:'Redpack',service:'express', precio:'200.00', duracion:'1 a 3 días hábile', total:'2800.00'},
    {proveedor:'Flecha Amarilla',service:'estandar', precio:'250.00', duracion:'2 a 4 días hábiles', total:'2800.00'},

  ]
  stripe_key: string = "pk_test_51JforyGm74XpSQdW9wiW7P0WrM5W1BMO7fq5URdhyUG7CWrU6oefiXxQI8FgLUG7dtIMi8fizBPT9MN4ongY0LhL00ucjWFRcy";

  stripe:any;

  checkout_session:string = "";


  listaprodutos: any [] = [];
  form!: FormGroup;
   @ViewChild('carInfo') carInfo: ElementRef;
   cardError: String;
   card: any;
   paymentHandler:any = null;
  

  constructor(
    private productoServiceCart: CarritoProductoService,
    private alertService: AlertsService,
    private ventasService: VentasService,
    private stripeService: StripeService,
    private direccionesService: DireccionesService,
    private router: Router,
  
  ) { }

  ngOnInit(): void {
    this.form = new  FormGroup({
      nombre: new FormControl(null, [Validators.required]),
      telefono: new FormControl(null, [Validators.required] ), 
      correo: new FormControl(null, [Validators.required]),
      calle: new FormControl(null, [Validators.required]),
      num_int: new FormControl(null, [Validators.required]),
      colonia: new FormControl(null, [Validators.required]),
      entre_calles: new FormControl(null, [Validators.required]),
      cp: new FormControl(null, [Validators.required]),
      estado: new FormControl(null, [Validators.required]),
      ciudad: new FormControl(null, [Validators.required]),

    })
    this.get();
    this.invokeStripe();
    // this.card = elements.create('card');
    // this.card.mount(this.carInfo.nativeElement);
    // this.card.addEventListener('change', this.onChange);
     this.datos();
  } 


  probar(){
    const token =  this.makePayment(89);
    console.log(token);
  }
 
   datos(){
       const obj = JSON.parse(localStorage.getItem("user"));
       console.log(obj);
       this.form.controls.nombre.setValue(obj.nombre);
       this.form.controls.telefono.setValue(obj.telefono);
       this.form.controls.correo.setValue(obj.correo);
   }
  



 async makePayment(amount) {

    const paymentHandler = await (<any>window).StripeCheckout.configure({
      key: 'pk_test_51JforyGm74XpSQdW9wiW7P0WrM5W1BMO7fq5URdhyUG7CWrU6oefiXxQI8FgLUG7dtIMi8fizBPT9MN4ongY0LhL00ucjWFRcy',
      locale: 'auto',

      token: function (stripeToken: any)  {
        console.log('Stripe token generated!', stripeToken);
         
    
        return  stripeToken;
        alert('Stripe token generated!'  );
       
      },
    });
    paymentHandler.open({
      name: 'Positronx',
      description: '3 widgets',
      amount: amount * 100
    });

   
  }

  invokeStripe() {
    if(!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement("script");
      script.id = "stripe-script";
      script.type = "text/javascript";
      script.src = "https://checkout.stripe.com/checkout.js";
      script.onload = () => {
        this.paymentHandler = (<any>window).StripeCheckout.configure({
      key: 'sk_test_51JforyGm74XpSQdWA4BUCQSK7AZbtCYsPYrPSVtvLXBnOiGyB4XYhdhEklD8gvEJ5uQIECsQLV1DUa6PTU8kAMim007RCn5efA',
       
          locale: 'auto',
          token: function (stripeToken: any) {
            console.log(stripeToken)
            alert('Payment has been successfull!');
          }
        });
      }
        
      window.document.body.appendChild(script);
    }
  }
  
  get(){
    const lista =  this.productoServiceCart.getcarproductos();
    if(lista == null){
       var mensaje = 'No existen productos registrados';
       var titulo = 'Carrito';
       this.alertService.warnig(mensaje, titulo);  
    }else {
    this.listaprodutos = lista;
    console.log('lista carrito', this.listaprodutos);
    this.setTotal();  
    }
    
  }
 
  delete(index: number){
    console.log(index);
    const lista = this.productoServiceCart.delectproductos(index);
    this.listaprodutos = lista;
    this.setTotal();
    console.log('delete',this.listaprodutos)
    if(this.listaprodutos.length == 0){
     this.router.navigate(['/home']);
     this.productoServiceCart.deletCarproduct();
       
    }
    console.log('lista carrito', this.listaprodutos);
    var mensaje = 'Producto eliminado del carrito';
    var titulo = 'Carrito';
    this.alertService.succes(mensaje, titulo);  
 }

  metodo_seleccionado(metodo: any, total: number, paqueteria: any) {
     console.log(paqueteria);
     this.preciopaqueteria = paqueteria.precio;
     this.nombrepaqueteria = paqueteria.proveedor;
     console.log( this.preciopaqueteria,  this.nombrepaqueteria);
    document
      .getElementById('metodo-' + metodo)
      ?.classList.add('bg-secondary', 'text-white');

    for (let index = 0; index < total; index++) {
      if (index == metodo) {
      } else {
        document
          .getElementById('metodo-' + index)
          ?.classList.remove('bg-secondary', 'text-white');
      }
    }
  }
  
  setTotal(){ 
    var subtotal = 0;
    var total = 0;
    // var subtotal =0;
    var preciomayorista = 0;
    var precio_unidad = 0;
for (let item of this.listaprodutos ) {
     if(item.cuanty >= 10 ) {
             console.log('precio mayorista');
             preciomayorista  = preciomayorista + (Number(item.cuanty)*Number(item.precio_mayorista));
             console.log('Precio mayorista', item.precio_mayorista);
             console.log('total mayorista', preciomayorista);

     }else{
      precio_unidad  = precio_unidad + Number(item.cuanty)*Number(item.precio_venta);  
     }
} 
//  console.log('precio final',  precio_unidad + preciomayorista );
var cantidad_pagar = 0;
cantidad_pagar = precio_unidad + preciomayorista ;
this.subtotal =  Math.round(cantidad_pagar);
console.log('Precio Final', this.subtotal);
}
  

  datosUser(){
     const obj =  this.form.value;
     console.log(obj);
      if(this.form.valid){
           this.fragmento = 'sec-env';    
           var mensaje = 'Datos guardados';
           var titulo = 'Datos'; 
        this.alertService.warnig(mensaje, titulo);     

      } else {
        this.fragmento = 'client-info';
        var mensaje = 'Falta Campos por llenar';
        var titulo = 'Datos'; 
        this.alertService.warnig(mensaje, titulo);     
           
      }
  }
  
  selectCantidad(id, event ){
     var cantidad: number = 0;
     cantidad = event.target.value;
     console.log(cantidad);
     console.log(id);
     this.productoServiceCart.masproducto(id,cantidad);
    this.get();
  }
  
  evaluarCarrito(){
    const lista =  this.productoServiceCart.getcarproductos();
    console.log(lista);
    var evauluar: boolean;
    for(let item of lista){
      console.log( item.cantidad, '<',  item.cuanty );
        if(   Number(item.cantidad) <= Number(item.cuanty)){
          evauluar = true;
        }else {
          evauluar = false;
        }
    }

    console.log(evauluar);
    if(evauluar == true){
           var mensaje = 'Un producto es menor a cero o no esta disponible';
           var titulo = 'Productos';
           this.alertService.warnig(mensaje, titulo); 
           this.fragmento1 = 'sec-car';
    }else{
          this.fragmento1 = 'client-info';
    }
    
  }
  
  listaProductosVendidos: any  [] = [];

  preparaProudctosVendidos (){
    var precioxproducto = 0;
    const lista =  this.productoServiceCart.getcarproductos();
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
      const obj = this.preparaProudctosVendidos();
      console.log('productos', obj);
  
      // for( let item of obj){
      //         this.productoService.stock(item.producto_id, item.piezas).subscribe((data: any)=>{
      //           console.log(data);
      //         }) 
      // }
  
} 

preparaDireccion(){
  const obj = {
    calle: this.form.controls.calle.value,
    num_int: this.form.controls.num_int.value,
    colonia: this.form.controls.colonia.value,
    entre_calle: this.form.controls.entre_calles.value,
    cp: this.form.controls.cp.value,
    estado: this.form.controls.estado.value,
    ciudad: this.form.controls.ciudad.value,
  }
   
  return obj;
}

 PreparaDatosVenta(){

  let fecha = this.preparafecha();
  let refer = this.generarcodigo(20);
  let idliente= localStorage.getItem('id');
      const obj = {
          refer: refer ,
          fecha: fecha,
          empleado: 'Administrador',
          total: Number(this.subtotal) + Number (this.preciopaqueteria),
          sucursal: 'web',
          status: 'Pendiente',
          cliente: this.form.controls.nombre.value,
          pago_inicial:  Number(this.subtotal ) + Number (this.preciopaqueteria),
          forma_pago: 'trasferencia',
          paqueteria:  this.nombrepaqueteria,
          costo_flete:Number (this.preciopaqueteria) ,
          voucher: 'N/A',
          id_cliente: Number(idliente),
          estado:'Pendiente'

      }
      console.log(obj);
      return obj;
 }

 insertventa(){
  const obj =  this.PreparaDatosVenta();
  const dir = this.preparaDireccion();
  let idcliente = localStorage.getItem('id');
   this.ventasService.post(obj).subscribe((data: any)=>{
     console.log(data)

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
 }
  async pago(id_venta, monto_paqueteria) {
    let data_pago = JSON.stringify({
      ammount:(8932 + 732),
      name: 'Venta de HCREW',
      image: 'https://dummyimage.com/600x400/000/fff.png&text=HCREW',
      id_venta: id_venta,
      total_productos: 2803
    });
    console.log("data: " + data_pago);
    // this.presentLoading('');

    this.ventasService.getidStriper(data_pago).subscribe(
      (data: any) => {
        // this.dismisLoading();

        console.log('RESPONSE: ' + JSON.stringify(data));

        if (data.mensaje === "exitoso") {
          // this.extras.presentToast('Registro completado', 'success');
          // this.navCtrl.navigateForward('/layout-user/main');
          this.checkout_session = data.checkout_session;

          this.stripe
            .redirectToCheckout({ sessionId: data.checkout_session.id })
            .then((result: any) => {
              console.log(result);

            })
            .catch((error: any) => {
              console.error('Error:', error);
            });
        } else {
        
          console.log(data.mensaje);
        }
      },
      (error) => {
     

        console.log(error);
     
    }
  );

  }

//Metodos  
  pagar(){
    let token = localStorage.getItem('tokenid');
     console.log('pagar');
     let total = Number(this.subtotal ) + Number (this.preciopaqueteria);
     this.makePayment(total);
     this.insertventa();
    //  const obj = {
    //          obj: token,
    //  }
    //  console.log(obj);
    //  this.stripeService.stripe(obj).subscribe((data: any)=>{
    //    console.log(data);
    //  }, ((err: any)=>{
    //     console.log(err);
    //  })
    //  )
      

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
  
 inciarcompra(){
  let cart = this.existproducto();
  if(cart == true){
     if(this.subtotal > 20){
       this.router.navigate(['/datos-personales']);
         
         
     }else{
      var mensaje = 'La compra minima es de $20 pesos, para continuar con la compra agrega más productos al carrito';
      var titulo = 'Atención'; 
      this.open();
      // this.alertService.warnig(mensaje, titulo);  
     }
  }else{
     
  }
}
open(){
  ($('#exampleModal') as any).modal('show');

}
existproducto(): boolean{
return localStorage.getItem('cartproductos') != null;
}

comprarmas(){
    this.close();
    this.router.navigate(['/accesorios']);
}

 close(){
    ($('#exampleModal') as any).modal('hide');
    ($('body')as any ).removeClass('modal-open');
    ($('.modal-backdrop')as any ).remove();
  }






}
