const waNumber="6281212410394";
let cart=[];

// ===== DATA =====
const menuUtama=[
 {nama:"Pecel Ayam + Nasi",harga:21000,img:"gambar/pecel ayam.jpg"},
 {nama:"Ayam Penyet + Nasi",harga:22000,img:"gambar/ayam penyet 1.jpg"},
 {nama:"Ayam Bakar + Nasi",harga:22000,img:"gambar/ayam bakar 1.jpg"},
 {nama:"Ayam Kremes + Nasi",harga:24000,img:"gambar/ayam kremes 1.jpg"},
 {nama:"Pecel Lele + Nasi",harga:18000,img:"gambar/pecel lele.jpg"},
 {nama:"Lele Kremes + Nasi",harga:21000,img:"gambar/kremes lele 1.jpg"},
 {nama:"Ayam Goreng (Tanpa Nasi)",harga:16000,img:"gambar/goreng.jpg"},
 {nama:"Ayam Penyet (Tanpa Nasi)",harga:17000,img:"gambar/penyettt.jpg"},
 {nama:"Ayam Bakar (Tanpa Nasi)",harga:17000,img:"gambar/bara aja.jpg"},
 {nama:"Ayam Kremes (Tanpa Nasi)",harga:19000,img:"gambar/ayam kremes.jpg"},
 {nama:"Lele Goreng (Tanpa Nasi)",harga:13000,img:"gambar/lele.jpg"},
 {nama:"Lele Kremes (Tanpa Nasi)",harga:16000,img:"gambar/lele goreng.jpg"}
];

const menuTambahan=[
 {nama:"Cumi Asin Cabe Ijo Original",harga:25000,img:"gambar/cumi ori.jpg"},
 {nama:"Cumi Asin Cabe Ijo Saus Tiram",harga:30000,img:"gambar/cum ST.jpg"},
 {nama:"Cah Kangkung Original / Terasi",harga:15000,img:"gambar/kangkung  ori.jpg"},
 {nama:"Cah Kangkung Saus Tiram",harga:20000,img:"gambar/kangkung ST.jpg"},
 {nama:"Tempe Goreng",harga:2000,img:"gambar/tempe.jpg"},
 {nama:"Tahu Goreng",harga:3000,img:"gambar/tahu.jpg"},
 {nama:"Kol Goreng",harga:10000,img:"gambar/kol goreng.jpg"},
 {nama:"Kremesan (Tanpa Ayam/Lele)",harga:8000,img:"gambar/kremesan.jpg"},
 {nama:"Nasi Putih",harga:5000,img:"gambar/nasi.jpg"},
 {nama:"Sambel Merah 35ml",harga:3000,img:"gambar/sambel.jpg"},
];

const menuMinuman=[
 {nama:"Es Jeruk",harga:7000,img:"gambar/es jeruk.jpg"},
 {nama:"Es Teh Manis",harga:5000,img:"gambar/es teh manis.jpg"},
 {nama:"Jeruk Hangat",harga:7000,img:"gambar/jeruk hangat.jpg"},
 {nama:"Es Teh Tawar",harga:3000,img:"gambar/es teh tawar.jpg"},
 {nama:"Air Mineral 600ml",harga:4000,img:"gambar/lemineral.jpg"},
 ];

// ===== RENDER =====
function renderMenu(data,id){
  const el=document.getElementById(id);
  el.innerHTML="";
  data.forEach(i=>{
    el.innerHTML+=`
    <div class="card">
      <img src="${i.img}">
      <div class="info">
        <h4>${i.nama}</h4>
        <p class="price">Rp ${i.harga.toLocaleString()}</p>
        <button onclick="addCart('${i.nama}',${i.harga})">+ Pesan</button>
      </div>
    </div>`;
  });
}

function addCart(n,h){
  const f=cart.find(i=>i.nama===n);
  f?f.qty++:cart.push({nama:n,harga:h,qty:1});
  updateCart();
}

function updateCart(){
  const list=document.getElementById("cart-list");
  const totalEl=document.getElementById("total");
  list.innerHTML="";
  let total=0;
  cart.forEach((i,x)=>{
    total+=i.harga*i.qty;
    list.innerHTML+=`
    <li>
      <div class="qty">
        <button onclick="qty(${x},-1)">-</button>${i.qty}
        <button onclick="qty(${x},1)">+</button>
      </div>
      <span>Rp ${(i.harga*i.qty).toLocaleString()}</span>
      <button class="remove" onclick="removeItem(${x})">×</button>
    </li>`;
  });
  totalEl.textContent="Rp "+total.toLocaleString();
}

function qty(i,v){
  cart[i].qty+=v;
  if(cart[i].qty<1) cart.splice(i,1);
  updateCart();
}
function removeItem(i){cart.splice(i,1);updateCart();}
function clearCart(){cart=[];updateCart();}

function checkout(){
  if(!cart.length) return alert("Keranjang kosong");
  let txt="Halo Bang Fadla, saya pesan:%0A";
  cart.forEach(i=>txt+=`- ${i.nama} x${i.qty}%0A`);
  window.open(`https://wa.me/${waNumber}?text=${txt}`,"_blank");
}

// TAB
function showTab(tab,el){
  document.querySelectorAll("section").forEach(s=>s.classList.add("hidden"));
  document.querySelectorAll(".tab").forEach(b=>b.classList.remove("active"));
  document.getElementById("tab-"+tab).classList.remove("hidden");
  el.classList.add("active");
}

renderMenu(menuUtama,"menu-utama");
renderMenu(menuTambahan,"menu-tambahan");
renderMenu(menuMinuman,"menu-minuman");