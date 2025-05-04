import { addProductToFirestore, getProductsFromFirestore, updateProductToFirestore } from "../../firebase-config.js";

const data = await getProductsFromFirestore();

const productTableBody = document.getElementById("product-table-body");

let html = '';
for (const product of data) {
    html += `
            <tr>
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td>${product.price}</td>
                <td>${product.type}</td>
                <td>${product.status || 'Active'}</td>
                <td><button class="edit-btn" onclick="openModal('${product.id}', '${product.name}', '${product.price}', '${product.type}', '${product.status || 'Active'}', '${product.description}')">Edit</button></td>
            </tr>
        `
}
productTableBody.innerHTML = html;

function openModal(id, name, price, type, status, description) {
    document.getElementById('productId').value = id;
    document.getElementById('productName').value = name;
    document.getElementById('productPrice').value = price;
    document.getElementById('productType').value = type;
    document.getElementById('productStatus').value = status;
    document.getElementById('productDescription').value = description;
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

async function saveProductUpdate() {
    const id = document.getElementById('productId').value;
    const product = {
        name: document.getElementById('productName').value,
        price: document.getElementById('productPrice').value,
        description: document.getElementById('productDescription').value,
        type: document.getElementById('productType').value,
        status: document.getElementById('productStatus').value
    }
    await updateProductToFirestore(id, product);
    alert('Product updated successfully');
    closeModalUpdate();
    window.location.reload();
}

async function saveProductCreate() {
    const product = {
        name: document.getElementById('productNameC').value,
        price: document.getElementById('productPriceC').value,
        description: document.getElementById('productDescriptionC').value,
        type: document.getElementById('productTypeC').value,
        status: document.getElementById('productStatusC').value
    }
    await addProductToFirestore(product);
    alert('Product created successfully');
    closeModalCreate();
    window.location.reload();
}

window.saveProductCreate = saveProductCreate;
window.closeModalCreate = closeModalCreate;
window.closeModalUpdate = closeModalUpdate;
window.saveProductUpdate = saveProductUpdate;
window.openModalCreate = openModalCreate;
window.openModal = openModal;
