let tbody = document.getElementById('tableBody');
let trintiModalas = document.querySelector('.modalo_fonas');
let redaguoiModala = document.querySelector('.redaguoti_fona');
let redaguotiMygtukas = document.querySelector ('.edit-yes');
let nepatvirtintiTrynimo = document.getElementById('nepatvirtinti-trynimo');
let nepatvirtintiRedagavimo = document.querySelector('.edit-no');
let patvirtintiTrynima = document.getElementById('patvirtinti_trynima');

let editData = document.getElementById('edit-data');
let editNumeris = document.getElementById('edit-numeris');
let editKelias = document.getElementById('edit-kelias');
let editLaikas = document.getElementById('edit-laikas');
let submit = document.getElementById('submit');

// indeksai
var deleteIndex;
var editIndex;

// ............................................................................................................
// LENTELE
//  Padaryti, kad suvedus duomenis atsirastu lentele
// Kad nepersikrautu puslapis
let forma = document.getElementById('forma');
forma.addEventListener('submit', function(e){
    e.preventDefault();
});
submit.addEventListener('click', function(){
    const data = document.querySelector("#data").value;
    const numeris = document.querySelector("#numeris").value;
    const kelias = document.querySelector("#kelias").value;
    const laikas = document.querySelector("#laikas").value;
    
//    iskrenta perspejimo mygtukas, kad nesuvesti duomenys
    if (data <= 0 || numeris <= 0 || kelias <= 0 || laikas <= 0) {
        alert("Prašau užpildyti tuščius laukus.");
        return false;};
        const arrDate = [data, numeris, kelias, laikas];

const tr = document.createElement("tr");

for (let i = 0; i < arrDate.length; i++) {
  const td = document.createElement("td");
  const text = document.createTextNode(arrDate[i]);
  td.appendChild(text);
  tr.appendChild(td);
}
// idedame mygtukus trinti ir redaguoti, kad suveduslentele atsirastu ir mygtukai
tr.appendChild(mygtukas('Trinti','delet'));
tr.appendChild(mygtukas('Redaguoti','edit'));
tableBody.appendChild(tr);


document.querySelector("#data").value = "";
document.querySelector("#numeris").value = "";
document.querySelector("#kelias").value = "";
document.querySelector("#laikas").value = "";

});

// .........................................................................................................
// MASYVAS

const duomenys = [
    [ '2020.12.22', 'JFA740', 4500, 740],
    [ '2020.12.20', 'KBN454', 2548254, 58655],
    [ '2019.12.12', 'HGJ456', 25865, 252],
    [ '2020.15.45', 'GFJ5020', 54785, 5665455]
];
// GERAS PAVIZDYS KAIP VEIKIA FUNKCIJOS SUKURTI GLOBALUs MYGTUKAi
function mygtukas (tekstas,klase){
var button = document.createElement('button');
button.innerHTML = tekstas; 
button.classList.add(klase);
return button;
};
// FUNKCIJA SUKELTI MASYVO DUOMENYS
function rasyti (){
    tbody.innerHTML = '';
    // CIKLAS< KAD PAIMTU VISUS MASYVO DUOMENYS
    for ( let i = 0; i< duomenys.length; i++){
        var tr = document.createElement('tr');

      for ( let j = 0; j< duomenys[i].length; j++){
          var td = document.createElement('td');
          td.innerHTML = duomenys[i][j];
          tr.appendChild (td);

      };
    //   sukuriame globalisus mygtukus
    tr.appendChild(mygtukas('Trinti','delet'));
    tr.appendChild(mygtukas('Redaguoti','edit'));
      tbody.appendChild(tr);
    };
};

rasyti();


// TRYNIMO MODALO PRADZIA
// Atidaryti delet modala
tbody.addEventListener('click', function(e){
    if(e.target.classList.contains('delet')){
        trintiModalas.style.display = 'block'; 
        deleteIndex = e.target.parentElement.rowIndex - 1;

    }
});
// paspaudus modale mygtuka NE dingsta modalas
nepatvirtintiTrynimo.addEventListener('click',function(){
    trintiModalas.style.display = 'none';
});

// paspaudus Taip padaryti, kad issitrina eilute
patvirtintiTrynima.addEventListener('click', function(e){
    duomenys.splice(deleteIndex, 1);
    rasyti();
    trintiModalas.style.display = 'none';

});

// TRYNIMO MODALO PABAIGA

// Atsidaryti Redaguoti modala
tbody.addEventListener('click', function(e){
    if(e.target.classList.contains('edit')){
        redaguoiModala.style.display = 'block'; 
        editIndex = e.target.parentElement.rowIndex - 1;
        editData.value = duomenys[editIndex][0];
        editNumeris.value = duomenys[editIndex][1];
        editKelias.value = duomenys[editIndex][2];
        editLaikas.value = duomenys[editIndex][3];

    }
});
// paspaudus modale redaguoti mygtuka NE dingsta modalas
nepatvirtintiRedagavimo.addEventListener('click',function(){
    redaguoiModala.style.display = 'none';
});

// Redaguojam elementa
redaguotiMygtukas.addEventListener('click',function(){
    const redaguotiDuomenis = [editData.value, editNumeris.value, parseInt(editKelias.value), parseInt(editLaikas.value)];
    duomenys.splice(editIndex, 1 , redaguotiDuomenis);
    rasyti();
    redaguoiModala.style.display = 'none';
});


