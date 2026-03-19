async function sendOrder(){

    let order = document.getElementById("orderInput").value;

    let response = await fetch("/order",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            order:order
        })
    });

    let data = await response.json();

    document.getElementById("turn").innerText = data.turn;
    console.log(data)

    let logDiv = document.getElementById("log");
    logDiv.innerHTML = "";

    data.log.forEach(line=>{
        let p = document.createElement("p");
        p.innerText = line;
        logDiv.appendChild(p);
    });

}