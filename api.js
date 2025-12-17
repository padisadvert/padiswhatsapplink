// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-analytics.js";
import { ref,getDatabase,push,onChildAdded } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD34ORTsJdUuFdIDbUlVGRNUilxx6NuwxA",
  authDomain: "whatsapp-group-b471a.firebaseapp.com",
  databaseURL: "https://whatsapp-group-b471a-default-rtdb.firebaseio.com",
  projectId: "whatsapp-group-b471a",
  storageBucket: "whatsapp-group-b471a.firebasestorage.app",
  messagingSenderId: "749575528004",
  appId: "1:749575528004:web:69223c94613a7ec4032611",
  measurementId: "G-W0K6M9EKVM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app);
const chatRef = ref(db,"messages");
let y = 0;

document.getElementById("share").addEventListener("click", () => {
  y++;
  let pageurl = encodeURIComponent(window.location.href);
  let whatsappurl = `join me now on padis Whatsapp link, if you are looking for:<br>1. A way to promote you group /or/ <br>2. A Whatsapp group of a particular category to join. <b>Let us grow together</b><br><br>https://wa.me/?text=${pageurl}`
  window.open(whatsappurl, "_blank");
})

document.getElementById("create").addEventListener("click", () => {
  let whatsapplink = document.getElementById("whatsapplink").value;
  let groupname = document.getElementById("groupname").value;
  let categlory = document.getElementById("categlory").value;
  if (y < 1) {
    alert("click on the share button first");
  } else {
    y--;
    if(whatsapplink && groupname && categlory){
      push(chatRef,{whatsapplink,groupname,categlory});
      document.getElementById("whatsapplink").value = "";
      document.getElementById("groupname").value = "";
    }
  }
})

onChildAdded(chatRef,(data)=>{
    const groupinfo = data.val();
    let groupbox = document.createElement("div");
    groupbox.classList.add("groupbox");
    let grouplogo = document.createElement("img");
    grouplogo.classList.add("grouplogo");
    let num = [0, 1, 2,]
    let yes = ["/FB_IMG_17638093410685395.jpg", "/FB_IMG_17638093467798098.jpg", "/FB_IMG_17638093968677877.jpg"];
    
    let value = Math.floor(Math.random() * num.length);
    
    grouplogo.src = yes[value]
    let groupnames = document.createElement("span");
    groupnames.classList.add("groupname");
    groupnames.textContent = groupinfo.groupname;
    let joinbtn = document.createElement("a");
    joinbtn.classList.add("join");
    joinbtn.href = groupinfo.whatsapplink;
    groupbox.append(grouplogo);
    groupbox.append(groupnames);
    groupbox.append(joinbtn);
    document.getElementById("All").prepend(groupbox);
    document.querySelectorAll(".groups").forEach((grp)=>{
      if (grp == groupinfo.categlory) {
        grp.prepend(groupbox);
      } else {
        return;
      }
    })
})