import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AlertsService } from '../../services/extras/alerts/alerts.service';
import { ExtrasService } from '../../services/extras/extras/extras.service';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { ServiciosService } from '../../services/servicios/servicios.service';
import { Renta_servicios } from 'src/app/model/rentaservicios.interface';
import { RentaServiciosService } from '../../services/renta_servicios/renta-servicios.service';
import { CarordenService } from '../../services/carorden/carorden.service';
import { CarritoServiciosService } from '../../services/carrito-servcios/carrito-servicios.service';

declare var $;

@Component({
  selector: 'app-home',
  templateUrl: './apartar.component.html',
  styleUrls: ['./apartar.component.css']
})
export class ApartarComponent implements OnInit {

 id: number;
 nombreServicio: string;
 price: number;
//  Guarda la lista de los datos  obetnidos al hacer del filtro de fechas

 listafechas: any [] = []; 
 isdisable: boolean = false;
 servicio: any = {};

 form!: FormGroup;

 paymentHandler:any = null;

  constructor(
    private rutaActiva: ActivatedRoute,
    private extrasService: ExtrasService,
    private alerservice: AlertsService,
    private serviciosService: ServiciosService,
    private rentaService:  RentaServiciosService,
    private  carordenService:  CarordenService,
    private router: Router,
    private carritoService: CarritoServiciosService,
  

  
  ) { }

  
  ngOnInit(): void {
    document.body.classList.add('bg-apartar');
     this.form = new FormGroup({
      // refer: new FormControl(null),
      // fecha: new FormControl(null),
      fecha_evento: new FormControl(null, [Validators.required]),
      // empleado: new FormControl(null),
      // total: new FormControl(null),
      // sucursal: new FormControl(null),
      status: new FormControl(null),
      cliente: new FormControl(null, [Validators.required]),
      // pago_inicial: new FormControl(null),
      // estado: new FormControl(null),
      // forma_pago: new FormControl(null),
      google_maps: new FormControl(null,[Validators.required] ),
      lugar_evento: new FormControl(null, [Validators.required]),
      hora_evento: new FormControl(null, [Validators.required]),
      zona_evento: new FormControl(null, [Validators.required]),
      // voucher: new FormControl(null),
      telefono: new FormControl(null, [Validators.required]),
     });
    
    this.id = this.rutaActiva.snapshot.params.id;
    this.nombreServicio = this.rutaActiva.snapshot.params.servicio;
    this.price = this.rutaActiva.snapshot.params.price;

    //  this.getbyid();
      this.datos();
    // console.log(this.id);
    

    this.get();
    
    this.invokeStripe();
  }
  datos(){
    const obj = JSON.parse(localStorage.getItem("user"));
    console.log(obj);
    this.form.controls.cliente.setValue(obj.nombre);
    this.form.controls.telefono.setValue(obj.telefono);
   
}




  ngOnDestroy(): void {
    document.body.classList.remove('bg-apartar');
  }
 getbyid(){
     this.serviciosService.getByid(this.id).subscribe((data: any)=>{
         console.log(data);
         this.servicio.nombre = data.result.servicio;
         this.servicio.precio = data.result.precio_venta;
          console.log('precio venta',this.servicio.precio);
     },
       ((err: any)=>{
       console.log(err);
     }))   

 }





 verificar(fecha){
   console.log(fecha);
   const obj = {
       fecha: fecha,
       id_servicio: this.id,
   }
   this.extrasService.get(obj).subscribe((data: any)=>{
     this.listafechas = data.lista;
     console.log(this.listafechas);
       if(this.listafechas.length == 0) {
         var mensaje = 'Servicio Disponible' +' ' + fecha ;
         var titulo= 'Servicios';   
         this.alerservice.succes(mensaje, titulo);
         this.isdisable = false;
       }else {
        var mensaje = 'Servicio No Disponible' +' ' + fecha ;
        var titulo= 'Servicios';   
        this.alerservice.warnig(mensaje, titulo);
        this.isdisable = true;
      }
   });
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
                  estado: 'Pendiente',
                  forma_pago: 'Efectivo',                 
       }    
       
       return obj;

}
 
tipopago: string;
// forma de pago  sucursal o en la web 
formapago(tipo: string){
  this.tipopago = tipo;
  console.log('tipo pgo', tipo);
  const obj =   this.guardarDatos();
  console.log(obj);
   
  if(this.tipopago == 'sucursal'){
      this.insert();
  }else {
        this.closemodal();
        this.router.navigate(['/resumen-pago','servicios']);
        console.log(this.form.value);
        localStorage.setItem('data_user_service', JSON.stringify(this.form.value));
    
  }

}

guardarDatos (){
     this.form.value;
     console.log(this.form.value);
     return this.form.value;
}


insert(){    
          const objForm = this.guardarDatos();
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
       if(this.form.valid){
           console.log('Formulario completo');
           this.rentaService.post(obj).subscribe((data: any)=>{
             console.log(data);
             this.closemodal();
             this.carOrdenService(obj , data.id); 
             this.router.navigate(['/comprobante', data.id]);

           },((err: any)=>{
             console.log(err);
           }) 
           )
           
       }else{
              var mensaje = 'Faltan datos por llenar en el formulario';
              let titulo = 'Apartado';
               this.alerservice.warnig(mensaje, titulo);
       }    
}


servicios: any [] = [];
subtotal: number;
get(){
  const lista =  this.carritoService.getCartService();
  // console.log('lista de servicio',lista);
  if(lista == null){
     var mensaje = 'No existen productos registrados';
     var titulo = 'Carrito';
     this.alerservice.warnig(mensaje, titulo);  
  }else {
  this.servicios = lista;
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
   }
} 
//  console.log('precio final',  precio_unidad + preciomayorista );
var cantidad_pagar = 0;
cantidad_pagar = precio_unidad + preciomayorista ;
this.subtotal =  Math.round(cantidad_pagar);
console.log('Precio Final', this.subtotal);
}



closemodal(){
  ($('#msjModal') as any).modal('hide');
  ($('body')as any ).removeClass('modal-open');
  ($('.modal-backdrop')as any ).remove();
}










// registrar en tabla car order_service 
   
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


// stripe

async makePayment() {
  console.log('pagar con stripe');
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
    name: 'Servicios',
    description: 'Apartado',
    amount: this.servicio.precio * 100
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







}
