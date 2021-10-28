import { Component, OnInit } from '@angular/core';
import { RentaServiciosService } from '../../services/renta_servicios/renta-servicios.service';
import { CarordenService } from '../../services/carorden/carorden.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CarritoServiciosService } from '../../services/carrito-servcios/carrito-servicios.service';
import { AlertsService } from '../../services/extras/alerts/alerts.service';

declare var $;
@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.css']
})
export class PdfComponent implements OnInit {

  rentaservicio: any = {};
  ordenservicios: any = {};
subtotal: number;


  constructor(
    private rentaServicios: RentaServiciosService,
    private carOrdenService: CarordenService,
    private rutaActiva: ActivatedRoute,
    private carritoService: CarritoServiciosService,
    private alerservice: AlertsService,
    private router: Router,

    ) { }
id: any;
  ngOnInit(): void {
    this.get();
     this.id = this.rutaActiva.snapshot.params.id;
      this.getByid();
  }
   
  getByid(){
    var id = 21;
    this.rentaServicios.getByid(this.id ).subscribe((data: any)=>{
      console.log(data);
       this.rentaservicio.fecha = data.result.fecha;
       this.rentaservicio.hora_evento = data.result.hora_evento;
       this.rentaservicio.folio = data.result.refer;
       this.rentaservicio.pagoinicila = data.result.pago_inicial;
       this.rentaservicio.estado = data.result.estado;
       this.rentaservicio.lugar_evento = data.result.lugar_evento;
       this.rentaservicio.fecha_evento = data.result.fecha_evento;
       console.log(this.rentaservicio.fecha_evento);
       this.getcarorde();
    },
     ((err: any)=>{
       console.log(err);
     })
    
    )
  }
  getcarorde(){
      this.carOrdenService.getrefer( this.rentaservicio.folio).subscribe((data: any)=>{
        console.log(data.result);
        this.ordenservicios.nombre = data.result.nombre;
        this.ordenservicios.cantidad = data.result.cantidad;
        this.rentaservicio.precio = data.result.precio_unitario;
      },((err: any)=>{
        console.log(err);
      })
      
      )
  }
  
 servicios:  any [] = [];

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

  listaservicios: any [] = [];


  nuevalista(obj){
    this.listaservicios.push(obj); 
    console.log(this.listaservicios);
  }

  setTotal(){ 
    var subtotal = 0;
    var total = 0;
    // var subtotal =0;
    var preciomayorista = 0;
    var precio_unidad = 0;
    var abono = 0;
  for (let item of this.servicios) {
     if(item.cuanty >= 10 ) {
             console.log('precio mayorista');
             preciomayorista  = preciomayorista + (Number(item.cuanty)*Number(item.precio_mayorista));
             console.log('Precio mayorista', item.precio_mayorista);
             console.log('total mayorista', preciomayorista);
             abono =  (( Number(preciomayorista)*20) / 100);

             const obj = {
              abono: abono, 
           }
             const newObj = Object.assign(item, obj);
             this.nuevalista(newObj)

              

  
     }else{
      precio_unidad  = precio_unidad + Number(item.cuanty)*Number(item.precio_venta);  
      abono =  (( Number(item.precio_venta)*20) / 100);
      const obj = {
        abono: abono, 
     }
      
      const newObj = Object.assign(item, obj);
      this.nuevalista(newObj)
     }
  } 
  //  console.log('precio final',  precio_unidad + preciomayorista );
  var cantidad_pagar = 0;
  cantidad_pagar = precio_unidad + preciomayorista;
  this.subtotal =  Math.round(cantidad_pagar);
  console.log('Precio Final', this.subtotal);
  }
 


  
  downloadPDF() {
    // Extraemos el
    console.log('imprimir pdf');
    const DATA = document.getElementById('htmlData');
    const doc = new jsPDF('p', 'pt', 'a4');
    const options = {
      background: 'white',
      scale: 3
    };
    html2canvas(DATA, options).then((canvas) => {

      const img = canvas.toDataURL('image/PNG');

      // Add image Canvas to PDF
      const bufferX = 15;
      const bufferY = 15;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      return doc;
    }).then((docResult) => {
      docResult.save(`${new Date().toISOString()}_Renta_servicios.pdf`);
      this.router.navigate(['/home']);
      localStorage.removeItem('cartservice');
    });
  }





}
