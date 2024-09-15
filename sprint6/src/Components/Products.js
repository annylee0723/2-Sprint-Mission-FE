// 함수명은 동사, 대문자 시작 안하게 조심
// totalProducts도 함수명 수정
// console.log 다 삭제하기
//await 함수 usecallbak으로 감싸기

import "./Product.css";
import { getProducts, getTotalCount } from "../api.js";
import { Link } from "react-router-dom";
import magnifier from "../assets/ic_search.png";
import defaultImage from "../assets/defaultImg.png";
import rightArrow from "../assets/arrow_active_right.png";
import leftArrow from "../assets/arrow_active_left.png";
import { useEffect, useState } from "react";

function formatPrice(amount) {
  return amount.toLocaleString();
}

export default function Products() {
  const [items, setItems] = useState([]);
  const [totalPages, setTotalPages] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pagingPages, setPagingPages] = useState([]); // 5개씩 paging
  const [pageSize, setPageSize] = useState(10); // 초기값 4로 설정

  function getProductList() {
    getProducts(currentPage, pageSize, search, "recent").then((productlist) => {
      console.log("curP", currentPage);
      setItems(productlist);
    });
  }

  function getTotalItemCount() {
    getTotalCount(currentPage, pageSize, search, "recent").then((productlist) => {
      setTotalPages(Math.ceil(productlist / 10));
    });
  }

  function getTotalPages() {
    getTotalCount(currentPage, pageSize, search, "recent").then((productlist) => {
      const pageArray = [];
      for (let i = 1; i <= productlist; i++) {
        pageArray.push(i);
      }
      let start = currentPage - 1;
      let end = start + 5;
      const pageSlice = pageArray.slice(start, end);
      setPagingPages(pageSlice);
    });
  }

  const handleSearchItem = (e) => {
    console.log(e.target.value);
    setSearch(e.target.value);
  };

  const handleNextPage = (e) => {
    if (currentPage < totalPages) {
      let nextpage = currentPage + 1;
      setCurrentPage(nextpage);
    }
  };

  const handleBeforePage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    getProductList();
    getTotalItemCount();
    getTotalPages();
  }, [search, currentPage]);

  return (
    <section>
      <div className="productsTool">
        <h1 className="header">판매 중인 상품</h1>
        <div id="searchAndSort">
          <div className="searchBar">
            <img src={magnifier} alt="Magnifier" />
            <input
              onInput={handleSearchItem}
              id="searchInput"
              type="text"
              placeholder="검색할 상품을 입력해주세요"
              value={search}
            />
          </div>
          <Link to="/registration">
            <button id="addProduct">상품 등록하기</button>
          </Link>
          <div className="selectContainer">최신순</div>
        </div>
      </div>
      <ul className="productsListing">
        {items.map((item) => {
          return (
            <li className="productsContainer" key={item._id}>
              <img className="productImg" src={item.images || defaultImage} alt={`the picture of ${item.title}`} />
              <p className="name">{item.name}</p>
              <p className="price"> {formatPrice(item.price)}원</p>
              <p className="like">♡ {item.favoriteCount}</p>
            </li>
          );
        })}
      </ul>
      <div className="pageButtons">
        <img className="arrowButton" src={leftArrow} onClick={handleBeforePage} />
        {pagingPages.map((page) => (
          <button
            key={page}
            className={`pageButton ${currentPage === page ? "active" : ""}`}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </button>
        ))}
        <img className="arrowButton" src={rightArrow} onClick={handleNextPage} />
      </div>
    </section>
  );
}
