//function reloadStylesheets() {
//    var queryString = '?reload=' + new Date().getTime();
//    $('link[rel="stylesheet"]').each(function () {
//        this.href = this.href.replace(/\?.*|$/, queryString);
//    });
//};
students = [    
    {name:"Bob", email:"bob@gmail.com", phone: "2321342", level:"Yellow", groupName:""},
    {name:"Hans", email:"hans@gmail.com", phone: "89321342", level:"red", groupName:""}
];

var tableBody = document.getElementById("studentTable");
var populateTable = function(){
    tableBody.innerHTML = "";
    for (var i = 0; i < students.length; i++) {
        var row = tableBody.insertRow(i);
        row.insertCell(0).innerHTML = students[i].name;
        row.insertCell(1).innerHTML = students[i].email;
        row.insertCell(2).innerHTML = students[i].phone;
        row.insertCell(3).innerHTML = students[i].level;
        row.insertCell(4).innerHTML = students[i].groupName;
    }
};
populateTable();

var studentForm = document.getElementById("studentForm");
studentForm.onsubmit = function(){
    event.preventDefault();
    var student = {};
    student.name = studentForm.elements["name"].value;
    student.email = studentForm.elements["email"].value;
    student.phone = studentForm.elements["phone"].value;
    var s = document.getElementById("formSelect");
    student.level = s.options[s.selectedIndex].value;
    student.groupName = studentForm.elements["groupName"].value;
    students.push(student);
    populateTable();
    loadOnclick();
};

var loadOnclick = function(){
    var table = document.getElementById("tableId");
    var tableRows = table.getElementsByTagName("tr");

    for (i = 0; i < tableRows.length; i++) {
        var currentRow = tableRows[i];
        var createClickHandler = function(row) {
            return function() { 
                if(tableRows[row].className === "selectedRow") {
                    tableRows[row].className = "";
                } else {
                    tableRows[row].classList.add("selectedRow");
                }
            };
        };
        currentRow.onclick = createClickHandler(i);
    }   
};
loadOnclick();

var tableFormDelete = document.getElementById("tableFormDelete");
tableFormDelete.onsubmit = function(){
    event.preventDefault();
    var selectedRow = document.getElementsByClassName("selectedRow");
    var rowChilds = [];
    if(selectedRow.length > 1) {
        for (var i = 0; i < selectedRow.length; i++) {
            rowChilds.push(selectedRow[i].childNodes[0].innerText);
        }
        for (var i = 0; i < rowChilds.length; i++) {
            var index = -1;
            for(var j = 0; j < students.length; j++) {
                if (students[j].name === rowChilds[i]) {
                    index = j;
                    break;
                }
            }
            if (index > -1) {
                students.splice(index, 1);
            }
        }
    } else {
        var searchTerm = selectedRow[0].childNodes[0].innerText;

        var index = -1;
        for(var i = 0; i < students.length; i++) {
            if (students[i].name === searchTerm) {
                index = i;
                break;
            }
        }
        if (index > -1) {
            students.splice(index, 1);
        }      
    }
    
    while(selectedRow[0]) {
        selectedRow[0].parentNode.removeChild(selectedRow[0]);
    }
    loadOnclick();
};

var tableFormGroup = document.getElementById("tableFormGroup");
tableFormGroup.onsubmit = function(){
    event.preventDefault();
    
    var selectedRow = document.getElementsByClassName("selectedRow");
    var rowChilds = [];
    for (var i = 0; i < selectedRow.length; i++) {
        rowChilds.push(selectedRow[i].childNodes[0].innerText);
    }
    var index = -1;
    for (var i = 0; i < rowChilds.length; i++) {
        for(var j = 0; j < students.length; j++) {
            if (students[j].name === rowChilds[i] && students[j].groupName !== tableFormGroup.elements["groupName"].value) {
                index = j;
                break;
            }
        }
        if (index > -1) {
            students[index].groupName = tableFormGroup.elements["groupName"].value;
        }
    }
    
    populateTable();
    loadOnclick();
};