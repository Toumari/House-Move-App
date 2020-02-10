const firebaseConfig = {
	apiKey: 'AIzaSyB8hhUnMwQGcI3Sq6lTwzSHMXklI8lFcrY',
	authDomain: 'house-moving-app.firebaseapp.com',
	databaseURL: 'https://house-moving-app.firebaseio.com',
	projectId: 'house-moving-app',
	storageBucket: 'house-moving-app.appspot.com',
	messagingSenderId: '921537078417',
	appId: '1:921537078417:web:3b82f682da56b5ad630b30',
	measurementId: 'G-X74LVBTQBC'
};
firebase.initializeApp(firebaseConfig);
// Initialize Firebase
let database = firebase.database();

let form = document.querySelector('.form');
let list = document.querySelector('.list');
let runTotal = document.querySelector('.title-lead');
let items = [];

document.body.addEventListener('load', readuserData());

function writeUserData(item, price, id) {
	firebase.database().ref('items/' + id).set({
		item: item,
		price: price,
		id: id
	});
}

function readuserData() {
	let itemList = [];
	const listOfItems = firebase.database().ref('items/');
	listOfItems.once('value').then(function(snapshot) {
		snapshot.forEach(function(item) {
			items.push(item.val());
			console.log('pushed');
			console.log(items);
			displayData(item.val());
		});
	});
}

function updateData() {
	let itemList = [];
	const listOfItems = firebase.database().ref('items/');
	listOfItems.once('value').then(function(snapshot) {
		snapshot.forEach(function(item) {
			items.push(item.val());
			console.log('pushed');
			console.log(items);
		});
	});
}

function displayData(item) {
	console.log(items);
	const html = `<li class="list-item" data-id="${item.id}">${item.item} <span class="price">£${item.price}</span><span class="delete-btn">X</span></li>`;
	list.innerHTML += html;

	priceCalc();
}

function priceCalc() {
	let total = 0;

	items.forEach((item) => {
		total += parseInt(item.price);
	});

	runTotal.innerText = `Total - £${total}`;

	return total;
}

function addPost(item, price) {
	const id = Math.floor(Math.random() * 1000000);
	writeUserData(item, price, id);
	const html = `<li class="list-item" data-id=${id}">${item} <span class="price">£${price}</span><span class="delete-btn">X</span></li>`;
	list.innerHTML += html;
	items.push({
		name: item,
		price: price,
		id: id
	});

	form.reset();
	priceCalc();
	console.log(items);
}

function deletePost(id) {
	let deletedItem = database.ref('items/' + id);
	deletedItem.remove();
}

form.addEventListener('submit', (e) => {
	e.preventDefault();
	//    console.log(e.target.name.value);
	updateData();
	addPost(e.target.name.value.trim(), e.target.price.value);
});

list.addEventListener('click', (e) => {
	if (e.target.classList.contains('delete-btn')) {
		console.log('Deleted');
		e.target.parentNode.parentNode.removeChild(e.target.parentNode);
		let id = e.target.parentElement.getAttribute('data-id');
		items = items.filter((item) => !item.id === id);
		console.log(id);
		// readuserData();
		deletePost(id);
		console.log('deleted from Firestore');
		console.log(items);
		updateData();
		priceCalc();
	}
});
