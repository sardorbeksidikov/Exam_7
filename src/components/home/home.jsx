import React, { useEffect, useState } from "react";
import "./home.scss";
import { Btn } from "../../constants";
import ProductCard from "../card/card";
import { getPlaylists, getToken } from "../../api";
import {
  FEATURED_PLAY,
  JUMP,
  MADE_FOR_YOU,
  PLAYED_RECENT,
  Tracks,
  YOUR_UNIQUELY,
  PLAY_LITS_TOP,
} from "../../api/api.service";

const HomeComponent = () => {
  const tokenURl = "https://accounts.spotify.com/api/token";
  const [FEATURED_playlistsData, setFEATURED_playlists] = useState(null);
  const [YOUR_TOPData, setYOUR_TOP] = useState(null);
  const [RECENT_PLAYEDData, setRECENT_PLAYED] = useState(null);
  const [MADE_FOR_YOUData, setMADE_FOR_YOU] = useState(null);
  const [JUMP_BACK_INData, setJUMP_BACK_IN] = useState(null);
  const [UNIQUELY_YOURSData, setUNIQUELY_YOURS] = useState(null);
  const [TracksData, setTracks] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getToken(tokenURl);
        await getPlaylists(FEATURED_PLAY).then((res) => {
          setFEATURED_playlists(res?.playlists?.items);
        });
        await getPlaylists(PLAY_LITS_TOP).then((res) => {
          setYOUR_TOP(res?.playlists?.items);
        });
        await getPlaylists(PLAYED_RECENT).then((res) => {
          setRECENT_PLAYED(res?.playlists?.items);
        });
        await getPlaylists(MADE_FOR_YOU).then((res) => {
          setMADE_FOR_YOU(res?.playlists?.items);
        });
        await getPlaylists(JUMP).then((res) => {
          setJUMP_BACK_IN(res?.playlists?.items);
        });
        await getPlaylists(YOUR_UNIQUELY).then((res) => {
          setUNIQUELY_YOURS(res?.playlists?.items);
        });
        await getPlaylists(Tracks).then((res) => {
          setTracks(res);
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container">
      <div className="home-top">
        <>
          <div className="home-top__header">
            <button className="home-btn">
              <Btn />
            </button>
            <button className="home-btn">
              <Btn />
            </button>
          </div>
          <h3 className="home-good">Good afternoon</h3>
          <div className="home-content">
            {FEATURED_playlistsData?.length > 0 &&
              FEATURED_playlistsData.slice(0, 6).map((el, i) => (
                <div className="cart" key={i}>
                  <img src={el?.images?.map((el, i) => el?.url)} alt="" />
                  <h3>{el.name}</h3>
                </div>
              ))}
          </div>
          <div className="products" style={{ marginTop: "30px" }}>
            <div className="product_title">
              <h4>Your top mixes</h4>
              <p>SEE ALL</p>
            </div>
            <div className="product_cards">
              {YOUR_TOPData?.length > 0 && (
                <ProductCard
                  data={{
                    data: YOUR_TOPData,
                    TracksData,
                    type: "playlists",
                  }}
                />
              )}
            </div>
          </div>
          <div className="products" style={{ marginTop: "30px" }}>
            <div className="product_title">
              <h4>Made for you</h4>
              <p>SEE ALL</p>
            </div>
            <div className="product_cards">
              {MADE_FOR_YOUData?.length > 0 && (
                <ProductCard
                  data={{
                    data: MADE_FOR_YOUData,
                    TracksData,
                    type: "MADE_FOR_YOU_playlists",
                  }}
                />
              )}
            </div>
          </div>
          <div className="products" style={{ marginTop: "30px" }}>
            <div className="product_title">
              <h4>Recently played</h4>
              <p>SEE ALL</p>
            </div>
            <div className="product_cards">
              {RECENT_PLAYEDData?.length > 0 && (
                <ProductCard
                  data={{
                    data: RECENT_PLAYEDData,
                    TracksData,
                    type: "RECENT_PLAYED_playlists",
                  }}
                />
              )}
            </div>
          </div>
          <div className="products" style={{ marginTop: "30px" }}>
            <div className="product_title">
              <h4>Jump back in</h4>
              <p>SEE ALL</p>
            </div>
            <div className="product_cards">
              {JUMP_BACK_INData?.length > 0 && (
                <ProductCard
                  data={{
                    data: JUMP_BACK_INData,
                    TracksData,
                    type: "JUMP_BACK_IN_playlists",
                  }}
                />
              )}
            </div>
          </div>
          <div
            className="products"
            style={{ marginTop: "30px", paddingBottom: "110px" }}>
            <div className="product_title">
              <h4>Uniquely yours</h4>
              <p>SEE ALL</p>
            </div>
            <div className="product_cards">
              {UNIQUELY_YOURSData?.length > 0 && (
                <ProductCard
                  data={{
                    data: UNIQUELY_YOURSData,
                    TracksData,
                    type: "UNIQUELY_YOURS_playlists",
                  }}
                />
              )}
            </div>
          </div>
        </>
      </div>
    </div>
  );
};

export default HomeComponent;
