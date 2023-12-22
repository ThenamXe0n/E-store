export function fetchProductsByFilter(filter,sort,pagination,admin) {
  //filter ={"category":["smartphone","laptop"]}
  // sort ={_sort:"price",_order=desc}
  //pagination = {page1,_limit=10} //_page=1&_limit=10
  let queryString = "";
  for (let key in filter) {
    const categoryValue = filter[key];
    if (categoryValue.length) {
      const lastCategoryValue = categoryValue[categoryValue.length - 1];
      queryString += `${key}=${lastCategoryValue}&`;
    }
  }
  for (let key in sort) {
    const sortValue = sort[key];
    queryString += `${key}=${sortValue}&`;    
  }

  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }
  if(admin){
    queryString += `admin=true`;
  }
  return new Promise( async (resolve) => {
    const response = await fetch(
      'http://localhost:8080/products?'+queryString);
    const data = await response.json();
    const totalItems = await response.headers.get("X-Total-Count");
    resolve({ data: { product: data, totalItems: +totalItems } });
  });
}

export function fetchAllProductById(id) {
  return new Promise(async (resolve) => {
    //TODO:  we will not hard-code server URL here
    const response = await fetch("http://localhost:8080/products/"+id);
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchCategories() {
  return new Promise(async (resolve) => {
    //TODO:  we will not hard-code server URL here
    const response = await fetch("http://localhost:8080/categories");
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchBrands() {
  return new Promise(async (resolve) => {
    //TODO:  we will not hard-code server URL here
    const response = await fetch("http://localhost:8080/brands");
    const data = await response.json();
    resolve({ data });
  });
}

export function updateProducts(update) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/products/'+update.id, {
      method: 'PATCH',
      body: JSON.stringify(update),
      headers: { 'content-type': 'application/json' },
    });
    const data = await response.json();
    // TODO: on server it will only return some info of user (not password)
    resolve({ data });
  });}

  export function createProduct(productData) {
    return new Promise(async (resolve) => {
      const response = await fetch('http://localhost:8080/products', {
        method: 'POST',
        body: JSON.stringify(productData),
        headers: { 'content-type': 'application/json' },
      });
      const data = await response.json();
      // TODO: on server it will only return some info of user (not password)
      resolve({ data });
    });
  }