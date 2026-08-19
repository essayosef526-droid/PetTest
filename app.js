const api="https://6a7a02dd674f43f4db1212b4.mockapi.io/T-shirts"
const petContainer = document.getElementById("petContainer");
const nameinput=document.getElementById("name")
const typeinput = document.getElementById("Pet-Type");
const colorinput = document.getElementById("Color");
const desinput = document.getElementById("Description");
const form = document.getElementById("petForm");
async function showpet() {
    try{const pets=await fetch(api);
        const data=await pets.json();
        data.forEach((pet) => {
            const card=document.createElement("div");
            card.classList.add("pet-card");
            card.innerHTML = `
  <h3>name: ${pet.name}</h3>
  <p>type: ${pet.type}</p>
  <p>color: ${pet.color}</p>
  <p>Description: ${pet.description}</p>
  <button type=button class="Delete">Delete</button>`; 
  const deleteButton = card.querySelector(".Delete");
  deleteButton.addEventListener("click",() => {Deletepet(pet.id, card)});
   petContainer.appendChild(card)
        });


    }catch(error){console.log(error);}

    
}
async function addProduct(name, type, color, des){
  try {
    const pets = await fetch(api,{
     method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({name:name, type:type, color:color, des:des})})
    const data = await pets.json();
   
  }catch (error) {
    console.error(error);
  }}
 

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const nameValue = nameinput.value;
  const typeValue = typeinput.value;
  const colorValue = colorinput.value;
  const desValue = desinput.value;
  
  addProduct(nameValue, typeValue, colorValue, desValue);
})
async function Deletepet(id, card){
  try {
    const pets= await fetch(api + "/" + id , {
     method: "DELETE"})
    card.remove();
  }catch (error) {
    console.error(error);
  }}
showpet();