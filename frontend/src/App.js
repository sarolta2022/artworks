import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState, useContext } from "react";
import { userContext } from "./context/UserContext";
import Header from "./comps/header/Header";
import SearchField from "./comps/searchField/SearchField";
import ImgContainer from "./comps/imgContainer/ImgContainer";
import Images from "./comps/Images/Images";

function App() {
  const { user } = useContext(userContext);
  const [searchValue, setSearchValue] = useState("");
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setQuery(searchValue);
  };
  return (
    <div className="App">
      <SearchField
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        handleSubmit={handleSubmit}
      />
      <Images searchValue={searchValue} query={query} fav={false} />;
    </div>
  );
}

export default App;
