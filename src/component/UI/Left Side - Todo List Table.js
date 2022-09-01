import React, { useState, useEffect } from "react";
import Card from "./Card";
import './Leftside.css'


function Todolist() {

  const [userData, setUserdata] = useState([]);
  const [filterData, setFilterdata] = useState([]);
  const [query, setQuery] = useState('');
  

  useEffect(() => {
    const getuserdata = async () => {
      const reqData = await fetch("https://jsonplaceholder.typicode.com/todos");
      const resData = await reqData.json();
      // console.log(resData);
      setUserdata(resData);
      setFilterdata(resData);
    }
    getuserdata();
  }, []);

  const handersearch = (event) => {
    const getSearch = event.target.value;

    if (getSearch.length > 0) {
      const searchdata = userData.filter((item) => item.title.toLowerCase().includes(getSearch));
      setUserdata(searchdata);
    } else {
      setUserdata(filterData);
    }
    setQuery(getSearch);
  }
 
   


  
  return (
    <>
      <Card>
        <nav class="navbar navbar-light bg-light justify-content-between">
          <h1 class="navbar-brand">Todos</h1>
          <form class="form-inline">
            <input class="form-control mr-sm-2" type="search" value={query} onChange={(e) => handersearch(e)} placeholder="Search" aria-label="Search" />
            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
          </form>
        </nav>
        <div className="list">
          <ul class="list-group ">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col" >ToDoID</th>
                  <th scope="col">Title</th>
                  <th scope="col">Status</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  userData.map((getuser) => (
                    <tr>
                      <th scope="row">{getuser.id}</th>
                      <td>{getuser.title}</td>
                      <td>Completed</td>
                      <td><button type="button" class="btn btn-outline-success">View user</button></td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </ul>
        </div>
      </Card>

    </>

  );
}

export default Todolist;