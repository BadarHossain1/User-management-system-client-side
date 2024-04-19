import { useState } from "react";
import "./App.css";
import { useEffect } from "react";

function App() {
  const [users, setUsers] = useState([]);


  const handleAddUser = (e) =>{
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const user = { name, email};
    console.log(user);

    fetch('http://localhost:5000/users' ,{
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(user)

    })
    .then(res => res.json())
    .then(data => {
       console.log('inside post response', data)
       const newUsers = [...users, data];
       setUsers(newUsers)
  });


  }

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  return (
    <>
      <h1>Users management system</h1>
      <p>Numbers of users {users.length}</p>
      <form onSubmit={handleAddUser}>
        <input type="text" name="name" required />
        <br />
        <input type="email" name="email" />
        <br />
        <br />
        <input type="submit" name="Add user" />
        <br />
      </form>
      <div>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} and {user.email}
          </li>
        ))}
      </div>
    </>
  );
}

export default App;
