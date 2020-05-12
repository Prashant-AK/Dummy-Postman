// Utility function for the conversion of string to dom

function ConvertString(string){
    let div= document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;
}
let addedparamcount=0;
let parameterBox=document.getElementById('parameterBox');
parameterBox.style.display="none";

let paramradio=document.getElementById('paramsradio');
paramradio.addEventListener('click',(e)=>{
    document.getElementById('requestJsonBox').style.display="none";
    document.getElementById('parameterBox').style.display="block";
    document.getElementById('params').style.display="block";
});

let jsonradio=document.getElementById('jsonradio');
jsonradio.addEventListener('click',(e)=>{
    document.getElementById('requestJsonBox').style.display="block";
    document.getElementById('parameterBox').style.display="none";
    document.getElementById('params').style.display="none";
});

let adparams=document.getElementById('addParam');
adparams.addEventListener('click',(e)=>{
   let params =document.getElementById('params') 
   console.log('running in params');
                let string=` 
                    <div class="form-row">
                    <label for="url" class="col-sm-2 col-form-label">Parameter ${addedparamcount +2}</label>
                    <div class="col-md-4">
                    <input type="text" class="form-control" id="parameterkey${addedparamcount +2}" placeholder="Enter Parameter ${addedparamcount +2} Key">
                    </div>
                    <div class="col-md-4">
                    <input type="text" class="form-control" id="parametervalue${addedparamcount +2}" placeholder="Enter Parameter ${addedparamcount +2} Value">
                    </div>
                    <button type="button" id="addParam" class="btn btn-primary deleteparams">-</button>
                    </div>`;
                    console.log('string');
                    let paramelement= ConvertString(string);
                    console.log('pramelement')
                    params.appendChild(paramelement);
                    console.log('param.append');
                    let deleteparam=document.getElementsByClassName('deleteparams');
                    for(item of deleteparam)
                        {
                            item.addEventListener('click',(e)=>{
                            e.target.parentElement.remove();

                            });
                        }
        addedparamcount++;
});

let submit=document.getElementById('submit');
submit.addEventListener('click',(e)=>{
    document.getElementById('responseJsonText').value='Please Wait .......';
//Fetch all the values entered by the user

let url= document.getElementById("urlField").value;
let requestType=document.querySelector("input[name='requestType']:checked").value;
let contentType=document.querySelector("input[name='contentType']:checked").value;
if(contentType==='params'){
    data={};
    for(i=0;i<addedparamcount +1;i++){
        if(document.getElementById("parametere key" +(i+1) !=undefined))
        {
            let key = document.getElementById('parameterkey' + (i + 1)).value;
            let value = document.getElementById('parametervalue' + (i + 1)).value;
            data[key] = value;
        }
    }
    data=JSON.stringify(data);
    console.log(data);
}
else{
    console.log('in else')
    data=document.getElementById('requestJsonText').value
    console.log(data);
}
if(requestType==='GET'){
    fetch(url,{
        method:'GET',
    })
            .then(response => response.text())
            .then((text) => {
                document.getElementById('responseJsonText').value = text;
            });
}
else{
    fetch(url,{
        method:'POST',
        body:data,
        headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
    })
        .then(response => response.text())
        .then((text) => {
            document.getElementById('responseJsonText').value = text;
        });
}
    });



