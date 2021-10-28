import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { pinatas } from 'src/app/model/pinatas.interface';
import { PinatasService } from 'src/app/services/pinatas/pinatas.service';
import { AlertsService } from '../../services/extras/alerts/alerts.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { URL_IMG } from 'src/environments/environment';
import { SubirimgService } from 'src/app/services/subirimg/subirimg.service';
import { CarritoProductoService } from '../../services/carrito-producto/carrito-producto.service';
import { ServiciosService } from 'src/app/services/servicios/servicios.service';
import { Servicios } from 'src/app/model/servicios.interface';
// import { CarritoService } from '../../services/carrito/carrito.service';
import { CarritoServiciosService } from '../../services/carrito-servcios/carrito-servicios.service';




@Component({
  selector: 'app-home',
  templateUrl: './piñatas.component.html',
  styleUrls: ['./piñatas.component.css']
})
export class PiñatasComponent implements OnInit {

  archivosSubir: any[] = [];
  archivosSubirBase64: any[] = [];
  urlImages: string = 'https://servifiestas.com.mx/punto_venta/assets/images/services/';

  inflables:any = [
    { img: './assets/imgs/piñatas/pinata2.jpg',nombre:'Dragon negro', precio: '150', descripcion: 'Piñata de pelicula "Como entrenar a tu dragon"' },
    { img: './assets/imgs/piñatas/pinata.jpg', precio: '190',  descripcion: 'Piñata multicolor' },
    { img: './assets/imgs/piñatas/pinata3.jpg', precio: '145',  descripcion: 'Piñata de caperucita roja' },
  ]

  form!: FormGroup;
   candicion = 6;
   Pinatas: pinatas [] = [];
   pinata: any  = {};
   orden: string = 'No'; 
   items = [];
   pageOfItems: Array<any>;
  constructor(
     private pinateService: PinatasService,
     private alertService: AlertsService,
     private serviceimg: SubirimgService,
      private carritoproductoService: CarritoProductoService,
    private servicioService: ServiciosService,
    private carritoService: CarritoServiciosService
  ) { }

  ngOnInit(): void {
   
    this.form = new FormGroup ({
      nombre:  new FormControl(null, [Validators.required]),
      telefono: new FormControl(null, [Validators.required]),
      //  id_cliente: new FormControl(null),
      fecha: new FormControl(null, [Validators.required]),
      descripcion: new FormControl(null, [Validators.required]),
      img:  new FormControl(null),
    })
     this.get();       
     
    this.items = Array(150).fill(0).map((x, i) => ({ id: (i + 1), name: `Item ${i + 1}`}));
  }
  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
}
get(){
             
  this.servicioService.getcategoria(this.candicion).subscribe((data: any)=>{
   console.log('LISTA ACCESORIOS', data);
   this.Pinatas = data.lista;
 },((err: any)=>{
   console.log(err);
 })
   
 )
}

verificarSession(): boolean {
  return localStorage.getItem('token') != null;
}


  agregar(item, metodo){
    //  Swal.fire('','Producto agregado al carrito','success');
    let session = this.verificarSession();

     if(session == true){
      var cantidad = 0;  
      let exist = this.productExisCard(item.id);
 
      if(metodo == 'default'){
       cantidad = 1; 
     }else{
       cantidad = this.form.controls.cuantos.value;
     }
      if(exist == false ){
           const obj = {
             cuanty: cantidad, 
          }
          const newObj = Object.assign(item, obj);
          this.carritoService.addcarrito(newObj);
          let mensaje = 'Producto agregado al carrito';
          let titulo = 'Carrito';
          this.alertService.succes(mensaje,titulo); 
          console.log('NEW OBJETO', newObj);
  }else {
   let mensaje = 'Este producto ya se encuentra agregado a tu carrito';
   let titulo = 'Carrito';
   this.alertService.warnig(mensaje,titulo); 
  }
     }else{
      let mensaje = 'Para agregar un producto debe iniciar sessión';
      let titulo = 'Atención';
      this.alertService.warnig(mensaje,titulo); 
     }
    

 

}
          productExisCard(id){
            const lista =  this.carritoService.getCartService();
            console.log('lista',lista);
            var exist: boolean;
             if(lista == null){
                exist = false;  
             }else{ 
              for(let item of lista){
                if(item.id == id ){
                    console.log(item.id,'=', id);
                   exist = true;
                }else{
                     exist = false;
                } 
           }
             }
             return exist;
          }

    
selectOrden(event) {
      // console.log(event);
      let orden = event.target.value;
      console.log(orden);
    }
     
 
  insert(){
    Swal.fire('Gracias por la preferencia','En el transcurso del día alguien de nuestro equipo se contactara contigo para darte el precio de tu piñata','success');
        if(this.archivosSubir.length > 0){
          this.form.controls.img.setValue('');
          if(this.form.valid){
            console.log(this.form.value);
            console.log(this.archivosSubir);
            this.pinateService.post(this.form.value).subscribe((data: any)=>{
              console.log(data);
              this.cargarimg(data.id);
              let mensaje = 'Datos enviados correctamente';
              let titulo = 'Piñatas';
              this.alertService.succes(mensaje, titulo);
            });
          }else{
            console.log('formulario incompleto');
          }

        } else{
          console.log('Debes de seleccionar un archivo');
        } 
    }

   cargarimg(id: string){
      console.log(this.archivosSubir);
      this.serviceimg._subirArchivos(this.archivosSubir, 'Pinatas', id, 'img').subscribe((event)=>{
        console.log(event);
        let mensaje = 'Imagenes cargados';
        let titulo =  'Imagenes';
        this.alertService.succes(mensaje, titulo);
        this.clear();
     }, 
      ((err: string)=>{
        console.log(err);
        let mensaje = 'Error al subir img';
        let titulo  = 'Imagenes';
        this.alertService.err(mensaje, titulo);

      })
     )
   }
    seleccionImagen(event: any,  type: boolean, campo: any = null){
      let archivos = event.target.files;
       console.log(archivos);
       for(const archivo of archivos){
         let reader = new FileReader();
         console.log(archivo);
         let urlImagenTemp = reader.readAsDataURL(archivo); 
         console.log(urlImagenTemp);
         reader.onloadend = () =>{
           let imagenTemp = reader.result;
           this.archivosSubirBase64.push(imagenTemp);
           this.archivosSubir.push(archivo);
         }
       }
     }
clear (){
    this.form.reset();
}

clearte(){
  this.pinata = undefined;
}
servicio: any = {};
detallesServicios(servicio: Servicios){
  console.log(servicio);
     this.servicio.descripcion = servicio.descripcion;
     this.servicio.precio_venta = servicio.precio_venta;
     this.servicio.servicio    =  servicio.servicio;
     this.servicio = servicio;
     this.servicio.img = servicio.imagen;
}












}
