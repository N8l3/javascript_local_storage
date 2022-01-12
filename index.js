var id = "a";
let key = 'emp';


var msg = document.getElementById('msg');

function getEmpData() {
  let arr = JSON.parse(localStorage.getItem(key));
  return arr;
}

function setEmpData(arr) {
  localStorage.setItem(key, JSON.stringify(arr));
}


function dataSubmit() {
  let name = document.getElementById("empName").value;
  let age = document.getElementById("empAge").value;
  let ename = document.getElementById('Name').value;
  let eage = document.getElementById('Age').value;
  let empid = document.getElementById('empID').value;


  if (id == "a") {
    let arr = getEmpData();
    if (arr == null) {
      let data = [{
        empid,
        name,
        age,
      }, ];
      setEmpData(data);
    } else {
      arr.push({
        empid,
        name,
        age,
      });
      setEmpData(arr);
    }
  } else {
    let arr = getEmpData();
    arr[id].name = ename;
    arr[id].age = eage;
    setEmpData(arr);
    event.preventDefault();
  }
}

function displayData() {
  let arr = getEmpData();
  if (arr != null) {
    let data = "";
    count = 0;
    for (i in arr) {
      data =
        data +
        `<tr><td>${i}</td><td>${arr[i].empid}</td><td class="text-capitalize">${arr[i].name}</td><td>${arr[i].age}</td><td>
        <a href="javascript:void(0)" class="edit fa fa-edit text-info" data-toggle="modal"  data-target="#editModal" onclick="editData(${i})">&nbsp;Edit<a>
        
        </td><td><a  href="javascript:void(0)" 
        class="fa fa-trash text-danger" onclick="deleteData(${i})">&nbsp;Delete<a></td></tr>`;
      count++;
    }
    document.getElementById("root").innerHTML = data;
  }
}

function deleteData(rid) {
  let arr = getEmpData();
  arr.splice(rid, 1);
  setEmpData(arr);
  displayData();
  location.reload();
}

function editData(nid) {
  id = nid;
  let arr = getEmpData();
  document.getElementById("Name").value = arr[nid].name;
  document.getElementById("Age").value = arr[nid].age;
}


function reset() {
  document.getElementById("search").value = "";
  msg.innerHTML = "";
  document.getElementById("page").style.display = "flex";
  document.getElementById('myTable').style.display = "table";
  displayData();
}

function myFunction() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("search");
  filter = input.value.toUpperCase();
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[2];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
        msg.style.color = "RED";
        document.getElementById("page").style.display = "none";
        document.getElementById('msg').innerHTML = "No Data Found";
        table.style.display = "none";
      }
    }
  }
}

function page() {
  let amt = document.getElementById('select').value;

  let arr = getEmpData();
  let pgno = 0;


  let data = '';
  if (arr.length >= amt) {
    for (let i = 0; i < pgno + amt; i++) {
      data =
        data +
        `<tr><td>${i}</td><td>${arr[i].empid}</td><td class="text-capitalize">${arr[i].name}</td><td>${arr[i].age}</td><td>
        <a href="javascript:void(0)" class="edit fa fa-edit text-info" data-toggle="modal"  data-target="#editModal" onclick="editData(${i})">&nbsp;Edit<a>
        
        </td><td><a  href="javascript:void(0)" 
        class="fa fa-trash text-danger" onclick="deleteData(${i})">&nbsp;Delete<a></td></tr>`;

    }
    document.getElementById("root").innerHTML = data;
  } else {
    displayData();
    document.getElementById('msg').style.color = "Green";
    document.getElementById('msg').innerHTML = "Displaying All The Data";
  }

}

var pgn = 0;

let first = document.getElementById('first');
let prev = document.getElementById('pev');
let next = document.getElementById('nxt');
let last = document.getElementById('last');

