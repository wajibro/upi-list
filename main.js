const MAX_NOTES   = 10; // Jumlah maksimal catatan yang dapat disimpan
const MAX_LENGTH  = 25; // Panjang maksimal karakter tiap catatan

const input_text  = document.getElementById('input_text');
const post_button = document.getElementById('save');
const content_box = document.querySelector('.content');
const alertPop    = document.getElementById('alertPop');

const data_notes = [];
const data_conditions = [];

const data_gap = 100;

if(localStorage.length != 0){
    for(i=0; i<localStorage.length/2; i++){
        data_notes[i]       = get_item(i);
        data_conditions[i]  = get_item(i+data_gap);
    }
} 

post_button.addEventListener('click', function(){
    if(input_text.value == ''){
        pop_up("kosong");
    }else if(input_text.value.length > MAX_LENGTH){
        pop_up("terlalu_panjang");
    }else if(data_notes.length == MAX_NOTES){
        pop_up("catatan_penuh");
    }else{
        post_add();
    }
})

function post_add(){
    data_notes.push(input_text.value);
    data_conditions.push(false);
    input_text.value = '';
    render();
}

function post_remove(n){
    data_notes.splice(n, 1);
    data_conditions.splice(n, 1);
    render();
}

function checklist(n){
    data_conditions[n] = !data_conditions[n];
    render();
}

//======================
function render(){
    localStorage.clear();
    for(i=0; i<data_notes.length; i++){
        set_item(i, data_notes[i]);
        set_item(i+data_gap, data_conditions[i]);
    }

    content_box.innerHTML = '';
    for(i=MAX_NOTES-1; i>=0; i--){
        content_box.innerHTML += `<div class='blank'/>`;
        if(data_notes[i] !== undefined){
            document.querySelector('.content > .blank').innerHTML +=`
                <span>
                    <input style="cursor=pointer;" type="checkbox" id="${i}" onclick=checklist(${i})>
                    ${data_notes[i]}
                </span>
                <div onclick=post_remove(${i})>
                    x
                </div>`;

            if(data_conditions[i] == true){
                document.getElementById(i).setAttribute('checked', 'true');
                document.querySelector('.content > .blank').setAttribute('class', 'set');
            }else{
                document.getElementById(i).removeAttribute('checked');
                document.querySelector('.content > .blank').removeAttribute('class');
            }
        }
    }
}

//======================
function get_item(n){
    return localStorage.getItem(n);
}

function set_item(n, value){
    localStorage.setItem(n, value);
}
//======================
const teks_kosong = `
<div>
    <div>x</div>
    <h1>Tidak boleh kosong</h1>
    <button onclick="remove_pop_up()">OK</button>
</div>`;
const teks_terlalu_panjang = `
<div>
    <div>x</div>
    <h1>Kolom tidak bisa memuat kalimat ini</h1>
    <button onclick="remove_pop_up()">OK</button>
</div>`;
const teks_catatan_penuh = `
<div>
    <div>x</div>
    <h1>Catatan sudah melebihi batas <br> Maksimal 10</h1>
    <button onclick="remove_pop_up()">OK</button>
</div>`;
//======================
function pop_up(x){
    switch(x){
        case "kosong":
            document.getElementById('alertPop').innerHTML += teks_kosong;
            document.getElementById('alertPop').setAttribute('class', 'show');
            break;
        case "terlalu_panjang":
            document.getElementById('alertPop').innerHTML += teks_terlalu_panjang;
            document.getElementById('alertPop').setAttribute('class', 'show');
            break;
        case "catatan_penuh":
            document.getElementById('alertPop').innerHTML += teks_catatan_penuh;
            document.getElementById('alertPop').setAttribute('class', 'show');
            break;
    }
}

function remove_pop_up(){
    document.getElementById('alertPop').innerHTML = '';
    document.getElementById('alertPop').removeAttribute('class');
}

render();