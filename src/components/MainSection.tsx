import React, { useEffect } from "react";

export default function MainSection() {
  useEffect(() => {}, []);

  return (
    <section className="l-section main-section">
      <div className="card-box _flex_">
        <div className="card__face">
          <p className="face">unconsciousness</p>
        </div>
        <div className="card__text">
          <p className="text">
            The interface
            <br />
            between
            <br />
            memory and imaging
          </p>
        </div>
      </div>
    </section>
  );
}
