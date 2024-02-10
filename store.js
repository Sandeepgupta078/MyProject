const store ={
   todos:[
    {
        id:"1",
        title:"Coding",
        completed:true,
    },
    {
        id:"2",
        title:"Reading Article",
        completed:false,
    },
    {
        id:"3",
        title:"Do some Question",
        completed:true,
    },
   ]
};

const storeHandler = {
    get(target,property){
        console.log("you trying to get ",property);
        return target[property];
    },
    set(target, property, value){
        console.log(target,property,value);
        console.log("You are trying to set",property);
        target[property] = value;
        if(property == "todos"){
            window.dispatchEvent(new Event("todosChanged"));
        }
        localStorage.setItem("store",JSON.stringify(store));
        return true;
    }
    
};


const storeProxy = new Proxy(store,storeHandler);

function addTodo(newTodo){
    storeProxy.todos = [...storeProxy.todos,newTodo];
}

function deleteTodo(id){
    storeProxy.todos = storeProxy.todos.filter((todo) => todo.id !== id);
}

function toggleCompleted(id,completed){
    storeProxy.todos = storeProxy.todos.map((todo)=>{
        if(todo.id===id){
            return {...todo,completed:completed};
        }else{
            return todo;
        }
    });
}

export{addTodo,deleteTodo,toggleCompleted};
export default storeProxy;