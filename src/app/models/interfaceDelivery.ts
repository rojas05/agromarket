import { Ubicacion } from './interfaceUser';
export interface Pedido {
    id? : string,
    pardida : string,
    destino : string,
    producto : string,
    domicilio : string,
    cliente : string,
    vendedor : string,
    cantidad: number,
    valorDomicilio? : number,
    fecha : string,
    estado: string
}