function nextBtn() {
  var arr = getEmpData();

  var pno = document.getElementById('select').value;
  var amt = parseInt(pno);
  let data = "";

  pgn == arr.length - amt ? (pgn = 0) : (pgn += amt);

  if (pgn <= arr.length) {
    try {

      for (let i = pgn; i < pgn + amt; i++) {

        data =
        data +
        `<tr><td>${i}</td><td>${arr[i].empid}</td><td class="text-capitalize">${arr[i].name}</td><td>${arr[i].age}</td><td>
        <a href="javascript:void(0)" class="edit fa fa-edit text-info" data-toggle="modal"  data-target="#editModal" onclick="editData(${i})">&nbsp;Edit<a>
        
        </td><td><a  href="javascript:void(0)" 
        class="fa fa-trash text-danger" onclick="deleteData(${i})">&nbsp;Delete<a></td></tr>`;
     

      }
      document.getElementById("root").innerHTML = data;
    } catch (error) {

      msg.innerHTML = '<span class="text-warning">You are on last Page.</span>';
    }
  }
}

function prevBtn() {
  var arr = getEmpData();

  var pno = document.getElementById('select').value;
  var amt = parseInt(pno);
  let data = "";
  msg.innerHTML='';

  pgn == 0 ? (pgn = arr.length - amt) : (pgn -= amt);

  try {

    for (let i = pgn; i < pgn + amt; i++) {

      data =
      data +
      `<tr><td>${i}</td><td>${arr[i].empid}</td><td class="text-capitalize">${arr[i].name}</td><td>${arr[i].age}</td><td>
      <a href="javascript:void(0)" class="edit fa fa-edit text-info" data-toggle="modal"  data-target="#editModal" onclick="editData(${i})">&nbsp;Edit<a>
      
      </td><td><a  href="javascript:void(0)" 
      class="fa fa-trash text-danger" onclick="deleteData(${i})">&nbsp;Delete<a></td></tr>`;
    

    }
    document.getElementById("root").innerHTML = data;
  } catch (error) {
    msg.innerHTML='';
    displayData();
  }
}

function firstBtn() {
  var arr = getEmpData();

  var pno = document.getElementById('select').value;
  var amt = parseInt(pno);
  let data = "";
  msg.innerHTML='';

  pgn = 0 ;

  try {

    for (let i = pgn; i < pgn + amt; i++) {

      data =
      data +
      `<tr><td>${i}</td><td>${arr[i].empid}</td><td class="text-capitalize">${arr[i].name}</td><td>${arr[i].age}</td><td>
      <a href="javascript:void(0)" class="edit fa fa-edit text-info" data-toggle="modal"  data-target="#editModal" onclick="editData(${i})">&nbsp;Edit<a>
      
      </td><td><a  href="javascript:void(0)" 
      class="fa fa-trash text-danger" onclick="deleteData(${i})">&nbsp;Delete<a></td></tr>`;
      
    }
    document.getElementById("root").innerHTML = data;

  } catch (error) {
    msg.innerHTML='';
    displayData();
  }
}

function lastBtn() {
  var arr = getEmpData();

  var pno = document.getElementById('select').value;
  var amt = parseInt(pno);
  let data = "";
  msg.innerHTML='';

  pgn = arr.length - amt;

  try {

    for (let i = pgn; i < pgn + amt; i++) {

      data =
        data +
        `<tr><td>${i}</td><td>${arr[i].empid}</td><td class="text-capitalize">${arr[i].name}</td><td>${arr[i].age}</td><td>
        <a href="javascript:void(0)" class="edit fa fa-edit text-info" data-toggle="modal"  data-target="#editModal" onclick="editData(${i})">&nbsp;Edit<a>
        
        </td><td><a  href="javascript:void(0)" 
        class="fa fa-trash text-danger" onclick="deleteData(${i})">&nbsp;Delete<a></td></tr>`;
     
    }
    document.getElementById("root").innerHTML = data;

  } catch (error) {
    msg.innerHTML='';
    displayData();
  }
}


// 

$(document).ready(function () {
  $(".edit").click(function () {
    $("#edit-data").show();
  });
});

$(document).ready(function () {
  $(".close").click(function () {
    $("#edit-data").hide();
  });
});


// 