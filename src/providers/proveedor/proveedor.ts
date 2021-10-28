import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ProveedorProvider {

  // link:string        = "http://localhost/trabajos/viste_moda/app";
  // link_images:string = "http://localhost/trabajos/viste_moda/sistema/assets/app/images";
  link:string        = "https://vistemoda.mx/app";
  link_images:string = "https://vistemoda.mx/sistema/assets/app/images";
  cantidad_favs:number = 0;

  constructor(public http: HttpClient) {

  }

  getCategories(){
    console.log('Hello ProveedorProvider GET CATEGORIES');
    const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.get(this.link+'/list-categories.php',options);
  }

  getCategoriesRandom(){
    console.log('Hello ProveedorProvider GET CATEGORIES RANDOM');
    const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.get(this.link+'/list-categories-random.php',options);
  }

  getCategory(category,estilo_vida,material,talla,categorias){
    console.log('Hello ProveedorProvider GET CATEGORY: ' + category + ', estilo_vida: ' + estilo_vida + ', material: ' + material + ', talla: ' + talla + ', categorias: ' + categorias);
    const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.get(this.link+'/data-category.php?category=' + category + '&estilo_vida=' + estilo_vida + '&material=' + material + '&talla=' + talla + '&categorias=' + categorias,options);
  }

  getProducts(precio_inicial,precio_final,limit){
    console.log('Hello ProveedorProvider GET PRODUCTS');
    const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.get(this.link+'/list-products.php?limit=' + limit + "&precio_inicial=" + precio_inicial + "&precio_final=" + precio_final,options);
  }

  getProductsFilterUser(precio_inicial,precio_final,limit,user){
    console.log('Hello ProveedorProvider GET PRODUCTS FILTER USER');
    const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.get(this.link+'/list-products-user.php?limit=' + limit+'&user=' + user + "&precio_inicial=" + precio_inicial + "&precio_final=" + precio_final,options);
  }

  getProduct(id){
    console.log('Hello ProveedorProvider GET PRODUCT');
    const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.get(this.link+'/data-product.php?id=' + id,options);
  }

  getProductFilterUser(id,user){
    console.log('Hello ProveedorProvider GET PRODUCT FILER USER');
    const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.get(this.link+'/data-product-user.php?id=' + id + '&user=' + user,options);
  }

  getProductsSimilares(category,id_producto){
    console.log('Hello ProveedorProvider GET PRODUCTS SIMILARES');
    const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.get(this.link+'/list-products-similares.php?category=' + category + '&id_producto=' + id_producto,options);
  }

  getProductsCompany(id_tienda){
    console.log('Hello ProveedorProvider GET PRODUCTS SIMILARES');
    const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.get(this.link+'/list-products-company.php?id_tienda=' + id_tienda,options);
  }

  getProductFilterSegmento(segmento,estilo_vida,material,talla,categorias){
    console.log('Hello ProveedorProvider GET PRODUCT SEGMENTO: ' + segmento + ', estilo_vida: ' + estilo_vida + ', material: ' + material + ', talla: ' + talla + ', categorias: ' + categorias);
    const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.get(this.link+'/data-product-segmento.php?segmento=' + segmento + '&estilo_vida=' + estilo_vida + '&material=' + material + '&talla=' + talla + '&categorias=' + categorias,options);
  }

  getProductFilterEstilovida(estilo_vida){
    console.log('Hello ProveedorProvider GET PRODUCT ESTILO VIDA: ' + estilo_vida);
    const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.get(this.link+'/data-product-estilo_vida.php?estilo_vida=' + estilo_vida,options);
  }

  getProductBusqueda(busqueda){
    console.log('Hello ProveedorProvider GET PRODUCT BUSQUEDA: ');
    const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.get(this.link+'/data-product-busqueda.php?busqueda=' + busqueda,options);
  }

  getCompanies(limit){
    console.log('Hello ProveedorProvider GET COMPANIES');
    const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.get(this.link+'/list-companies.php?limit=' + limit,options);
  }

  getCompany(id){
    console.log('Hello ProveedorProvider GET COMPANY');
    const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.get(this.link+'/data-company.php?id=' + id,options);
  }

  getMaterials(){
    console.log('Hello ProveedorProvider GET MATERIALS');
    const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.get(this.link+'/list-materials.php',options);
  }

  getEstilosVida(){
    console.log('Hello ProveedorProvider GET COMPANIES');
    const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.get(this.link+'/list-estilos-vida.php',options);
  }

  getSegmentos(){
    console.log('Hello ProveedorProvider GET SEGMENTOS');
    const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.get(this.link+'/list-segmentos.php',options);
  }

  getBlog(){
    console.log('Hello ProveedorProvider GET BLOG');
    const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.get(this.link+'/list-blog.php',options);
  }

  getBlogArticle(id_article){
    console.log('Hello ProveedorProvider GET BLOG ARTICLE');
    const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.get(this.link+'/data-blog-article.php?id=' + id_article,options);
  }

  getBlogArticleBanners(id_article){
    console.log('Hello ProveedorProvider GET BLOG ARTICLE');
    const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.get(this.link+'/list-blog-article-banners.php?id=' + id_article,options);
  }

  getBlogArticleRelacion(id_article,clasificacion){
    console.log('Hello ProveedorProvider GET BLOG RELACION');
    const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.get(this.link+'/list-blog-article-relacion.php?id=' + id_article + "&clasificacion=" + clasificacion,options);
  }

  getCarrusel(tipo){
    console.log('Hello ProveedorProvider GET CARRUSEL');
    const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.get(this.link+'/list-carrusel.php?tipo=' + tipo,options);
  }

  getBanners(tipo){
    console.log('Hello ProveedorProvider GET BANNERS');
    const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.get(this.link+'/list-banners.php?tipo=' + tipo,options);
  }

  getResultsSearch(busqueda){
    console.log('Hello ProveedorProvider GET RESULTS SEARCH');
    const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.get(this.link+'/get_results_search.php?busqueda='+busqueda,options);
  }

  getUserFavs(user){
    console.log('Hello ProveedorProvider GET RESULTS SEARCH');
    const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.get(this.link+'/data-user-favs-cant.php?user='+user,options);
  }

  getUserFavsProducts(user){
    console.log('Hello ProveedorProvider GET RESULTS SEARCH');
    const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.get(this.link+'/list-products-user-favs.php?user='+user,options);
  }

  getUserInbox(user){
    console.log('Hello ProveedorProvider GET RESULTS SEARCH');
    const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.get(this.link+'/list-user-inbox.php?user='+user,options);
  }

  getUserMessages(id_tienda,user){
    console.log('Hello ProveedorProvider GET RESULTS SEARCH');
    const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.get(this.link+'/list-user-mensajes.php?user='+user + "&id_tienda=" + id_tienda,options);
  }

  getTiendaMessages(id_tienda,user){
    console.log('Hello ProveedorProvider GET RESULTS SEARCH');
    const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.get(this.link+'/list-tienda-mensajes.php?user='+user + "&id_tienda=" + id_tienda,options);
  }

}