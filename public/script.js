'use strict';

const btnPost = document.querySelector('.post');
const btnGet = document.querySelector('.get');
const btnPut = document.querySelector('.put');
const btnDel = document.querySelector('.delete');

const inputId = document.querySelector('.inputId');
const inputName = document.querySelector('.InputName');
const inputSurname = document.querySelector('.InputSurname');
const inputCompany = document.querySelector('.InputCompany');
const inputPosition = document.querySelector('.InputPosition');

const users = document.querySelector('.users');

let inputs = document.querySelectorAll('input');
let getMessage = document.querySelector('.getMessage');
// let usersArr = {};

btnPost.addEventListener('click', () => {
   if (inputId.value && inputName.value && inputSurname.value && inputCompany.value && inputPosition.value) {
      // if (usersArr[inputId.value]) {
      //    getMessage.innerHTML = `User with ID: ${inputId.value} already exists, update or delete.`;
      // } else {
      // usersArr[inputId.value] = {
      //    name: inputName.value,
      //    surname: inputSurname.value,
      //    company: inputCompany.value,
      //    position: inputPosition.value,
      // };
      fetch('http://localhost:4000/api/', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({
            id: inputId.value,
            name: inputName.value,
         }),
      })
         .then((res) => res.json())
         .then((data) => {
            console.log(data);
         });

      users.innerHTML += `
		 <div class="user" data-id=${inputId.value}>
			<p><span>ID:</span>  ${inputId.value}</p>
			<p><span>Name:</span> ${inputName.value}</p>
			<p><span>Surname:</span> ${inputSurname.value}</p>
			<p><span>Position:</span> ${inputPosition.value}</p>
			<p><span>Company:</span> ${inputCompany.value}</p>
		 </div>`;
      inputs.forEach((input) => {
         input.value = '';
      });
   }
});

btnGet.addEventListener('click', () => {
   if (inputId.value) {
      // if (usersArr[inputId.value]) {
      fetch(`http://localhost:4000/api/?id=${inputId.value}`)
         .then((res) => res.json())
         .then((user) => {
            inputName.value = user.name;
         });

      // getMessage.innerHTML = `User with ID: ${inputId.value} exists, update or delete.`;
      // inputName.value = usersArr[inputId.value].name;
      // inputSurname.value = usersArr[inputId.value].surname;
      // inputCompany.value = usersArr[inputId.value].company;
      // inputPosition.value = usersArr[inputId.value].position;
      // } else {
      //    getMessage.innerHTML = `User with ID: ${inputId.value} does not exist.`;
      // }
   }
});

btnPut.addEventListener('click', () => {
   if (inputId.value && inputName.value && inputSurname.value && inputCompany.value && inputPosition.value) {
      if (usersArr[inputId.value]) {
         usersArr[inputId.value] = {
            name: inputName.value,
            surname: inputSurname.value,
            company: inputCompany.value,
            position: inputPosition.value,
         };
         document.querySelector(`[data-id="${inputId.value}"]`).innerHTML = `
		 <p><span>ID:</span>  ${inputId.value}</p>
		 <p><span>Name:</span> ${inputName.value}</p>
		 <p><span>Surname:</span> ${inputSurname.value}</p>
		 <p><span>Position:</span> ${inputPosition.value}</p>
		 <p><span>Company:</span> ${inputCompany.value}</p>`;
      } else {
         getMessage.innerHTML = `User with ID: ${inputId.value} does not exist.`;
      }
   }
});

btnDel.addEventListener('click', () => {
   let deleteElem;
   if (inputId.value) {
      if (usersArr[inputId.value]) {
         delete usersArr[inputId.value];
         deleteElem = document.querySelector(`[data-id="${inputId.value}"]`).remove();
      } else {
         getMessage.innerHTML = `User with ID: ${inputId.value} does not exist.`;
      }
   }
});
