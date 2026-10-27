import { site } from '../data/site';

export type CartItem = { name: string; kind: 'Pastel' | 'Antojo'; qty: number };

export const waBase = `https://wa.me/${site.whatsapp}`;
const link = (text: string) => `${waBase}?text=${encodeURIComponent(text)}`;

/** Mensajes por defecto (carrito vacío). */
export const wa = {
  general: link("Hola Candy's, quiero cotizar un pastel. Fecha: ___  Sabor: ___  Tema: ___"),
  antojos: link("Hola Candy's, quiero pedir rebanadas, postres, cupcakes o galletas."),
};

/** Mensaje con el contenido del carrito. */
export function orderMessage(items: CartItem[]): string {
  const lines = (kind: CartItem['kind']) =>
    items.filter((i) => i.kind === kind).map((i) => `- ${i.name} x${i.qty}`);
  const pasteles = lines('Pastel');
  const antojos = lines('Antojo');
  let msg = "Hola Candy's, quiero cotizar este pedido:\n";
  if (pasteles.length) msg += `\nPasteles\n${pasteles.join('\n')}\n`;
  if (antojos.length) msg += `\nAntojos\n${antojos.join('\n')}\n`;
  return msg + '\nFecha del evento: ___\nNombre y tema: ___\nEntrega: recoger en tienda / a domicilio';
}
