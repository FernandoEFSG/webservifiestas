export interface Ventas {
     id?:number;
	 refer: string;
	 fecha: string;
	 empleado:  string;
	 total:number;
	 sucursal:  string;
	 status:  string;
	 cliente:  string;
	 pago_inicial:number;
	 estado: string;
	 forma_pago: string;
	 paqueteria: string;
	 costo_flete:number;
	 voucher?: string;
	 id_cliente: number;
}