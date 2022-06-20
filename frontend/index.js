function DataModel() {
  this.columnNames = [
    "name",
    "age",
    "gender",
    "address",
    "title",
    "diagnosis",
    "doctor",
    "covid",
  ];

  this.isLoaded = false;
  this.data;
  this.id;
  this.load = (res) => {
    this.data = res;
  };
  this.removeData = (id) => {
    if (id) {
      this.data = this.data.filter((obj) => {
        if (id === obj.id) {
          return false;
        } else {
          return true;
        }
      });
      if (!this.data?.length) {
        this.isLoaded = false;
      }
    } else {
      this.isLoaded = false;
      this.data = [];
    }
  };
}
var dataObject = new DataModel();
function onRowSelect(data) {
  if (dataObject.id === data.currentTarget.id) {
    return;
  }
  dataObject.id = data.currentTarget.id;

  if (document.querySelectorAll(".details-row").length) {
    for (const node of document.querySelectorAll(".details-row")) {
      node.style.backgroundColor = "transparent";
    }
  }
  document.getElementById("form").style.display = "block";
  document.getElementById(data.currentTarget.id).style.backgroundColor =
    "lightgrey";

  let req = new XMLHttpRequest();
  req.responseType = "application/json";
  req.onload = () => {
    let details = JSON.parse(req.responseText);
    Object.keys(details).forEach((key) => {
      let node = document.getElementById(key);
      if (node) {
        node.value = details[key];
      }
    });
    document.getElementById("saveButton").addEventListener("click", () => {
      saveDetails();
    });
  };
  req.open(
    "Get",
    "http://localhost:8085/api/patients/" + data.currentTarget.id
  );
  req.send();
}
function saveDetails() {
  let name = document.getElementById("name").value;
  let age = document.getElementById("age").value;
  let address = document.getElementById("address").value;
  let gender = document.getElementById("gender").value;
  let covid = document.getElementById("covid").value;
  let doctor = document.getElementById("doctor").value;
  let diagnosis = document.getElementById("diagnosis").value;
  let req = new XMLHttpRequest();
  req.responseType = "application/json";
  let payload = {
    title: null,
    name: name,
    age: age,
    gender: gender,
    address: address,
    diagnosis: diagnosis,
    doctor: doctor,
    covid: covid,
  };
  if (dataObject.id) {
    req.open("Put", "http://localhost:8085/api/patients/" + dataObject.id);
    dataObject.columnNames.forEach((name) => {
      let td = document.getElementById("td-" + name + dataObject.id);
      if (td && payload[name]) {
        td.innerText = payload[name];
      }
    });
  } else {
    req.onload = () => {
      let newData = JSON.parse(req.responseText);
      addTabelRow(newData);
      onRowSelect({
        currentTarget: {
          id: newData.id,
        },
      });
    };
    req.open("Post", "http://localhost:8085/api/patients");
  }
  req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  req.send(JSON.stringify(payload));
  document.getElementById("successtoast").innerText = "Updated Successfully";
  document.getElementById("successtoast").style.display = "block";
  setTimeout(() => {
    document.getElementById("successtoast").innerText = "";

    document.getElementById("successtoast").style.display = "none";
  }, 2000);
}
function remove(id) {
  if (id) {
    document.getElementById(id).remove();
    dataObject.removeData(id);
    let req = new XMLHttpRequest();
    req.responseType = "application/json";
    req.onload = () => {
      console.log("deleted");
    };
    req.open("Delete", "http://localhost:8085/api/patients/" + id);
    req.send();
  } else {
    const li = document.querySelectorAll(".details-row");
    for (let i = 0; i < li.length; i++) {
      l = li[i];
      l.remove();
    }
    dataObject.removeData();
    document.getElementById("table").style.display = "none";
  }
}
function loadPatients() {
  if (!dataObject.isLoaded) {
    document.getElementById("table").style.display = "table";

    document.getElementById("add-btn").style.display = "block";
    let req = new XMLHttpRequest();
    req.responseType = "application/json";
    req.onload = () => {
      dataObject.isLoaded = true;
      let data = JSON.parse(req.responseText);
      dataObject.load(data);
      data.forEach((element) => {
        addTabelRow(element);
      });
    };
    req.open("Get", "http://localhost:8085/api/patients");
    req.send();
  }
}
function deletePatiend(data) {
  remove(data.currentTarget.id.replace("btn", ""));
  addClicked();
}
function addTabelRow(element) {
  let tr = document.createElement("tr");
  tr.id = element.id;
  tr.className = "details-row";
  tr.addEventListener("click", onRowSelect);
  let t1 = document.createElement("td");
  t1.id = "td-id" + element.id;
  t1.innerText = element.id;
  let t2 = document.createElement("td");
  t2.id = "td-name" + element.id;
  t2.innerText = element.name;
  let t3 = document.createElement("td");
  t3.id = "td-age" + element.id;
  t3.innerText = element.age;
  let t4 = document.createElement("td");
  t4.id = "td-address" + element.id;
  t4.innerText = element.address;
  let t5 = document.createElement("td");
  t5.id = "td-gender" + element.id;
  t5.innerText = element.gender;
  let t6 = document.createElement("td");
  t6.id = "td-diagnosis" + element.id;
  t6.innerText = element.diagnosis;
  let t7 = document.createElement("td");
  t7.id = "td-covid" + element.id;
  t7.innerText = element.covid;
  let t8 = document.createElement("td");
  t8.id = "td-discharge" + element.id;
  let btn = document.createElement("button");
  btn.id = "btn" + element.id;
  btn.addEventListener("click", this.deletePatiend);
  btn.innerText = "Discharge";
  t8.appendChild(btn);
  tr.append(t1, t2, t3, t4, t5, t6, t7, t8);
  document.getElementById("table").appendChild(tr);
}
function addClicked() {
  document.getElementById("form").style.display = "block";
  document.getElementById("saveButton").addEventListener("click", () => {
    saveDetails();
  });
  dataObject.id = null;
  if (document.querySelectorAll(".details-row").length) {
    for (const node of document.querySelectorAll(".details-row")) {
      node.style.backgroundColor = "transparent";
    }
  }
  dataObject.columnNames.forEach((key) => {
    let node = document.getElementById(key);
    if (node) {
      node.value = null;
    }
  });
}
