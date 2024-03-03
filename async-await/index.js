// Definicja funkcji asynchronicznej
const fetchUser = async () => {
  try {
    // Wysyłanie żądania GET do API
    const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
    
    // Sprawdzanie, czy żądanie zostało pomyślnie wykonane
    if (!response.ok) {
      throw new Error('Nie udało się pobrać danych użytkownika');
    }
    
    // Przekształcanie odpowiedzi na JSON
    const user = await response.json();
    
    // Wyświetlanie imienia użytkownika w konsoli
    console.log(`Imię użytkownika: ${user.name}`);
  } catch (error) {
    // Obsługa błędów, np. problem z siecią lub z API
    console.error(`Wystąpił błąd: ${error.message}`);
  }
};

// Wywołanie funkcji
fetchUser();
