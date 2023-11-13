import { product,products } from "./products";

const gomb1=document.getElementById('all');
const gomb2=document.getElementById('sort_ABC');
const gomb3=document.getElementById('sort_price');
const gomb4=document.getElementById('comment_search');
const keres=document.getElementById('kereso');
const gomb5=document.getElementById('cheap');
const lista1=document.getElementById('lista');

async function adatMegjelenites(termek: product[]) {
    lista1!.textContent=""
    termek.forEach((e)=>{
    const li= document.createElement('li')
    lista1!.appendChild(li)
    li.innerHTML=e.brand+";"+e.title+"€"+e.price;
  })
}

function mind(){
  gomb1!.addEventListener('click',async()=>{
    let eredmeny=await fetch('products.json') 
    let tartalom=await eredmeny.json() as products;
    adatMegjelenites(tartalom.products);
  })
}

function ABC(){
  gomb2!.addEventListener('click',async()=>{
    let eredmeny=await fetch('products.json') 
    let tartalom=await eredmeny.json() as products;
    let sorrend=tartalom.products.sort((a,b)=>a.brand.localeCompare(b.brand))
    adatMegjelenites(sorrend);
  })
}

function price(){
  gomb3!.addEventListener('click',async()=>{
    let eredmeny=await fetch('products.json') 
    let tartalom=await eredmeny.json() as products;
    let sorrend=tartalom.products.sort((a,b)=> b.price-a.price)
    adatMegjelenites(sorrend);
  })
}

function kereses(){
  gomb4!.addEventListener('click', async () => {
    let lekeres = await fetch('products.json');
    let tartalom = await lekeres.json() as products;
    let keresett = (keres as HTMLInputElement).value;
    let termekek = tartalom.products.filter(a => a.description.toLocaleLowerCase().includes(keresett.toLocaleLowerCase()));
    adatMegjelenites(termekek);
  })
}

function cheap(){
  gomb5!.addEventListener('click',async()=>{
    let eredmeny=await fetch('products.json') 
    let tartalom=await eredmeny.json() as products;
    let olcso=tartalom.products.filter(ar=>ar.price<100)
    adatMegjelenites(olcso);
  })
}

document.addEventListener('DOMContentLoaded',()=>{
  mind();
  ABC();
  price();
  kereses();
  cheap();
})

