import "./Header.css"
import  MoonIcon  from '/assets/icon-moon.svg'
import SunIcon from '/assets/icon-sun.svg'
import { ThemeContext } from "../../App";
import { useContext } from "react";
function Header() {
  const { theme, changeTheme } = useContext(ThemeContext);

  function toggleTheme() {
    changeTheme(theme === 'light' ? 'dark' : 'light');
  }
  return (
    <header>
      <h2>devfinder</h2>
      <button onClick={toggleTheme}>
        <span>{theme}</span>
        <img src={theme === 'light' ? MoonIcon : SunIcon} alt={`${theme} icon` }/>
      </button>
    </header>
  );
}
export default Header;
