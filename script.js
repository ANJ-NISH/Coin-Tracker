let dataarr;

let table=document.getElementById("table");
let search=document.getElementById("searchip");
let btn1=document.getElementById("btn1");
let btn2=document.getElementById("btn2");


fetchalldata= async ()=>
{
  let response=await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false");

  dataarr=await response.json();
}


function createTable(dataarr)
{
 
    dataarr.forEach((dataitem)=>
        {
            let trele=document.createElement("tr");
            let td1=document.createElement("td");
            let td2=document.createElement("td");
            let td3=document.createElement("td");
            let td4=document.createElement("td");
            let td5=document.createElement("td");
            let td6=document.createElement("td");
    
            trele.style.width="100%";
            trele.style.height="90px";
            trele.style.color="white";
            trele.style.fontSize="18px";
            trele.style.fontFamily="Courier New";
            trele.style.borderBottom="1.5px solid white";
    
            let imgele=document.createElement("img");
            imgele.setAttribute("src",dataitem.image);
            imgele.style.height="45px";
            imgele.style.marginRight="10px";
    
            let text1=document.createTextNode(dataitem.name);
    
            let div1=document.createElement('div');
            div1.style.display="flex";
            div1.style.justifyContent="flex-start";
            div1.style.alignItems="center";
            div1.appendChild(imgele);
            div1.appendChild(text1);
    
            let text2=document.createTextNode(dataitem.symbol.toUpperCase());
            let text3=document.createTextNode(dataitem.current_price);
            let text4=document.createTextNode(dataitem.total_volume);
            let text5=document.createTextNode(`${dataitem.price_change_percentage_24h}%`);
            let text6=document.createTextNode(`Mkr Cap: ${dataitem.market_cap}`);
    
            td1.style.width="15%";
            td2.style.width="15%";
            td3.style.width="15%";
            td4.style.width="15%";
            td5.style.width="15%";
            td6.style.width="15%";
    
            td1.appendChild(div1);
            td2.appendChild(text2);
            td3.appendChild(text3);
            td4.appendChild(text4);
            td5.appendChild(text5);
            td6.appendChild(text6);
    
            if(dataitem.price_change_percentage_24h>0)
            {
                td5.style.color="green";
            }
            else
            {
                td5.style.color="red";
            }
    
            trele.appendChild(td1);
            trele.appendChild(td2);
            trele.appendChild(td3);
            trele.appendChild(td4);
            trele.appendChild(td5);
            trele.appendChild(td6);
    
            table.appendChild(trele);
        })
}



document.addEventListener("DOMContentLoaded",async ()=>
{
    await fetchalldata();
     
    createTable(dataarr);
})


search.addEventListener("input",()=>
{
    let tosearch=search.value.toUpperCase();

    table.innerHTML="";

    if(tosearch==="")
    {
        createTable(dataarr);
    }
    else
    {
        let filteredarr=dataarr.filter((item)=> item.name.toUpperCase().includes(tosearch) || item.symbol.includes(tosearch));

        createTable(filteredarr);
    }
})


btn1.addEventListener("click",()=>
{
    table.innerHTML="";

    let newsortedarr=dataarr.sort((a,b)=> b.market_cap-a.market_cap);

    createTable(newsortedarr);
})

btn2.addEventListener('click',()=>
{
    table.innerHTML="";

    let newsortedarr=dataarr.sort((a,b)=> b.price_change_percentage_24h-a.price_change_percentage_24h);

    createTable(newsortedarr);
})