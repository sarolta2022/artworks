import { useContext } from "react";
import { Link } from "react-router-dom";
import { userContext } from "../../context/UserContext";
import { AiOutlineTag } from "react-icons/ai";

import "./imgContainer.css";

function ImgContainer({ images, fav }) {
  const { setActualImage, setFav } = useContext(userContext);
  console.log(images);

  const clickHandler = (img) => {
    setActualImage(img);
    setFav(fav);
    console.log(img);
  };

  return (
    <div className="ImgContainer">
      {fav
        ? images.map((img, index) => (
            <div key={index}>
              <Link to={`/images/${img.id}`}>
                <img
                  src={img.url}
                  onClick={() => {
                    clickHandler(img);
                  }}
                  alt=""
                />
              </Link>
              <p className="tags">
                <AiOutlineTag className="icon" />
                <span className="actual-tags">{img.tags}</span>
              </p>
            </div>
          ))
        : images.map((img) => (
            <Link to={`/images/${img.id}`} key={img.id}>
              <img
                src={img.largeImageURL}
                onClick={() => {
                  clickHandler(img);
                }}
                alt=""
              />
            </Link>
          ))}
    </div>
  );
}

export default ImgContainer;
