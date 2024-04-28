export interface Pedido {
    id? : string,
    producto : string,
    descripcion : string,
    domicilio : string,
    cliente : string,
    vendedor : string,
    cantidad: number,
    valorUnidad: number,
    valorTotal : number,
    valorDomicilio? : number,
    fecha : string,
    message: string,
    estado: string
}