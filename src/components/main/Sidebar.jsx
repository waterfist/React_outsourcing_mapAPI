import React from "react";
import styled from "styled-components";
import { MdLocationOn, MdInfoOutline } from "react-icons/md";
import { GiRotaryPhone } from "react-icons/gi";
import { BiSearchAlt } from "react-icons/bi";
import { BACKGROUND_COLOR, POINT_COLOR, PROJECT_COLOR } from "../../color";
import { useNavigate } from "react-router-dom";
import Bookmark from "../Bookmark";

const Sidebar = ({ text, setText, setPlace, places }) => {
  const navigate = useNavigate();

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setPlace(text);
    setText("");
  };

  // 디테일 페이지에서 뒤로 가기 클릭시 검색 결과 유지
  // 검색 결과 클릭시 지도 인포윈도우 반환

  return (
    <List>
      <Title>
        WHAT<span style={{ color: PROJECT_COLOR }}>NYANG</span>
      </Title>
      <form onSubmit={onSubmitHandler}>
        <Search>
          <SearchInput value={text} onChange={(e) => setText(e.target.value)} />
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
      {places.length > 0 ? (
        <Place>
          <h2>결과</h2>
          <PlaceCount>{places.length}</PlaceCount>
        </Place>
      ) : null}
      {places.map((item, i) => (
        <PlaceList key={i}>
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
            <MdInfoOutline style={{ margin: "0 5px -2px 0" }} />
            상세보기
          </PlaceLink>
        </PlaceList>
      ))}
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

export default Sidebar;

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
`;

const Search = styled.div`
  width: 100%;
`;

const SearchInput = styled.input`
  width: 80%;
  height: 25px;
  margin-bottom: 30px;
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

const PlaceLink = styled.div`
  font-size: 15px;
  font-weight: 300;
  margin-top: 5px;
  cursor: pointer;
  transition: 0.1s ease-out;
  &:hover {
    color: ${POINT_COLOR};
    transition: 0.1s ease-out;
  }
`;
