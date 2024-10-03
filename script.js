document.addEventListener('DOMContentLoaded', () => {
    const studentForm = document.getElementById('studentForm');
    const recordsBody = document.getElementById('recordsBody');

    // Load records on loading
    loadRecords();

    // Form submission 
    studentForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const studentID = document.getElementById('studentID').value;
        const email = document.getElementById('email').value;
        const contact = document.getElementById('contact').value;

        if (name && studentID && email && contact) {
            if(contact.length != 10){
                alert("Enter correct contact no.")
            }else{
                const student = { name, studentID, email, contact };
                addRecord(student);
                studentForm.reset();
            }
            
        } else {
            alert('Please fill all the fields.');
        }
    });

    function loadRecords() {
        const records = JSON.parse(localStorage.getItem('students')) || [];
        recordsBody.innerHTML = '';
        records.forEach((student, index) => {
            addRowToTable(student, index);
        });
    }

    function addRecord(student) {
        const records = JSON.parse(localStorage.getItem('students')) || [];
        records.push(student);
        localStorage.setItem('students', JSON.stringify(records));
        addRowToTable(student, records.length - 1);
    }

    function addRowToTable(student, index) {
        const row = recordsBody.insertRow();
        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.studentID}</td>
            <td>${student.email}</td>
            <td>${student.contact}</td>
            <td>
                <button class="edit" onclick="editRecord(${index})">Edit</button>
                <button class="delete" onclick="deleteRecord(${index})">Delete</button>
            </td>
        `;
    }

    window.editRecord = function (index) {
        const records = JSON.parse(localStorage.getItem('students'));
        const student = records[index];
        document.getElementById('name').value = student.name;
        document.getElementById('studentID').value = student.studentID;
        document.getElementById('email').value = student.email;
        document.getElementById('contact').value = student.contact;

        deleteRecord(index); 
    };

    window.deleteRecord = function (index) {
        const records = JSON.parse(localStorage.getItem('students'));
        records.splice(index, 1);
        localStorage.setItem('students', JSON.stringify(records));
        loadRecords();
    };
});
