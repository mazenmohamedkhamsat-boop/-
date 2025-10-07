// رقم واتسابك
const WHATSAPP_NUMBER = "201111592379";

// البيانات الخاصة بالخدمات
const SERVICES = [
  {id:'web', title:{ar:'تصميم مواقع ويب', en:'Web Design'}, desc:{ar:'مواقع احترافية ومتجاوبة.', en:'Professional and responsive websites.'}, price:50},
  {id:'python', title:{ar:'بايثون & أوتوميشن', en:'Python & Automation'}, desc:{ar:'سكربتات وأدوات أتمتة.', en:'Automation scripts and tools.'}, price:30},
  {id:'logo', title:{ar:'تصميم لوجو وهوية', en:'Logo & Branding'}, desc:{ar:'هوية بصرية كاملة.', en:'Full brand identity design.'}, price:40},
  {id:'blog', title:{ar:'إنشاء مدونات ووردبريس', en:'WordPress Blog Setup'}, desc:{ar:'مدونات مهيأة للسيو.', en:'SEO-optimized WordPress blogs.'}, price:60},
  {id:'app', title:{ar:'تطوير تطبيقات موبايل', en:'Mobile App Development'}, desc:{ar:'تطبيقات أندرويد وiOS.', en:'Android & iOS mobile apps.'}, price:120},
  {id:'arduino', title:{ar:'برمجة أردوينو', en:'Arduino Programming'}, desc:{ar:'مشروعات أردوينو مخصصة.', en:'Custom Arduino projects.'}, price:null}
];

let currentLang = localStorage.getItem('lang') || 'ar';

// ========================= الترجمة =========================
function setLang(lang){
  currentLang = lang;
  localStorage.setItem('lang', lang);
  applyLang();
}

function applyLang(){
  document.documentElement.lang = currentLang;
  document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
  
  const t = {
    heroTitle: {ar:'عروض محدودة — خصم 70% على جميع الخدمات', en:'Limited Offers — 70% Off All Services'},
    heroSub: {ar:'أسعار مُخفضة لفترة محدودة. جودة عالية وسرعة في التسليم.', en:'Discounted prices for a limited time. High quality and fast delivery.'},
    servicesTitle: {ar:'خدماتنا', en:'Our Services'},
    footerText: {ar:'© 2025 خدماتك — Khadamatak', en:'© 2025 Khadamatak — All Rights Reserved'}
  };
  for(let key in t){
    const el = document.getElementById(key);
    if(el) el.textContent = t[key][currentLang];
  }

  renderServices();
}

// ========================= عرض الخدمات =========================
function renderServices(){
  const container = document.getElementById('servicesContainer');
  container.innerHTML = '';
  SERVICES.forEach(s=>{
    const col = document.createElement('div'); col.className='col-md-6 col-lg-4 mb-4';
    const title = s.title[currentLang];
    const desc = s.desc[currentLang];
    const priceText = s.price===null ? (currentLang==='ar'?'حسب المشروع':'Depends on project')
      : `<span class="price-old">${s.price} جنيه</span> <span class="service-price">${Math.round(s.price*0.3)} جنيه</span> <small class="text-success">(خصم 70%)</small>`;
    col.innerHTML = `
      <div class="card card-service">
        <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=900&q=80" class="service-img" alt="${title}">
        <div class="service-body">
          <h5>${title}</h5>
          <p>${desc}</p>
          <p>${priceText}</p>
          <button class="btn btn-sm btn-primary" onclick="openOrderModal('${s.id}')">${currentLang==='ar'?'اطلب الآن':'Order Now'}</button>
        </div>
      </div>`;
    container.appendChild(col);
  });
}

// ========================= واتساب =========================
function sendToWhatsApp(text){
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  window.open(url, '_blank');
}

// ========================= النماذج =========================
function openOrderModal(id){
  const s = SERVICES.find(x=>x.id===id);
  const html = `
    <div class="modal-header"><h5 class="modal-title">${s.title[currentLang]}</h5><button type="button" class="btn-close" data-bs-dismiss="modal"></button></div>
    <div class="modal-body">
      <p>${s.desc[currentLang]}</p>
      <form id="orderForm">
        <input class="form-control mb-2" id="o_name" placeholder="${currentLang==='ar'?'الاسم الكامل':'Full Name'}" required>
        <input class="form-control mb-2" id="o_email" placeholder="${currentLang==='ar'?'البريد الإلكتروني':'Email'}" type="email">
        <textarea class="form-control mb-2" id="o_details" rows="3" placeholder="${currentLang==='ar'?'صف طلبك':'Describe your request'}" required></textarea>
        <div class="d-grid"><button class="btn btn-primary" type="submit">${currentLang==='ar'?'إرسال':'Send'}</button></div>
      </form>
    </div>`;
  showModal(html, ()=>{
    document.getElementById('orderForm').addEventListener('submit', e=>{
      e.preventDefault();
      const name = document.getElementById('o_name').value;
      const email = document.getElementById('o_email').value;
      const details = document.getElementById('o_details').value;
      const msg = `${currentLang==='ar'?'طلب جديد':'New Order'}:\n${currentLang==='ar'?'الاسم':'Name'}: ${name}\n${currentLang==='ar'?'البريد':'Email'}: ${email}\n${currentLang==='ar'?'الخدمة':'Service'}: ${s.title[currentLang]}\n${currentLang==='ar'?'التفاصيل':'Details'}: ${details}`;
      sendToWhatsApp(msg);
      bootstrap.Modal.getInstance(document.querySelector('.modal')).hide();
    });
  });
}

function showModal(contentHtml, onShow){
  const modalContent = document.getElementById('siteModalContent');
  modalContent.innerHTML = contentHtml;
  const modalEl = document.getElementById('siteModal');
  const modal = new bootstrap.Modal(modalEl);
  modal.show();
  if(onShow) setTimeout(onShow,50);
}

document.addEventListener('DOMContentLoaded', ()=>{
  applyLang();
  document.getElementById('helpBtn').addEventListener('click', ()=>{
    const html = `
      <div class="modal-header"><h5 class="modal-title">${currentLang==='ar'?'تواصل معنا':'Contact Us'}</h5><button type="button" class="btn-close" data-bs-dismiss="modal"></button></div>
      <div class="modal-body">
        <form id="msgForm">
          <input class="form-control mb-2" id="m_name" placeholder="${currentLang==='ar'?'الاسم الكامل':'Full Name'}" required>
          <input class="form-control mb-2" id="m_email" placeholder="${currentLang==='ar'?'البريد الإلكتروني':'Email'}" type="email">
          <textarea class="form-control mb-2" id="m_message" rows="4" placeholder="${currentLang==='ar'?'اكتب رسالتك...':'Type your message...'}" required></textarea>
          <div class="d-grid"><button class="btn btn-primary" type="submit">${currentLang==='ar'?'إرسال الرسالة':'Send Message'}</button></div>
        </form>
      </div>`;
    showModal(html, ()=>{
      document.getElementById('msgForm').addEventListener('submit', e=>{
        e.preventDefault();
        const name = document.getElementById('m_name').value;
        const email = document.getElementById('m_email').value;
        const message = document.getElementById('m_message').value;
        const msg = `${currentLang==='ar'?'رسالة جديدة':'New Message'}:\n${currentLang==='ar'?'الاسم':'Name'}: ${name}\n${currentLang==='ar'?'البريد':'Email'}: ${email}\n${currentLang==='ar'?'الرسالة':'Message'}:\n${message}`;
        sendToWhatsApp(msg);
        bootstrap.Modal.getInstance(document.querySelector('.modal')).hide();
      });
    });
  });
});
