import { useContext, useState } from "react";
import { userContext } from "../../context/UserContext";
import loginGuard from "../../comps/loginGuard";
import SearchField from "../../comps/searchField/SearchField";
import ImgContainer from "../../comps/imgContainer/ImgContainer";
import "./favourites.css";
function Favourites() {
  const { user } = useContext(userContext);
  const [searchValue, setSearchValue] = useState("");
  const [filtered, setFiltered] = useState(user.favs);

  const searchSubmit = (e, text) => {
    e.preventDefault();
    setFiltered(user.favs.filter((fav) => fav.tags.includes(text)));
  };
  //state => user.favs
  //str fn
  //filter()
  //filtered state
  //render filtered state

  return (
    <section className="Favourites">
      <SearchField
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        handleSubmit={(e) => {
          searchSubmit(e, searchValue);
        }}
      />
      <ImgContainer images={filtered} fav={true} />;
    </section>
  );
}

export default loginGuard(Favourites);
