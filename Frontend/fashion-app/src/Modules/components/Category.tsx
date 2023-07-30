import React from "react";
import { Container as ContainerBS } from "react-bootstrap";

const Category = () => {
  return (
    <>
      <h1 className="text-center text-info mt-3">Lets Shop</h1>
      <div className="container-fluid mx-2">
        <div className="row mt-5 mx-2">
          <div className="col-md-3" style={{ border: "3px solid red" }}>
            <button className="btn btn-warning w-100 mb-4">Hats</button>
            <button className="btn btn-warning w-100 mb-4">glasses</button>
            <button className="btn btn-warning w-100 mb-4">Jewelry</button>
            <button className="btn btn-warning w-100 mb-4">Tops</button>
            <button className="btn btn-warning w-100 mb-4">Pants</button>
            <button className="btn btn-warning w-100 mb-4">shoes</button>
          </div>
          <div className="col-md-9" style={{ border: "3px solid green" }}>
            <div className="row">
              <div className="col-md-4 mb-4">
                <div className="card">
                  <img
                    className="card-img-top"
                    src="..."
                    alt="Card image cap"
                  />
                  <div className="card-body">
                    <h5 className="card-title">Card title</h5>
                    <p className="card-text">
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </p>
                    <a href="#" className="btn btn-primary">
                      Go somewhere
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card">
                  <img
                    className="card-img-top"
                    src="..."
                    alt="Card image cap"
                  />
                  <div className="card-body">
                    <h5 className="card-title">Card title</h5>
                    <p className="card-text">
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </p>
                    <a href="#" className="btn btn-primary">
                      Go somewhere
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card">
                  <img
                    className="card-img-top"
                    src="..."
                    alt="Card image cap"
                  />
                  <div className="card-body">
                    <h5 className="card-title">Card title</h5>
                    <p className="card-text">
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </p>
                    <a href="#" className="btn btn-primary">
                      Go somewhere
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card">
                  <img
                    className="card-img-top"
                    src="..."
                    alt="Card image cap"
                  />
                  <div className="card-body">
                    <h5 className="card-title">Card title</h5>
                    <p className="card-text">
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </p>
                    <a href="#" className="btn btn-primary">
                      Go somewhere
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Category;
