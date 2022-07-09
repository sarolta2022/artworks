import { useEffect, useState } from "react";
import ImgContainer from "../imgContainer/ImgContainer";

const Images = (props) => {
  const [images, setImages] = useState([]);
  useEffect(() => {
    fetch(
      `https://pixabay.com/api/?key=18531241-5dd0290a918badee608ecff65&q=${props.searchValue}`
    )
      .then((res) => res.json())
      .then((data) => setImages(data.hits))
      .catch((err) => console.log(err));
  }, [props.query]);
  console.log(images);
  return <ImgContainer images={images} fav={props.fav} />;
};

export default Images;
