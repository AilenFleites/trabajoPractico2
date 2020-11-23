//-TRABAJO PRACTICO N° 2 -Local de ventas de PCs

var local = {
    vendedoras: ["Ada", "Grace", "Hedy", "Sheryl"],

    ventas: [
        // tener en cuenta que Date guarda los meses del 0 (enero) al 11 (diciembre)
        { fecha: new Date(2019, 1, 4), nombreVendedora: "Grace", componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1500"] },
        { fecha: new Date(2019, 0, 1), nombreVendedora: "Ada", componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1500"] },
        { fecha: new Date(2019, 0, 2), nombreVendedora: "Grace", componentes: ["Monitor ASC 543", "Motherboard MZI"] },
        { fecha: new Date(2019, 0, 10), nombreVendedora: "Ada", componentes: ["Monitor ASC 543", "Motherboard ASUS 1200"] },
        { fecha: new Date(2019, 0, 12), nombreVendedora: "Grace", componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1200"] }
    ],

    precios: [
        { componente: "Monitor GPRS 3000", precio: 200 },
        { componente: "Motherboard ASUS 1500", precio: 120 },
        { componente: "Monitor ASC 543", precio: 250 },
        { componente: "Motherboard ASUS 1200", precio: 100 },
        { componente: "Motherboard MZI", precio: 30 },
        { componente: "HDD Toyiva", precio: 90 },
        { componente: "HDD Wezter Dishital", precio: 75 },
        { componente: "RAM Quinston", precio: 110 },
        { componente: "RAM Quinston Fury", precio: 230 }
    ]
};
//1.1 precioMaquina(componentes):

const { precios, ventas, vendedoras } = local;

const precioMaquina = (componentes) => {
    let precioMaquina = 0;
    for (const componente of componentes) { //recorro los componentes que recibo x parametro
        for (const componentePrecios of precios) { //recorro los componentes del listado de precios
            if (componente === componentePrecios.componente) {//si el componente esta en el listado
                precioMaquina = precioMaquina + componentePrecios.precio; //accedo al precio del componente y sumo
            }
        }
    }
    return precioMaquina;//retorno el monto total de venta
}

//console.log(precioMaquina(["Monitor GPRS 3000", "Motherboard ASUS 1500"])); //320 

// 1.2 - cantidadVentasComponente(componente): 

const cantidadVentasComponente = (componente) => {
    let cantidadVentasComponente = 0;
    for (const venta of ventas) { //recorro la lista de ventas
        if (venta.componentes.includes(componente)) {//pregunto si el componente esta en esa venta
            cantidadVentasComponente++;// si está, lo sumo.
        }
    }
    return cantidadVentasComponente; //retorno la suma de veces que fue vendido.
}

//console.log(cantidadVentasComponente("Monitor ASC 543")); // 2

//1.3 - vendedoraDelMes(mes, anio):

const vendedoraDelMes = (mes, anio) => {
    let importeVenta = 0;
    let vendedoraDelMes = "";
    let datosVenta = {};
    let ventasXmes = [];

    for (let i = 0; i < ventas.length; i++) {//recorro ventas
        if (ventas[i].fecha.getFullYear() === (anio) &&
            ventas[i].fecha.getMonth() + 1 === (mes)) { //traigo las ventas de ese mes y año
            datosVenta = {// creo un objeto con las propiedades:
                nombre: ventas[i].nombreVendedora,//nombre
                importe: precioMaquina(ventas[i].componentes),//importe de venta
            }
            ventasXmes.push(datosVenta);// creo un nuevo array de objetos {datos de ventas}
        }
    }
    console.log(ventasXmes)
    for (const vendedora of vendedoras) { // recorro las vendedoras
        let aux = 0;
        for (const venta of ventasXmes) {// recorro mi nuevo array de objetos ventas filtrado
            if (!vendedoraDelMes) {
                vendedoraDelMes = venta.nombre; //inicializo estas dos variables con el primer valor
                importeVenta = venta.importe;
            }
            if (vendedora === venta.nombre) {//si vendedora es la vendedora de esa venta
                aux += venta.importe; //acumulo en aux
            }
        }
        if (aux > importeVenta) { //si aux es mayor a importeVenta
            importeVenta = aux;// aux se vuelve importeVenta
            vendedoraDelMes = vendedora  // y vendedora es la vendedora del mes
        }
    }
    return vendedoraDelMes;
}

//console.log(vendedoraDelMes(1, 2019)); // "Ada"

//1.4 - ventasMes(mes, anio):

const ventasMes = (mes, anio) => {
    let ventasMes = 0;
    for (const venta of ventas) {//recorro lista de ventas
        // si el año y mes de venta coinciden sumo los valores de cada venta
        if (venta.fecha.getFullYear() === anio && venta.fecha.getMonth() === (mes - 1)) {
            ventasMes = ventasMes + precioMaquina(venta.componentes);
        }
    }
    return ventasMes;//retorno la suma de ventas de ese mes
}
//console.log(ventasMes(1, 2019)); // 1250

//1.5 - ventasVendedora(nombre):

const ventasVendedora = (nombre) => {
    let ventasVendedora = 0;
    for (const venta of ventas) { //recorro lista de ventas
        if (venta.nombreVendedora === nombre) {//si el nombde de vendedora x venta es igual a nombre requerido
            ventasVendedora = ventasVendedora + precioMaquina(venta.componentes); // //acumulo las ventas 
        }
    }
    return ventasVendedora; //retorno la suma total de ventas que realizo esa vendedora
}
//console.log(ventasVendedora("Grace")); // 900

//1.6 componenteMasVendido(): 

const componenteMasVendido = () => {
    const { precios: componente } = local;
    let listadoComponentes = [];
    let objetoComponente = {}
    for (let i = 0; i < precios.length; i++) { //recorro todos los componentes de mi lista de precios
        objetoComponente = {//creo un nuevo objeto con nombre componente y total de veces que fue vendido
            nombre: componente[i].componente,
            cantidadDeVecesVendido: cantidadVentasComponente(componente[i].componente),
        }
        listadoComponentes.push(objetoComponente);//creo un array de {componente} con las prop anteriores
    }
    let masVendido = listadoComponentes[0];//defino el primer elemto de mi array como el maximo para comparar
    for (const componente of listadoComponentes) {
        //comparo la cantidad de veces que cada componente fue vendido con el primero
        if (componente.cantidadDeVecesVendido > masVendido.cantidadDeVecesVendido) {
            //si es mayor se vuelve el mas vendido
            masVendido = componente;
        }
        
    }
    return masVendido.nombre;
}

//console.log(componenteMasVendido()); // Monitor GPRS 3000

//1.7 - huboVentas(mes, anio):

const huboVentas = (mes, anio) => {
    for (const venta of ventas) { //recorro las ventas
        let month = venta.fecha.getMonth() + 1;
        let year = venta.fecha.getFullYear();
        if (year === anio && mes === month) { // si hay ventas en dicho mes y año
            return true; //retorno verdadero
        }
    }
    return false; // por default devuelve falso si la condicion no se cumple
}
//console.log(huboVentas(1, 2019));//true
//console.log(huboVentas(3, 2019)); // false;

//PARTE 2: 

//2.1 -En las ventas ya existentes,agregar la propiedad sucursal con el valor Centro

for (const venta of ventas) {
    venta.sucursal = "Centro";
}
//console.log(ventas);

// 2.2 Agregar al objeto principal la propiedad sucursales: ['Centro', 'Caballito']

local.sucursales = ["Centro", "Caballito"];

//console.log(local);

/*2.3 - Cargar la siguiente información en el array ventas, creando sus respectivos 
objetos siguiendo el patrón: fecha, nombreVendedora, componentes, sucursal*/

ventas.push({ fecha: new Date(2019, 1, 12), nombreVendedora: "Hedy", componentes: ["Monitor GPRS 3000", "HDD Toyiva"], sucursal: "Centro" });
ventas.push({ fecha: new Date(2019, 1, 24), nombreVendedora: "Sheryl", componentes: ["Motherboard ASUS 1500", "HDD Wezter Dishital"], sucursal: "Caballito" });
ventas.push({ fecha: new Date(2019, 1, 01), nombreVendedora: "Ada", componentes: ["Motherboard MZI", "RAM Quinston Fury"], sucursal: "Centro" });
ventas.push({ fecha: new Date(2019, 1, 11), nombreVendedora: "Grace", componentes: ["Monitor ASC 543", "RAM Quinston"], sucursal: "Caballito" });
ventas.push({ fecha: new Date(2019, 1, 15), nombreVendedora: "Ada", componentes: ["Motherboard ASUS 1200", "RAM Quinston Fury"], sucursal: "Centro" });
ventas.push({ fecha: new Date(2019, 1, 12), nombreVendedora: "Hedy", componentes: ["Motherboard ASUS 1500", "HDD Toyiva"], sucursal: "Caballito" });
ventas.push({ fecha: new Date(2019, 1, 21), nombreVendedora: "Grace", componentes: ["Motherboard MZI", "RAM Quinston"], sucursal: "Centro" });
ventas.push({ fecha: new Date(2019, 1, 08), nombreVendedora: "Sheryl", componentes: ["Monitor ASC 543", "HDD Wezter Dishital"], sucursal: "Centro" });
ventas.push({ fecha: new Date(2019, 1, 16), nombreVendedora: "Sheryl", componentes: ["Monitor GPRS 3000", "RAM Quinston Fury"], sucursal: "Centro" });
ventas.push({ fecha: new Date(2019, 1, 27), nombreVendedora: "Hedy", componentes: ["Motherboard ASUS 1200", "HDD Toyiva"], sucursal: "Caballito" });
ventas.push({ fecha: new Date(2019, 1, 22), nombreVendedora: "Grace", componentes: ["Monitor ASC 543", "HDD Wezter Dishital"], sucursal: "Centro" });
ventas.push({ fecha: new Date(2019, 1, 05), nombreVendedora: "Ada", componentes: ["Motherboard ASUS 1500", "RAM Quinston"], sucursal: "Centro" });
ventas.push({ fecha: new Date(2019, 1, 01), nombreVendedora: "Grace", componentes: ["Motherboard MZI", "HDD Wezter Dishital"], sucursal: "Centro" });
ventas.push({ fecha: new Date(2019, 1, 07), nombreVendedora: "Sheryl", componentes: ["Monitor GPRS 3000", "RAM Quinston"], sucursal: "Caballito" });
ventas.push({ fecha: new Date(2019, 1, 14), nombreVendedora: "Ada", componentes: ["Motherboard ASUS 1200", "HDD Toyiva"], sucursal: "Centro" });

/*2.4 Crear la función ventasSucursal(sucursal), 
que obtiene las ventas totales realizadas por una sucursal sin límite de fecha*/

const ventasSucursal = (sucursal) => {
    let ventasSucursal = 0;
    for (const venta of ventas) { //recorro ventas
        if (venta.sucursal === sucursal) { // si la venta es la misma que me pide por parametro
            ventasSucursal = ventasSucursal + precioMaquina(venta.componentes); //caculo el monto de venta y acumulo
        }
    }
    return ventasSucursal;//retorno el total de todas las ventas de esa sucursal
}

//console.log( ventasSucursal("Centro") ); // 4195


/*2.5 Las funciones ventasSucursal y ventasVendedora tienen mucho código en común, 
ya que es la misma funcionalidad pero trabajando con una propiedad distinta. 
Entonces, ¿cómo harías para que ambas funciones reutilicen código y evitemos repetir?*/

const ventasPorProp = (prop, value) => { //para reutilizar codigo de esas funciones paso una prop y un valor de filtro
    let totalVentas = 0;
    for (const venta of ventas) {//recorro las ventas
        if (venta[prop] === value) {//filtro según propiedad y valor
            totalVentas = totalVentas + precioMaquina(venta.componentes);

        }
    }
    return totalVentas;//retorno ventas totales de ese filtro propiedad/valor
}

//console.log(ventasPorProp("sucursal", "Centro")); // 4195
//console.log(ventasPorProp("nombreVendedora", "Grace"));


// 2.6 Crear la función sucursalDelMes(mes, anio)

const sucursalDelMes = (mes, anio) => {
    const { sucursales, ventas } = local;
    let importeVenta = 0;
    let sucursalDelMes = "";
    let datosVenta = {};
    let ventasXmes = [];

    for (let i = 0; i < ventas.length; i++) {//recorro ventas
        if (ventas[i].fecha.getFullYear() === (anio) &&
            ventas[i].fecha.getMonth() + 1 === (mes)) { //traigo las ventas de ese mes y año
            // creo un nuevo array de objetos con nombre de vendedora e importe de venta
            datosVenta = {
                sucursal: ventas[i].sucursal,
                importe: precioMaquina(ventas[i].componentes),
            }
            ventasXmes.push(datosVenta);
        }
    }
    for (const sucursal of sucursales) { //recorro las sucursales
        let aux = 0;
        for (const venta of ventasXmes) { //recorro el nuevo array con las ventas filtradas por fecha
            if (!sucursalDelMes) { // si sucursalDelMes esta vacia:
                sucursalDelMes = venta.sucursal;// asigno la primer sucursal y
                importeVenta = venta.importe;// el importe de esa venta
            }
            if (sucursal === venta.sucursal) { // en la segunda vuelta si sucursal = venta.sucursal
                aux += venta.importe;// acumulo en aux el importe de venta
            }
        }
        if (aux > importeVenta) { // si aux es mayor a importe venta
            importeVenta = aux; // aux es el nuevo importe
            sucursalDelMes = sucursal;
        }
    }
    return sucursalDelMes;
}
//console.log(sucursalDelMes(1, 2019)); // "Centro"

//PARTE 3:

//3.1 renderPorMes():

const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
const renderPorMes = (anio) => {
    for (let i = 0; i < meses.length; i++) { //recorro los meses
        console.log("Ventas de " + meses[i], ventasMes(i + 1, anio));
        //uso el indice para imprimir los meses y pasarlo como parametro (i+ 1) 
    }

}
//console.log(renderPorMes(2019));


//3.2 - renderPorSucursal():

const { sucursales } = local;
const renderPorSucursal = () => {
    for (const sucursal of sucursales) {//recorro las sucursales y llamo a ventasSucursal();
        console.log(`Total de ventas de sucursal ${sucursal} : `,ventasSucursal(sucursal));
    }
}

//console.log(renderPorSucursal());

// la funcion vendedoraDelAnio() devuelve la vendedora que más recaudó $
const vendedoraDelAnio = (anio) => {
    let vendedorasDelAnio = [];
    let objeto = {};
    for (const vendedora of vendedoras) {//recorro las vendedoras
        objeto = {
            nombre: vendedora,
            ventas: ventasVendedora(vendedora),// llamo a ventasVendedora() y le paso la vendedora
        }
        vendedorasDelAnio.push(objeto);//creo un nuevo array de vendedoras con las nuevas prop
    }
   let vendedoraDelAnio = vendedorasDelAnio[0];//defino la primera como la mayor
    for (const vendedora of vendedorasDelAnio) {//recorro mi nuevo array
        if (vendedora.ventas > vendedoraDelAnio.ventas) { //comparo los montos de ventas
            vendedoraDelAnio = vendedora.nombre;// si es mayor se vuelve la vendedora del año
        }
    }
    return vendedoraDelAnio; //retorno el nombre de la que mas dinero recaudó
}
//console.log(vendedoraDelAnio(2019));

//3.3 - render():
//pido un año específico por parámetro por si en el futuro hay más ventas
const render = (anio) => {
console.log(`Reporte año ${anio} : `);
renderPorMes(anio);
renderPorSucursal();
console.log(`El producto estrella es : `, componenteMasVendido());
console.log(`La mejor vendedora del año es :`, vendedoraDelAnio(anio));
}

render(2019);