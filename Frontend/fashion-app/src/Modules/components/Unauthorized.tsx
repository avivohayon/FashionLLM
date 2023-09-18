import { useNavigate } from "react-router-dom";

import React from "react";

export const Unauthorized = () => {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  return (
    <section>
      <h1>Unauthorized</h1>
      <br />
      <p>You do not have access to the requested page</p>
      <div
        style={{
          flexGrow: 1,
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-end",
        }}
      >
        <button onClick={goBack}>Go Back</button>
      </div>
    </section>
  );
};
