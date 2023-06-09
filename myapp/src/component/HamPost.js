import axios from 'axios'

export function hamPost(url, formdata, useFormData){
    var res ;
    if(useFormData === true){
      var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
      };
    }else{
      var requestOptions = {
        method: 'POST',
        redirect: 'follow'
      };
    }
      
    return fetch(url, requestOptions)
        .then(response => response.json())
        .then(data => {
          console.log('Ham post: ', data)
          return data
        })
        .catch(error => console.log('error', error));
        
}


// function tj_customer_name(id) {

//   // return the entire promise chain
//   return fetch(`/customers/${id}.json`, {
//     headers: API_HEADERS,
//     credentials: 'same-origin'
//   })
//   .then((response) => {
//     if(response.ok) {
//       return response.json();
//     } else {
//       throw new Error('Server response wasn\'t OK');
//     }
//   })
//   .then((json) => {
//     const customer_name = json.first_name.concat(' ').concat(json.last_name);
//     return customer_name; // return the customer_name here
//   });
//  }