import { createContext, useEffect, useState } from "react";
import "./App.css";
import Header from "./Components/Header/Header";
import SearchForm from "./Components/SearchForm/SearchForm";
import UserInfo from "./Components/UserInfo/UserInfo";

export const ThemeContext = createContext(null);

function App() {
  const [theme, setTheme] = useState("light");
  const [userName,setUserName] = useState('octocat')
  const [userData , setUserData] = useState(null);

  function changeTheme(themeValue){
    setTheme(themeValue);
    document.getElementById('root').classList.toggle('dark', themeValue === "dark");
  }
  useEffect(() => {
    function CallApi() {
      fetch(`https://api.github.com/users/${userName}`)
        .then((response) => {
          return response.json();
        })
        .then((finalResult) => {
          setUserData(finalResult);
        });
    }
    CallApi();
  }, [userName]);

  function updateUsername(username){
    setUserName(username)
  };

  return (
    <>
      <ThemeContext.Provider value={{theme,changeTheme }}>
        <main>
          <Header />
          <SearchForm handleUserName={updateUsername}/>
          <UserInfo userData={userData}/>
        </main>
      </ThemeContext.Provider>
    </>
  );
}

export default App;
