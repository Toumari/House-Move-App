form = document.querySelector('.form');
list = document.querySelector('.list');

function addPost(item, price) {
  const html = `<li class="list-item">
          ${item} <span class="price">£${price}</span
          ><span class="delete-btn">X</span>
        </li>`;
  list.innerHTML += html;
  form.reset();
}

form.addEventListener('submit', e => {
  e.preventDefault();
  //    console.log(e.target.name.value);
  addPost(e.target.name.value, e.target.price.value);
});

list.addEventListener('click', e => {
  if (e.target.classList.contains('delete-btn')) {
    console.log('Deleted');
    e.target.parentNode.parentNode.removeChild(e.target.parentNode);
  }
});
