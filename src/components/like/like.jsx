import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Btn,
  DowIC,
  CustomIC,
  HeaderIC,
  ActiveLike,
  LikeMain,
  Pausebtn,
  Playbtn,
} from "../../constants";
import "../playlist/playlist.scss";
import likeIMg from "../../assets/Like.png";
const LikeComponent = () => {
  const { id } = useParams();
  const url = window.location.href;
  const urlApi = url?.split("?type=")[1];
  const [data, setData] = useState(null);

  
  const unlike = (id) => {
    let playlistLike = JSON.parse(localStorage.getItem("like")) || [];
    let updatedData = playlistLike.filter((item) => item.id !== id);
    setData(updatedData);
    localStorage.setItem("like", JSON.stringify(updatedData));
  };

  useEffect(() => {
    const like = JSON.parse(localStorage.getItem("like")) || [];
    setData(like);
  }, [id, urlApi]);

  return (
    <>
      <div className="container">
        <div
          className="playlist"
          style={{
            background: `linear-gradient(180deg, #3333a3 5.09%, #121212 33.4%) `,
          }}>
          <>
            <div
              className="playlist_header"
              style={{
                background: `linear-gradient(180deg, #3333a3 100%, #12121200 0%) `,
              }}>
              <button className="btn">
                <Btn />
              </button>
              <button className="btn">
                <Btn />
              </button>
            </div>

            <div className="playlist_carts">
              <div className="play_left">
                <img src={likeIMg} alt="" />
              </div>
              <div className="play_right">
                <p>PUBLIC PLAYLIST</p>
              </div>
            </div>
            <div className="play_btns">
              <div className="buttons">
                <button className={`play_btn ${true === true ? "active" : ""}`}>
                  {false && false ? <Pausebtn /> : <Playbtn />}
                </button>
                <button className="likeIC liked">
                  <LikeMain />
                </button>
                <button className="Dowenload">
                  <DowIC />
                </button>
                <button className="nuqta">...</button>
              </div>
              <span className="filter">
                <CustomIC />
              </span>
            </div>
            <div className="albums">
              <HeaderIC />
              <div className="albums-Cars">
                {data?.map((el, i) => (
                  <div className="albums-Cart" key={i}>
                    <span style={{ color: "#B3B3B3" }}>
                      {i + 1}
                      <img src={el?.images[0].url} alt="" />
                      <p>
                        <p key={i}>{el?.name}</p>
                      </p>
                    </span>
                    <p className="p1">{el?.name}</p>
                    <p className="p2">
                      <span onClick={() => unlike(el?.id)}>
                        <ActiveLike />
                      </span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </>
        </div>
      </div>
    </>
  );
};

export default LikeComponent;
