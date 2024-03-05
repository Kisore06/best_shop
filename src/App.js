import './App.css';
import Header from './Header';
import Content from './Content';
import Footer from './Footer';
import { useState, useEffect } from 'react';
import AddItem from './AddItem';
import SearchItem from './SearchItem';

function App() {
 const API_URL = 'http://localhost:3000/items';
 const [items, setItems] = useState([]);
 const[newItem, setNewItem] = useState('')
 const[search, setSearch] = useState('')
 
 useEffect(() =>{
   const fetchItems =async() => {
    try{
      const response =await fetch(API_URL);
      console.log(response)
      const listItems =await response.json();
      setItems(listItems);
    }
    catch(err){
      console.log(err.stack)
    }
  }
  
  (async()=> await fetchItems())()
 }, [])

 const addItem = (item) => {
  const id=items.length?items[items.length-1].id+1:1;
  const addNewItem = {id,checked:false,item}
  const listItems =[...items,addNewItem]
  setItems(listItems)
  localStorage.setItem("todo_list",JSON.stringify(listItems))
 }

  const handleCheck= (id) => {
    const listItems= items.map((item) =>
    item.id ===id? {...item,checked:!item.checked}:item
    )
    setItems(listItems)
    localStorage.setItem("todo_list",JSON.stringify(listItems))
  }

  const handleDelete = (id) =>{
    const deleteItems = items.filter((item)=>
    item.id!==id
    )
    setItems(deleteItems)
    localStorage.setItem("todo_list",JSON.stringify(deleteItems))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('submitted')
    if(!newItem) return;
    addItem(newItem)
    setNewItem('')
  }

  
  return (
    <div className="App">
        <Header title = "Kishore's To do List" />
        <Content 
          items={items.filter(item => ((item.item).toLowerCase()).includes(search.toLowerCase()))}
          handleCheck={handleCheck}
          handleDelete={handleDelete}
        />
        <AddItem
          newItem ={newItem}
          setNewItem = {setNewItem}
          handleSubmit = {handleSubmit}
        />
        <SearchItem
          search={search}
          setSearch={setSearch}

        />
        <Footer 
          length = {items.length}
        />
    </div>

  );
}

export default App;
