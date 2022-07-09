import { useContext } from "react";
import { userContext } from "../../context/UserContext";
import { BsDownload } from "react-icons/bs";
import { AiOutlineLike, AiOutlineTag } from "react-icons/ai";
import { BiUser } from "react-icons/bi";
import { GrView } from "react-icons/gr";
import { useNavigate } from "react-router-dom";

import "./SingleImage.css";

function SingleImage() {
  const { actualImage, user, setUser, fav } = useContext(userContext);
  console.log(actualImage);
  const navigate = useNavigate();

  const saveToDbFavs = () => {
    console.log(actualImage.largeImageURL);
    return fetch("http://localhost:8000/api/favourites", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        email: user.email,
        id: actualImage.id,
        url: actualImage.largeImageURL,
        tags: actualImage.tags,
      }),
      //body: JSON.stringify({ actualImage }),
    })
      .then((res) => {
        if (res.ok) {
          setUser({
            ...user,
            favs: [
              ...user.favs,
              {
                url: actualImage.largeImageURL,
                tags: actualImage.tags,
                id: actualImage.id,
              },
            ],
          });
          return res.json();
        }
        return new Error("fetch wasn't successfull");
      })
      .then((data) => console.log("data:", data))
      .then(() => {
        navigate("/favourites");
      });
  };

  return (
    <section>
      <div className="SingleImage">
        <div className="singleImage_img">
          {fav ? (
            <img src={actualImage.url} alt={actualImage.tags} />
          ) : (
            <img src={actualImage.largeImageURL} alt={actualImage.tags} />
          )}

          {fav ? null : (
            <button onClick={saveToDbFavs}>Add to Favourites</button>
          )}
        </div>
        {fav ? null : (
          <div className="singleImage_text">
            <p>
              <BsDownload className="icon" /> Downloads :{" "}
              {actualImage.downloads.toLocaleString()}
            </p>
            <p>
              <AiOutlineLike className="icon" /> Likes :{" "}
              {actualImage.likes.toLocaleString()}
            </p>
            <p>
              <BiUser className="icon" /> Uploader : {actualImage.user}
            </p>
            <p>
              <AiOutlineTag className="icon" /> Tags : {actualImage.tags}
            </p>
            <p>
              <GrView className="icon" /> Views :{" "}
              {actualImage.views.toLocaleString()}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default SingleImage;
