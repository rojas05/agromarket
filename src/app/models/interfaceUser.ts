
export interface User {
    id : number,
    nombre : string,
    direccion : string,
    telefono : string
}

export interface Seller {
    nombreEmpresa : string,
    direccion : string,
}

export interface Client {
    direccion : string,
}

export interface Delivery {
    rutas : string,
}