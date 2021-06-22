// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBBIftGf2_uFyc3fXNsHWiiax-hR3awuL0",
  authDomain: "agenciesthatdontpay.firebaseapp.com",
  projectId: "agenciesthatdontpay",
  storageBucket: "agenciesthatdontpay.appspot.com",
  messagingSenderId: "845627146040",
  appId: "1:845627146040:web:cd3c443de9630ec0418bcd",
  measurementId: "G-BEXGWTM17M"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  const db = firebase.firestore();
  db.settings({timestampsInSnapshots:true});

  const contactList = document.querySelector('#contact-list');
  const form = document.querySelector('#add-contact-form');





  //creats the list
  function renderContacts(doc){
 
    let li = document.createElement('li');
    let name = document.createElement('h5');
    let newname = document.createElement('p');
    let cross = document.createElement('div');

    li.setAttribute('data-id', doc.id);
    newname.textContent = doc.data().newname;
    name.textContent = doc.data().name;
    cross.textContent = 'x';

    li.appendChild(name);
    li.appendChild(newname);
    li.appendChild(cross);
    //class
    li.className = 'list-group-item';

    contactList.appendChild(li);


    //Deleting data
    cross.addEventListener('click', (e) => {
            e.stopPropagation();
            let id = doc.id;
            db.collection('contactlist').doc(id).delete();
            console.log(id)
          
            
            
    });
  }

  
//getting data
  db.collection('contactData').get().then((snapshot)=>{
    snapshot.docs.forEach(doc=>{
      //console.log(doc.data());
      //renderContacts(doc);
    });
  })



  
//saving data
  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    db.collection('contactData').add({
      name: form.name.value,
      newname: form.newname.value
    });
    form.name.value = '';
    form.newname.value = '';
  })
  


//live updates
db.collection('contactData').orderBy('name').onSnapshot(snapshot => {
  let changes = snapshot.docChanges();
  changes.forEach(change => {
    if(change.type == 'added'){
      renderContacts(change.doc);
    } else if(change.type == 'removed'){
        let li = contactList.querySelector('[data-id=' + change.doc.id +']');
        contactList.removeChild(li);
      }
    
  })
})



 
/*

  var docRef = db.collection("contactData").doc("DGO6pti6HOnituP6Tv93");

  docRef.get().then((doc) => {
      if (doc.exists) {
          console.log("Document data:", doc.data());
      } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
      }
  }).catch((error) => {
      console.log("Error getting document:", error);
  });
  



var citiesRef = db.collection("cities");

db.collection("cities").where("capital", "==", true)
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
        });
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });

  */