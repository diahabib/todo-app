import moon_icon from "../assets/icon-moon.svg";
import sun_icon from "../assets/icon-sun.svg";

const Header = ({
  darkMode,
  toggleDarkMode,
}: {
  darkMode: boolean;
  toggleDarkMode: () => void;
}) => {
  return (
    <header className="flex justify-between  lg:items-center">
      <h1 className="text-white text-4xl font-extrabold">TODO</h1>
      <button onClick={toggleDarkMode}>
        <img src={darkMode ? sun_icon : moon_icon} alt="theme icon" />
      </button>
    </header>
  );
};

export default Header;
