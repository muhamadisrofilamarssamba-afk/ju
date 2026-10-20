// Data menu kantin simulation
const daftarMenu = [
    { id: 1, nama: "Nasi Goreng Spesial", harga: 12000 },
    { id: 2, nama: "Mie Ayam Bakso", harga: 10000 },
    { id: 3, nama: "Es Teh Manis", harga: 3000 },
    { id: 4, nama: "Gorengan Isi 3", harga: 2500 }
];

let keranjang = [];

// 1. Menampilkan menu ke HTML
const menuContainer = document.getElementById("menu-container");
function renderMenu() {
    menuContainer.innerHTML = "";
    daftarMenu.forEach(item => {
        const card = document.createElement("div");
        card.className = "menu-card";
        card.innerHTML = `
            <h3>${item.nama}</h3>
            <p>Rp ${item.harga.toLocaleString('id-ID')}</p>
            <button onclick="tambahKeKeranjang(${item.id})">Tambah</button>
        `;
        menuContainer.appendChild(card);
    });
}

// 2. Fungsi Tambah ke Keranjang
function tambahKeKeranjang(id) {
    const produk = daftarMenu.find(item => item.id === id);
    const itemDiKeranjang = keranjang.find(item => item.id === id);

    if (itemDiKeranjang) {
        itemDiKeranjang.jumlah += 1;
    } else {
        keranjang.push({ ...produk, jumlah: 1 });
    }
    updateKeranjang();
}

// 3. Update Tampilan Keranjang & Total Harga
function updateKeranjang() {
    const cartItems = document.getElementById("cart-items");
    const totalHargaEl = document.getElementById("total-harga");
    const checkoutBtn = document.getElementById("checkout-btn");

    if (keranjang.length === 0) {
        cartItems.innerHTML = '<p class="empty-msg">Keranjang masih kosong.</p>';
        totalHargaEl.innerText = "Rp 0";
        checkoutBtn.disabled = true;
        return;
    }

    cartItems.innerHTML = "";
    let total = 0;

    keranjang.forEach(item => {
        total += item.harga * item.jumlah;
        const li = document.createElement("li");
        li.className = "cart-item";
        li.innerHTML = `
            <span>${item.nama} (x${item.jumlah})</span>
            <span>Rp ${(item.harga * item.jumlah).toLocaleString('id-ID')}</span>
        `;
        cartItems.appendChild(li);
    });

    totalHargaEl.innerText = `Rp ${total.toLocaleString('id-ID')}`;
    checkoutBtn.disabled = false;
}

// 4. Integrasi Kirim Pesanan via WhatsApp
document.getElementById("checkout-btn").addEventListener("click", () => {
    let nomorKantin = "628123456789"; // Ganti dengan nomor WhatsApp Ibu/Bapak Kantin asli
    let teksPesan = "Halo Kantiin, saya mau prapesan makanan:%0A";
    
    keranjang.forEach(item => {
        teksPesan += `- ${item.nama} x${item.jumlah}%0A`;
    });
    
    teksPesan += `%0ATotal Bayar: ${document.getElementById("total-harga").innerText}%0AMohon disiapkan ya, terima kasih!`;
    
    // Membuka tautan WhatsApp API
    window.open(`https://whatsapp.com{nomorKantin}&text=${teksPesan}`, '_blank');
});

// Jalankan fungsi render saat pertama kali web dimuat
renderMenu();
