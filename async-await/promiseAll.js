const fetchToDos = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos");
  return await res.json();
}
const fetchPosts = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  return await res.json();
}
const fetchUsers = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users")
  return await res.json();
}

const fetchAllData = async () => {
  try {
    // Tworzymy tablicę obietnic z naszych funkcji
    const arrayOfPromises = [fetchToDos(), fetchPosts(), fetchUsers()];
    
    // Uruchamiamy wszystkie obietnice równolegle i czekamy na ich zakończenie
    const [todos, posts, users] = await Promise.all(arrayOfPromises);
    
    // Teraz mamy dostęp do wszystkich danych jednocześnie
    console.log("Zadania:", todos);
    console.log("Posty:", posts);
    console.log("Userzy:", users);
  } catch (error) {
    // Obsługa błędów, np. jeśli któreś z żądań nie powiedzie się
    console.error("Wystąpił błąd podczas pobierania danych:", error);
  }
};

fetchAllData();