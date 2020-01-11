class UI{
	constructor(){
		this.employees = document.getElementById("employees");
		this.nameInput = document.getElementById("name");
		this.departmentInput = document.getElementById("department");
		this.salaryInput = document.getElementById("salary");
		this.updateButton = document.getElementById("update");
		this.addButton = document.getElementById("button");
		this.cardBody = document.querySelectorAll(".card-body")[0];
	}

	filterEmployeesToUi(value){
		let filterTable = document.querySelectorAll("#employees tr");
		filterTable.forEach(e => {
			let names = e.children[0].textContent.trim().toLowerCase();
			if(names.indexOf(value) === -1){
				e.setAttribute("style", "display:none");
			}else{
				e.setAttribute("style", "display: block");
			}
		})
	}

	messageBox(type,message){
		let div = document.createElement("div");
		div.className = `alert alert-${type}`;
		div.textContent = message;
		this.cardBody.appendChild(div);
		setTimeout(() => {
			div.remove();
		},2e3)
	}

	clearInputs(){
		this.nameInput.value = "";
		this.departmentInput.value = "";
		this.salaryInput.value = "";
	}

	listEmployeToUi(data){
		this.employees.innerHTML += `
		<tr>                               
	        <td>${data.name}</td>
	        <td>${data.department}</td>
	        <td>${data.salary}</td>
	        <td>${data.id}</td>
	        <td><a href="#" id = "update-employee" class= "btn btn-danger">Güncelle</a></td> 
	        <td> <a href="#" id = "delete-employee" class= "btn btn-danger">Sil</a></td>
	    </tr>`;
	}

	addNewEmployeeToUi(data){
		this.employees.innerHTML += `
		<tr>                               
	        <td>${data.name}</td>
	        <td>${data.department}</td>
	        <td>${data.salary}</td>
	        <td>${data.id}</td>
	        <td><a href="#" id = "update-employee" class= "btn btn-danger">Güncelle</a></td> 
	        <td> <a href="#" id = "delete-employee" class= "btn btn-danger">Sil</a></td>
	    </tr>`;
	    this.clearInputs();
	}

	employeeRemoveToUi(e){
		e.target.parentElement.parentElement.remove();
		this.updateButton.style.display = "none";
		this.addButton.setAttribute("style", "display: block");
		this.clearInputs();
	}

	updateEmployeeToUi(e){
		if(this.updateButton.style.display === "none"){
			this.updateButton.style.display = "block";
			this.addButton.setAttribute("style", "display: none");
			this.updateTheAnd(e);
		}else{
			this.updateButton.style.display = "none";
			this.addButton.setAttribute("style", "display: block");
			this.clearInputs();
		}
		this.updateButton.addEventListener("click", () => {
			this.updateButton.style.display = "none";
			this.addButton.setAttribute("style", "display: block");
			this.clearInputs();
		})
	}

	updateTheAnd(e){
		this.nameInput.value = e.children[0].textContent;
		this.departmentInput.value = e.children[1].textContent;
		this.salaryInput.value = e.children[2].textContent;
	}

	updateEmployeeInputToUi(data,tr){
		tr.innerHTML = `
		<tr>                               
	        <td>${data.name}</td>
	        <td>${data.department}</td>
	        <td>${data.salary}</td>
	        <td>${data.id}</td>
	        <td><a href="#" id = "update-employee" class= "btn btn-danger">Güncelle</a></td> 
	        <td> <a href="#" id = "delete-employee" class= "btn btn-danger">Sil</a></td>
	    </tr>`;
	    this.clearInputs();
	}
}