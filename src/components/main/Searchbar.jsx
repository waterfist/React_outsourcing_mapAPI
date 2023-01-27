import React, { useState } from "react";
import styled from "styled-components";
import { MdLocationOn } from "react-icons/md";
import { GiRotaryPhone } from "react-icons/gi";
import { BiSearchAlt } from "react-icons/bi";
import { BACKGROUND_COLOR, POINT_COLOR, PROJECT_COLOR } from "../../color";
import { useNavigate } from "react-router-dom";
import Bookmark from "../Bookmark";
import Reviews from "./Reviews";

const Searchbar = ({ setInfo, isOpen, setIsOpen, setPlace }) => {
  const [text, setText] = useState("");
  const navigate = useNavigate();

  const searchPlace = JSON.parse(sessionStorage.getItem("SearchPlace"));
  const searchKeyword = sessionStorage.getItem("SearchKeyword");

  const onResetPlace = () => {
    window.location.reload();
    sessionStorage.clear();
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setPlace(text);
    setText("");
  };

  const onFilteredMarker = (item) => {
    const filteredData = {
      position: {
        lat: item.y,
        lng: item.x,
      },
      place_name: item.place_name,
      address_name: item.address_name,
    };
    setInfo(filteredData);
    setIsOpen(!isOpen);
  };

  return (
    <List>
      <Title onClick={onResetPlace}>
        WHAT<span style={{ color: PROJECT_COLOR }}>NYANG</span>
      </Title>
      <form onSubmit={onSubmitHandler}>
        <Search>
          <SearchInput
            value={text}
            placeholder="ex) 삼성역 안과"
            onChange={(e) => setText(e.target.value)}
          />
          <SearchBtn type="submit">
            <BiSearchAlt
              style={{
                fontSize: "30px",
                marginBottom: "-12px",
              }}
            />
          </SearchBtn>
        </Search>
      </form>
      {searchKeyword ? (
        <Place>
          <h2>'{searchKeyword}' 결과</h2>
          <PlaceCount>{searchPlace?.length}</PlaceCount>
        </Place>
      ) : (
        <h2>어디로 떠날지 고민되시나요?</h2>
      )}
      {searchPlace ? (
        searchPlace.map((item, i) => (
          <PlaceList key={i} onClick={() => onFilteredMarker(item)}>
            <Bookmark item={item} />
            <PlaceName>{item.place_name}</PlaceName>
            {item.road_address_name ? (
              <>
                <PlaceInfo>
                  <MdLocationOn style={{ marginBottom: "-2px" }} />{" "}
                  {item.address_name}
                </PlaceInfo>
                <PlaceInfoRoadAddress>
                  (도로명: {item.road_address_name})
                </PlaceInfoRoadAddress>
              </>
            ) : (
              <PlaceInfo>
                <MdLocationOn /> {item.address_name}
              </PlaceInfo>
            )}
            {item.phone ? (
              <PlaceInfo>
                <GiRotaryPhone style={{ margin: "0 5px -2px 0" }} />
                {item.phone}
              </PlaceInfo>
            ) : null}
            <PlaceLink
              onClick={() => {
                navigate(`/detail/${item.id}`, { state: item });
              }}
            >
              정보 보기
            </PlaceLink>
          </PlaceList>
        ))
      ) : (
        <Reviews />
      )}
      <div
        id="pagination"
        style={{
          fontSize: "25px",
          fontWeight: "bold",
          letterSpacing: "20px",
          textAlign: "center",
          marginBottom: "30px",
        }}
      />
    </List>
  );
};

export default Searchbar;

const List = styled.div`
  width: 23%;
  height: 100vh;
  box-shadow: 3px 3px 3px #dddddd;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  padding: 0 40px;
  z-index: 999;
  overflow-y: auto;
  font-family: GmarketSans;
`;

const Title = styled.h1`
  font-size: 40px;
  font-weight: 900;
  cursor: pointer;
`;

const Search = styled.div`
  width: 100%;
`;

const SearchInput = styled.input`
  width: 80%;
  height: 25px;
  margin-bottom: 30px;
  padding-left: 5px;
  &:focus {
    box-shadow: none;
  }
`;

const SearchBtn = styled.button`
  border: none;
  background: none;
  cursor: pointer;
`;

const Place = styled.div`
  display: flex;
  align-items: center;
`;

const PlaceCount = styled.span`
  color: #a3a3a3;
  font-size: 20px;
  margin-left: 10px;
`;

const PlaceList = styled.div`
  margin: 0 0 10px -10px;
  padding: 10px 10px;
  transition: 0.1s ease-out;
  cursor: pointer;
  border-radius: 10px;
  &:hover {
    background-color: ${BACKGROUND_COLOR};
    transition: 0.1s ease-out;
  }
`;

const PlaceName = styled.span`
  font-size: 18px;
  font-weight: 500;
  margin-top: -1px;
`;

const PlaceInfo = styled.div`
  font-size: 15px;
  font-weight: 300;
  margin-top: 5px;
`;

const PlaceInfoRoadAddress = styled.div`
  font-size: 12px;
  font-weight: 300;
  margin: 3px 0 0 22px;
`;

const PlaceLink = styled.button`
  font-size: 15px;
  font-family: GmarketSans;
  margin-top: 7px;
  padding: 5px 10px;
  border: 1px solid ${POINT_COLOR};
  border-radius: 50px;
  background-color: ${BACKGROUND_COLOR};
  color: ${POINT_COLOR};
  cursor: pointer;
  transition: 0.1s ease-out;
  &:hover {
    transition: 0.1s ease-out;
    background-color: ${POINT_COLOR};
    color: white;
  }
`;
