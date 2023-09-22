import { Link } from "react-router-dom";
import Users from "./Users";

const Admin = () => {
  return (
    <section>
      <h1>Admins Page</h1>
      <br />
      <p>You must have been assigned an Admin role.</p>
      <Users />
      <br />
      <div
        style={{
          flexGrow: 1,
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-end",
        }}
      >
        <div>
          <Link to="/">Home</Link>
          <br />
          <Link to="/avivohayon/fashionai/">Fashion AI</Link>
        </div>
      </div>
    </section>
  );
};

export default Admin;
