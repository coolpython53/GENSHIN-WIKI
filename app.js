
const API_URL = "https://script.google.com/macros/s/AKfycbxPCEBLslQVpHCJAJeal6ao-KuR9VRaaCyfL1FekDG9npiHBXurFzY8kgfFufzMq69yVg/exec";

let currentPage = null;
let user = null;

/* ================= LOGIN ================= */
async function login() {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({
      action: "login",
      email: email.value,
      password: password.value
    })
  });

  const data = await res.json();

  if (data.success) {
    user = data;
    localStorage.setItem("user", JSON.stringify(user));

    document.getElementById("loginBox").classList.add("hidden");
    document.getElementById("wiki").classList.remove("hidden");

    loadPages();
  } else {
    alert("Login failed");
  }
}

/* ================= SIGNUP ================= */
async function signup() {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({
      action: "signup",
      username: "user",
      email: email.value,
      password: password.value
    })
  });

  const data = await res.json();
  alert(JSON.stringify(data));
}

/* ================= LOAD PAGES ================= */
async function loadPages() {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({action:"listPages"})
  });

  const data = await res.json();

  const pagesDiv = document.getElementById("pages");
  pagesDiv.innerHTML = "";

  data.pages.forEach(p => {
    const div = document.createElement("div");
    div.innerText = p.title;

    div.onclick = () => openPage(p.id, p.title);

    pagesDiv.appendChild(div);
  });
}

/* ================= OPEN PAGE ================= */
async function openPage(id, title) {
  currentPage = id;

  const res = await fetch(API_URL, {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({
      action:"getPage",
      id
    })
  });

  const data = await res.json();

  document.getElementById("title").innerText = title;
  document.getElementById("editor").value = data.page.content;

  if (user.role !== "admin") {
    document.getElementById("editor").disabled = true;
  } else {
    document.getElementById("editor").disabled = false;
  }
}

/* ================= SAVE PAGE ================= */
async function savePage() {
  if (!user || user.role !== "admin") return;

  await fetch(API_URL, {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({
      action:"updatePage",
      id: currentPage,
      content: document.getElementById("editor").value,
      editor: user.email
    })
  });

  alert("Saved");
}

/* ================= DELETE PAGE ================= */
async function deletePage() {
  if (!user || user.role !== "admin") return;

  await fetch(API_URL, {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({
      action:"deletePage",
      id: currentPage,
      role: user.role
    })
  });

  alert("Deleted");
  loadPages();
}

/* ================= AUTO LOGIN ================= */
window.onload = () => {
  const u = localStorage.getItem("user");
  if (u) {
    user = JSON.parse(u);
    document.getElementById("loginBox").classList.add("hidden");
    document.getElementById("wiki").classList.remove("hidden");
    loadPages();
  }
};

function logout() {
  localStorage.removeItem("user");
  location.reload();
}
