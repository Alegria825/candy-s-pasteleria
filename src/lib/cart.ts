import { waBase, orderMessage, type CartItem } from './whatsapp';

type Kind = CartItem['kind'];
const KEY = 'candys_cart';
let cart: Record<string, { qty: number; kind: Kind }> = {};
try {
  cart = JSON.parse(localStorage.getItem(KEY) || '{}');
} catch {}

const $ = (q: string) => document.querySelector<HTMLElement>(q)!;
const all = <T extends HTMLElement>(q: string) => document.querySelectorAll<T>(q);
const items = (): CartItem[] => Object.entries(cart).map(([name, i]) => ({ name, ...i }));
const total = () => items().reduce((t, i) => t + i.qty, 0);
const save = () => {
  try {
    localStorage.setItem(KEY, JSON.stringify(cart));
  } catch {}
};

function render() {
  const t = total();
  all('.cnt').forEach((b) => {
    b.textContent = String(t);
    b.style.display = t ? '' : 'none';
  });
  all<HTMLAnchorElement>('a[data-wa]').forEach((a) => {
    a.dataset.h ??= a.href;
    a.href = t ? `${waBase}?text=${encodeURIComponent(orderMessage(items()))}` : a.dataset.h;
  });
  all('.add').forEach((b) => {
    const q = cart[b.dataset.n!]?.qty || 0;
    b.dataset.q = q ? String(q) : '';
    b.classList.toggle('on', q > 0);
    if (b.dataset.l) b.textContent = q ? `✓ En tu pedido (${q})` : '+ Agregar';
  });
  $('#ci').innerHTML = items()
    .map(
      (i) => `<div class="ci"><div><b>${i.name}</b><small>${i.kind}</small></div><div class="qt">
        <button data-d="-1" data-n="${i.name}" aria-label="Quitar uno">−</button><span>${i.qty}</span>
        <button data-d="1" data-n="${i.name}" aria-label="Agregar uno">+</button></div></div>`,
    )
    .join('');
  $('#ce').style.display = t ? 'none' : '';
  $('#cw').style.display = t ? '' : 'none';
  const fl = document.querySelector('.fab .fl');
  if (fl) fl.textContent = t ? `Pedir por WhatsApp (${t})` : 'Pedir por WhatsApp';
}

const lock = () =>
  (document.body.style.overflow =
    $('#mn').classList.contains('on') || $('#cart').classList.contains('on') ? 'hidden' : '');
function openCart(on: boolean) {
  $('#cart').classList.toggle('on', on);
  $('#ov').classList.toggle('on', on);
  $('#cart').setAttribute('aria-hidden', String(!on));
  lock();
}
function openMenu(on: boolean) {
  $('#mn').classList.toggle('on', on);
  all('[data-menu]').forEach((b) => b.setAttribute('aria-expanded', String(on)));
  lock();
}
let timer: number;
function toast(name: string) {
  const t = $('#ts');
  t.firstElementChild!.textContent = `Agregado: ${name}`;
  t.classList.add('on');
  clearTimeout(timer);
  timer = window.setTimeout(() => t.classList.remove('on'), 2600);
}

document.addEventListener('click', (e) => {
  const target = e.target as HTMLElement;
  const add = target.closest<HTMLElement>('.add');
  const step = target.closest<HTMLElement>('[data-d]');
  if (add) {
    const name = add.dataset.n!;
    cart[name] = { qty: (cart[name]?.qty || 0) + 1, kind: add.dataset.k as Kind };
    save();
    render();
    toast(name);
  } else if (step) {
    const name = step.dataset.n!;
    const qty = (cart[name]?.qty || 0) + Number(step.dataset.d);
    if (qty <= 0) delete cart[name];
    else cart[name].qty = qty;
    save();
    render();
  } else if (target.closest('[data-cart]')) {
    $('#ts').classList.remove('on');
    openCart(true);
  } else if (target.closest('[data-x]')) openCart(false);
  else if (target.closest('[data-menu]')) openMenu(true);
  else if (target.closest('[data-mc]')) openMenu(false);
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    openCart(false);
    openMenu(false);
  }
});
render();
