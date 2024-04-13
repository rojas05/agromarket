
export interface User {
    nombre : string,
    municipio : string,
    direccion : string,
    telefono : string
}

export interface Seller {
    nombreEmpresa : string,
    direccion : string,
    img : string[]
}

export interface Client {
    direccion : string,
}

export interface Delivery {
    rutas : string,
}

export interface SellerIndication {
    imagen : string,
}
