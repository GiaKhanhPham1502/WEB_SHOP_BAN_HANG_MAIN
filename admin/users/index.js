import { addUserToFirestore, getUsersFromFirestore, updateUserToFirestore } from "../../firebase-config.js";

const data = await getUsersFromFirestore();

const userTableBody = document.getElementById("user-table-body");

let html = '';
for (const user of data) {
    html += `
            <tr>
                <td>${user.id}</td>
                <td>${user.fullName}</td>
                <td>${user.email}</td>
                <td>${user.role}</td>
                <td>${user.status || 'Active'}</td>
                <td><button class="edit-btn" onclick="openModal('${user.id}', '${user.fullName}', '${user.email}', '${user.role}', '${user.status || 'Active'}')">Edit</button></td>
            </tr>
        `
}
userTableBody.innerHTML = html;

function openModal(id, name, email, role, status) {
    document.getElementById('userId').value = id;
    document.getElementById('userName').value = name;
    document.getElementById('userEmail').value = email;
    document.getElementById('userRole').value = role;
    document.getElementById('userStatus').value = status;
    document.getElementById('editModalUpdate').style.display = 'flex';
}

function openModalCreate() {
    document.getElementById('editModalCreate').style.display = 'flex';
}

function closeModalUpdate() {
    document.getElementById('editModalUpdate').style.display = 'none';
}

function closeModalCreate() {
    document.getElementById('editModalCreate').style.display = 'none';
}

async function saveUserUpdate() {
    const id = document.getElementById('userId').value;
    const user = {
        fullName: document.getElementById('userName').value,
        email: document.getElementById('userEmail').value,
        role: document.getElementById('userRole').value,
        status: document.getElementById('userStatus').value
    }
    console.log(id, user);
    await updateUserToFirestore(id, user);
    alert('User updated successfully');
    closeModalUpdate();
    window.location.reload();
}

async function saveUserCreate() {
    const user = {
        fullName: document.getElementById('userNameC').value,
        email: document.getElementById('userEmailC').value,
        role: document.getElementById('userRoleC').value,
        status: document.getElementById('userStatusC').value
    }
    await addUserToFirestore(user);
    alert('User created successfully');
    closeModalCreate();
    window.location.reload();
}

window.saveUserCreate = saveUserCreate;
window.closeModalCreate = closeModalCreate;
window.closeModalUpdate = closeModalUpdate;
window.saveUserUpdate = saveUserUpdate;
window.openModalCreate = openModalCreate;
window.openModal = openModal;
