import React, { useState, useEffect } from "react";

const App = () => {
  const [page, SetPage] = useState(1);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchApi = async () => {
    try {
      const response = await fetch(
        `https://dummyjson.com/products?limit=3&skip=${page}`
      );
      const data = await response.json();

      setData((prev) => [...prev, ...data.products]);
    } catch (error) {
      console.error(error, "Something Went Wrong!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApi();

    const handleScroll = () => {
      const {
        scrollTop,
        scrollHeight,
        clientHeight,
      } = document.documentElement;
      console.log(scrollTop, "ScrollTop");
      console.log(scrollHeight, "ScrollHeight");
      console.log(clientHeight, "ClientHeight");

      if (scrollTop + clientHeight >= scrollHeight) {
        SetPage((page) => page + 1);

        console.log(page, "Page");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [page]);
  console.log(data);
  return (
    <>
      <div class="container">
        {data.map((i) => (
          <>
            <div class="product">
              <div class="product-card">
                <h2 class="name">{i.title}</h2>
                <span class="price">Rs.{i.price}0</span>
                <a class="popup-btn">Add to Cart</a>
                <img src={i.thumbnail} class="product-img" alt="" />
              </div>
              <div class="popup-view">
                <div class="popup-card">
                  <a>
                    <i class="fas fa-times close-btn"></i>
                  </a>
                  <div class="product-img">
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWMO0Vkxle2JPdwrPh8ixM1arC0pXpD4ov1g&usqp=CAU"
                      alt=""
                    />
                  </div>
                  <div class="info">
                    <h2>
                      Cannon Camera
                      <br />
                      <span>Classic Camera</span>
                    </h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                    <span class="price">$250.00</span>
                    <a href="#" class="add-cart-btn">
                      Add to Cart
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </>
        ))}
      </div>
    </>
  );
};

export default App;
