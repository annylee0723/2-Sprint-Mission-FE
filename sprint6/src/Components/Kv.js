import kvImg from "../assets/Img_home_top.png";

// KV = Key Visual
export default function Kv() {
  return (
    <>
      <div className="kv-text">
        <h1 classNAme="headline-heading" id="kv-head">
          일상의 모든 물건을 <br /> 거래해 보세요
        </h1>
        <a href="items">
          <button className="view">구경하러 가기</button>
        </a>
      </div>
      <div>
        <img src={kvImg} alt="A panda shake a hand" />
      </div>
    </>
  );
}
