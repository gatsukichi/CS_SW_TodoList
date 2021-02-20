
// unique id generator
var ID = function () {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return '_' + Math.random().toString(36).substr(2, 9);
  };



//storage  __ getKey
// howTo using => sortByDate(getStorageData(getKey()))
const getKey = function(){
    let keys = [];
    for(let i=0; i<localStorage.length;i++){
        keys.push(localStorage.key(i));
    }
    return keys;
}
const getStorageData = (keys)=>{
    //keys => array
    let data = keys.reduce((acc,cur)=>{
        return [ ...acc , {"key" : cur, "value":JSON.parse(localStorage.getItem(cur))} ]
    },[])
    return data;
}
const sortByDate = (data)=>{
    //data ==> array
    data.sort((a,b)=>{
        if (a.value.uploaded > b.value.uploaded){
            return 1
        }else{
            return -1
        }
    })
    return data;
}
const removeData = (id)=>{
    localStorage.removeItem(id);
}

//Dom
const blindList = ()=>{
    const todoLists = document.querySelectorAll(".todoList")
    console.log(todoLists)
    todoLists.forEach((el)=>{
        el.remove()
    })
}
const getValue = function(){
    return document.querySelector("input").value;
}
const onSubmit = (event)=>{
    event.preventDefault()
    const data = event.target.something.value;
    console.log(data);
    let date = new Date()
    const toDo = {
        "behavior" : data,
        "uploaded" : date
    }
    console.log(JSON.stringify(toDo))


    localStorage.setItem(ID(),JSON.stringify(toDo))
    event.target.something.value=""
    blindList();
    makeTodoList();
}
//이런 방법 뿐인지 고민은 된다. 
// window.setTimeout(() => {
// }, 1000);

window.onload = function() {
    const Form = document.querySelector(".form")
    //console.log(Form);
    Form.addEventListener('submit', onSubmit)
    makeTodoList();
};

const makeTodoList = ()=>{
    let data = sortByDate(getStorageData(getKey()))
    const mainContents = document.querySelector(".mainContents")
    data.map((el)=>{
        const newLi = document.createElement("li")
        console.log(el)
        newLi.textContent = el.value.behavior;
        newLi.classList= "todoList";
        newLi.setAttribute("id", el.key);
        mainContents.appendChild(newLi)
        newLi.addEventListener("click",clickHandler)
    })
}

const clickHandler = (e)=>{
    //console.log("clicked" + e.target.id)
    removeData(e.target.id);
    blindList();
    makeTodoList();
}