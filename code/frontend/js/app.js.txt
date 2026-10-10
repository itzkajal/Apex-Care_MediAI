const API_BASE = window.__API_BASE__ || "/api";

async function api(path, options = {}) {
  const headers = {"Content-Type":"application/json", ...(options.headers || {})};
  const token = localStorage.getItem("token");
  if (token) headers.Authorization = `Bearer ${token}`;
  const res = await fetch(`${API_BASE}${path}`, {...options, headers});
  const data = await res.json().catch(()=>({}));
  if (!res.ok) throw new Error(data.message || `HTTP ${res.status}`);
  return data;
}

async function loadCards() {
  const doctors = document.getElementById("doctors");
  if (doctors) {
    try {
      const data = await api("/doctors");
      doctors.innerHTML = data.map(d=>`<article class="card"><h3>${escapeHtml(d.name)}</h3><p>${escapeHtml(d.specialization)}</p><p>Department: ${escapeHtml(d.department_name)}</p></article>`).join("");
    } catch(e){doctors.innerHTML=`<p class="message">${escapeHtml(e.message)}</p>`;}
  }
  const departments = document.getElementById("departments");
  if (departments) {
    try {
      const data = await api("/departments");
      departments.innerHTML = data.map(d=>`<article class="card"><h3>${escapeHtml(d.name)}</h3><p>${escapeHtml(d.description || "")}</p><p>Hours: ${escapeHtml(d.timings || "See hospital desk")}</p></article>`).join("");
    } catch(e){departments.innerHTML=`<p>${escapeHtml(e.message)}</p>`;}
  }
}

async function contactForm() {
  const form=document.getElementById("contactForm"); if(!form)return;
  form.addEventListener("submit",async e=>{
    e.preventDefault(); const status=document.getElementById("status");
    try{await api("/contact",{method:"POST",body:JSON.stringify({name:form.name.value,email:form.email.value,message:form.message.value})});status.textContent="Message submitted.";form.reset();}
    catch(err){status.textContent=err.message;}
  });
}
function escapeHtml(v){return String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]));}
document.addEventListener("DOMContentLoaded",()=>{loadCards();contactForm();});
