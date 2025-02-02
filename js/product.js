let shop = document.getElementById("shop");

let basket = JSON.parse(localStorage.getItem("data")) || [];

let generateShop = () => {
  return (shop.innerHTML = shopItemsData
    .map((x) => {
      let { id, name, price, desc, img } = x;
      let search = basket.find((x) => x.id === id) || [];
      return `
    <div></div>
    <div id=product-id-${id} class="item">
        <div>         
          <h5 style="padding-bottom: 10px">THÔNG TIN SẢN PHẨM</h5>
        </div>
        <div style="display:flex; flex-direction: row;">
          <div style="min-width:20%;">
            <img style="width:100%" src=${img} alt="">
          </div>
          <div class="details">
            <!--
              <h3>${name}</h3>
            -->
            <p style="font-size:small">${desc}</p>
            <div class="price-quantity" 
            style="min-width: 40%; max-width:80%;">
              <h2>${numbWithComma(price)} đ</h2>
              <div class="buttons">
                <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                <div id=${id} class="quantity">
                ${search.item === undefined ? 0 : search.item}
                </div>
                <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
              </div>
            </div>
            <a href="./cart.html"
            style="border-radius:15px; min-width: 40%; max-width:80%; padding:10px; background: lightgray;">
            <div class="buttons">          
                <i class="bi bi-cart2"></i>
                <b>MUA NGAY</b>          
            </div>
            </a>
          </div>
        </div>
      </div>
    `;
    })
    .join(""));
};

generateShop();

let increment = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) {
    basket.push({
      id: selectedItem.id,
      item: 1,
    });
  } else {
    search.item += 1;
  }

  // console.log(basket);
  update(selectedItem.id);
  localStorage.setItem("data", JSON.stringify(basket));
};

let decrement = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) return;
  else if (search.item === 0) return;
  else {
    search.item -= 1;
  }
  update(selectedItem.id);
  basket = basket.filter((x) => x.item !== 0);
  // console.log(basket);
  localStorage.setItem("data", JSON.stringify(basket));
};

let update = (id) => {
  let search = basket.find((x) => x.id === id);
  // console.log(search.item);
  document.getElementById(id).innerHTML = search.item;
  calculation();
};

let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();
