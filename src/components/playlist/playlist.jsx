import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  Btn,
  DowIC,
  CustomIC,
  HeaderIC,
  LikeMain,
  PlayGroup,
  Playbtn,
} from "../../constants";
import "./playlist.scss";
import { Audioprovider } from "../../context";
import {
  FEATURED_PLAY,
  JUMP,
  MADE_FOR_YOU,
  PLAYED_RECENT,
  Tracks,
  YOUR_UNIQUELY,
  PLAY_LITS_TOP,
} from "../../api/api.service";
import { getPlaylists, getToken } from "../../api";
const PlaylistComponent = () => {
  const { id } = useParams();
  const url = window.location.href;
  const urlApi = url?.split("?type=")[1];
  const [data, setData] = useState(null);
  const [playList, setplayList] = useState();
  const [artists, setArtists] = useState("");
  const { audio, setAudio } = useContext(Audioprovider);
  const [likeData, setlikeData] = useState([]);
  const tokenURl = "https://accounts.spotify.com/api/token";

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getToken(tokenURl);
        switch (urlApi) {
          case "playlists":
            await getPlaylists(FEATURED_PLAY).then((res) => {
              setData(res?.playlists?.items);
            });

            break;
          case "MADE_FOR_YOU_playlists":
            await getPlaylists(MADE_FOR_YOU).then((res) => {
              setData(res?.playlists?.items);
            });
            break;
          case "playlists":
            await getPlaylists(PLAY_LITS_TOP).then((res) => {
              setData(res?.playlists?.items);
            });
            break;
          case "RECENT_PLAYED_playlists":
            await getPlaylists(PLAYED_RECENT).then((res) => {
              setData(res?.playlists?.items);
            });
            break;
          case "JUMP_BACK_IN_playlists":
            await getPlaylists(JUMP).then((res) => {
              setData(res?.playlists?.items);
            });
            break;
          case "UNIQUELY_YOURS_playlists":
            await getPlaylists(YOUR_UNIQUELY).then((res) => {
              setData(res?.playlists?.items);
            });
            break;
          case "Tracks":
            await getPlaylists(Tracks).then((res) => {
              setData(res);
            });
            break;

          default:
            break;
        }

        await getPlaylists(Tracks).then((res) => {
          setArtists(res);
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [id, urlApi]);

  const like = (playList) => {
    let playlistLike = JSON.parse(localStorage.getItem("like")) || [];
    let updatedData = playlistLike.map((item) => {
      if (item.id === playList?.id) {
        return { ...item };
      }
      return item;
    });
    if (!updatedData.some((item) => item.id === playList?.id)) {
      updatedData.push({ ...playList });
    }
    localStorage.setItem("like", JSON.stringify(updatedData));
    setlikeData(updatedData);
  };

  // Unlike function
  const unlike = (id) => {
    let playlistLike = JSON.parse(localStorage.getItem("like")) || [];
    let updatedData = playlistLike.filter((item) => item.id !== id);
    setlikeData(updatedData);
    localStorage.setItem("like", JSON.stringify(updatedData));
  };

  useEffect(() => {
    const like = JSON.parse(localStorage.getItem("like")) | [];
    setlikeData(like);
  }, []);

  const handelAudioPlay = (url) => {
    localStorage.setItem("audioUrl", JSON.stringify(url));
    setAudio(url);
  };

  return (
    <>
      {data?.map((playList, i) => {
        if (playList.id === id) {
          return (
            <div className="container">
              <div
                className="playlist"
                style={{
                  background: `linear-gradient(180deg, ${playList?.primary_color} 5.09%, #121212 33.4%) `,
                }}>
                <>
                  <div className="playlist_header">
                    <button className="btn">
                      <Btn />
                    </button>
                    <button className="btn">
                      <Btn />
                    </button>
                  </div>

                  <div className="playlist_carts">
                    <div className="play_left">
                      <img
                        src={playList?.images?.map((img) => img?.url)}
                        alt=""
                      />
                    </div>
                    <div className="play_right">
                      <p>PUBLIC PLAYLIST</p>
                      <h2> {playList?.name} </h2>
                      <p className="p">{artists?.track?.name}</p>
                      <p className="p">
                        {artists?.track?.album.name}{" "}
                        {artists?.track?.album.release_date}{" "}
                        {artists?.track?.album.release_date_precision}{" "}
                      </p>
                    </div>
                  </div>
                  <div className="play_btns">
                    <div className="buttons">
                      <button className={`play_btn`}>
                        <Playbtn />
                      </button>
                      <button
                        className={`likeIC ${(() => {
                          const likedItems =
                            JSON.parse(localStorage.getItem("like")) || [];
                          const isLiked = likedItems.some(
                            (item) => item?.id === playList?.id
                          );
                          return isLiked ? "liked" : "";
                        })()}`}
                        onClick={() => {
                          const likedItems =
                            JSON.parse(localStorage.getItem("like")) || [];
                          const isLiked = likedItems.some(
                            (item) => item?.id === playList?.id
                          );
                          if (isLiked) {
                            unlike(playList?.id);
                          } else {
                            like(playList);
                          }
                        }}>
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
                      {artists?.items?.slice(0, 20)?.map((el, i) => (
                        <div className="albums-Cart" key={i}>
                          <span style={{ color: "#B3B3B3" }}>
                            {i + 1}
                            <div className="playGroup">
                              <img
                                src={el?.track?.album?.images[0].url}
                                alt=""
                              />
                              <div
                                className="playgroup_btn"
                                onClick={() => handelAudioPlay(el)}>
                                <PlayGroup />
                              </div>
                            </div>
                            <p>
                              {el?.track?.album?.artists
                                ?.slice(0, 2)
                                .map((el, i) => (
                                  <p key={i}>{el?.name}</p>
                                ))}
                            </p>
                          </span>
                          <p className="p1">
                            {el?.track?.album?.artists[0].name}
                          </p>
                          <p className="p2">
                            <span className="timeT">
                              {Math.floor(el?.track?.duration_ms / 1000 / 60)}
                              {" : "}
                              {Math.floor((el?.track?.duration_ms / 1000) % 60)}
                            </span>
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              </div>
            </div>
          );
        }
      })}
    </>
  );
};

export default PlaylistComponent;
