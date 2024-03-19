// // Promise<Pending> -> undefined
// const fetchUsers = async () => {
//   const response = await fetch("https://jsonplaceholder.typicode.com/users");
//   const users = await response.json();
//   return users;
// };

// fetchUsers().then(users => console.log(users))


// const fetchUsers = async () => {
//     const response = await fetch("https://jsonplaceholder.typicode.com/users");
//     const users = await response.json();
//     return users;
//    };
   
//    const doStuff = async () => {
//     const users = await fetchUsers();
//     console.log(users);
//    };
   
//    doStuff();
   
const fetchUsers = async () => {
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/users");
      const users = await response.json();
      console.log(users);
    } catch (error) {
      console.log(error.message);
    }
  };
  
  fetchUsers();