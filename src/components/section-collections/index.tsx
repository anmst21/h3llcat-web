import { LandingForward } from "../icon";

export default function SectionCollections() {
  return (
    <div className="section-collections">
      <div className="corner-grid">
        <div
          className="grid-item"
          style={{
            backgroundColor: "#010101",
            borderTopRightRadius: 1000,
            width: "37px",
            height: "37px",
          }}
        ></div>
        <div
          className="grid-item"
          style={{
            backgroundColor: "#FFCC00",
            width: "47px",
            height: "37px",
          }}
        >
          2
        </div>
        <div className="grid-item" style={{ width: "37px", height: "37px" }}>
          3
        </div>
        <div
          className="grid-item"
          style={{
            backgroundColor: "#010101",
            width: "37px",
            height: "47px",
          }}
        ></div>
        <div
          className="grid-item"
          style={{
            backgroundColor: "#010101",
            width: "47px",
            height: "47px",
          }}
        >
          5
        </div>
        <div className="grid-item" style={{ width: "37px", height: "47px" }}>
          6
        </div>
        <div
          className="grid-item"
          style={{
            backgroundColor: "#010101",
            width: "37px",
            height: "37px",
          }}
        ></div>
        <div
          className="grid-item"
          style={{
            backgroundColor: "#010101",
            width: "47px",
            height: "37px",
          }}
        ></div>
        <div
          className="grid-item"
          style={{
            backgroundColor: "#010101",
            borderTopRightRadius: 1000,
            width: "37px",
            height: "37px",
          }}
        ></div>
        <div className="grid-item grid-item-10">
          <div className="circle">
            <LandingForward />
          </div>
        </div>
      </div>
    </div>
  );
}
