class Request{
	constructor(url){
		this.url = url;
	}

	async get(){
		let responce = await fetch(this.url);
		let responceData = await responce.json();
		return responceData;
	}

	async post(data){
    	let promise = await fetch(this.url,{
       	 	method:"POST",
        	body: JSON.stringify(data),
        	headers: {
            "Content-type": "application/json; charset=UTF-8"
       		}
    	});
    	let promisData = await promise.json();
    	return promisData;
    }
    async put(id,data){
    	let promise = await fetch(this.url +"/"+ id,{
       	 	method:"PUT",
        	body: JSON.stringify(data),
        	headers: {
            "Content-type": "application/json; charset=UTF-8"
       		}
    	});
    	let promisData = await promise.json();
    	return promisData;
    }

    async delete(id){
    	let promise = await fetch(this.url +"/"+id,{
    		method:"DELETE"
    	});
    	return "Silme işlemi başarılı";
    }
}