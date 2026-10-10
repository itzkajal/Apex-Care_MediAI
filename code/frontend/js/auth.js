const AUTH_API = window.__API_BASE__ || "/api";
async function authRequest(path, payload) {
  const res=await fetch(`${AUTH_API}${path}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(payload)});
  const data=await res.json().catch(()=>({})); if(!res.ok)throw new Error(data.message||`HTTP ${res.status}`); return data;
}
const registerForm=document.getElementById("registerForm");
if(registerForm)registerForm.addEventListener("submit",async e=>{
  e.preventDefault();const m=document.getElementById("message");
  try{const d=await authRequest("/register",{name:document.getElementById("name").value,email:document.getElementById("email").value,password:document.getElementById("password").value});localStorage.setItem("token",d.token);location.href="dashboard.html";}
  catch(err){m.textContent=err.message;}
});
const loginForm=document.getElementById("loginForm");
if(loginForm)loginForm.addEventListener("submit",async e=>{
  e.preventDefault();const m=document.getElementById("message");
  try{const d=await authRequest("/login",{email:document.getElementById("email").value,password:document.getElementById("password").value});localStorage.setItem("token",d.token);location.href="dashboard.html";}
  catch(err){m.textContent=err.message;}
});
const logout=document.getElementById("logout");
if(logout)logout.addEventListener("click",e=>{e.preventDefault();localStorage.removeItem("token");location.href="index.html";});
