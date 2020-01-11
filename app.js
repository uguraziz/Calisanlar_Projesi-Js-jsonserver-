const submit = document.getElementById("employee-form");
const nameInput = document.getElementById("name");
const departmentInput = document.getElementById("department");
const salaryInput = document.getElementById("salary");
const employeesCard = document.getElementById("employees");
const updateToButton = document.getElementById("update");
const filterInput = document.getElementById("filter");
const req = new Request(`http://localhost:3000/employees`);
const ui = new UI();

let updateState = null;

eventListeners();
function eventListeners(){
	submit.addEventListener("submit", getProject);
	document.addEventListener("DOMContentLoaded", listEmploye);
	employeesCard.addEventListener("click", clickProsses);
	updateToButton.addEventListener("click", updateEmploye);
	filterInput.addEventListener("keyup", filterEmployees);
}

function getProject(e){
	let name = nameInput.value.trim();
	let department = departmentInput.value.trim();
	let salary = salaryInput.value.trim();

	if(name === "" || department === "" || salary === ""){
		ui.messageBox("danger", "Lütfen Boş alan bırakmayınız");
	}else{
		let control = false;
		req.get()
		.then(responce =>{
			responce.forEach(e => {
				if(e.name === name){
					control = true;
				}
			})
			if(control === false){
				req.post({name:name,department:department,salary:Number(salary)})
				.then(responce => {
					ui.addNewEmployeeToUi(responce);
					ui.messageBox("success","Çalışan başarıyla eklenmiştir");
				})
				.catch(err => console.log(err));
			}else{
				ui.messageBox("danger","Aynı isim soyisimde başka çalışan mevcuttur!");
			}
		})
		.catch(err => console.log(err));	
	}
	e.preventDefault();
}

function listEmploye(e){
	req.get()
	.then(responce => {
		responce.forEach(e => {
			ui.listEmployeToUi(e);
		})
	})
	.catch(err => console.log(err));
}

function clickProsses(e){
	if(e.target.id === "delete-employee"){
		let value = e.target.parentElement.parentElement;
		req.delete(value.children[3].textContent)
		.then(responce => {
			ui.employeeRemoveToUi(e);
		})
		.catch(err => console.log(err));
	}
	if(e.target.id === "update-employee"){
		updateProject(e.target.parentElement.parentElement);
	}
}

function updateProject(e){
	ui.updateEmployeeToUi(e);
	if(updateState === null ){
		updateState = {
			stadeID: e.children[3].textContent,
			stateTR: e
		}
	}else{
		updateState = null;
	}
}

function updateEmploye(){
	let data = {name:nameInput.value,department:departmentInput.value,salary:Number(salaryInput.value)};
	req.put(updateState.stadeID,data)
	.then(responce => {
		ui.updateEmployeeInputToUi(responce,updateState.stateTR);
	})
	.catch(err => console.log(err));
	
}

function filterEmployees(e){
	let value = e.target.value.trim().toLowerCase();
	ui.filterEmployeesToUi(value);
}