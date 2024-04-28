
export interface User {
    id?: string,
    nombre : string,
    municipio : string,
    direccion : string,
    telefono : string
}

export interface Seller {
    id?: string,
    nombreEmpresa : string,
    vereda : string,
    direccion : string,
    ubicacion? : Ubicacion,
    img? : string[]
}

export interface Client {
    id?: string,
    direccion : string,
    ubicacion? : Ubicacion,
}

export interface Delivery {
    id?: string,
    rutas : string,
}

export interface SellerIndication {
    imagen : string,
}

export interface Ubicacion {
    lat : number,
    lng : number
}

export interface TypesUser {
    type: string,
    name?: string
  }