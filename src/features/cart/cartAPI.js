export function addToCart(item) {
  return new Promise(async (resolve) => {
    const response = await fetch('https://ecommerce-backend-psi-eight.vercel.app/cart', {
      method: 'POST',
      body: JSON.stringify(item),
      headers: { 'content-type': 'application/json' },
    });
    const data = await response.json();
    // TODO: on server it will only return some info of user (not password)
    resolve({ data });
  });
}

export function fetchItemsByUserId(userId) {
  return new Promise(async (resolve) => {
    //TODO:  we will not hard-code server URL here
    const response = await fetch("https://ecommerce-backend-psi-eight.vercel.app/cart?user="+userId);
    const data = await response.json();
    resolve({ data });
  });
}

export function updateCart(update) {
  return new Promise(async (resolve) => {
    const response = await fetch('https://ecommerce-backend-psi-eight.vercel.app/cart/'+update.id, {
      method: 'PATCH',
      body: JSON.stringify(update),
      headers: { 'content-type': 'application/json' },
    });
    const data = await response.json();
    // TODO: on server it will only return some info of user (not password)
    resolve({ data });
  });
}
export function deleteItemsFromCart(itemId) {
  return new Promise(async (resolve) => {
    const response = await fetch('https://ecommerce-backend-psi-eight.vercel.app/cart/'+itemId, {
      method: 'DELETE',
      headers: { 'content-type': 'application/json' },
    });
    const data = await response.json();
    // TODO: on server it will only return some info of user (not password)
    resolve({data:{id:itemId}});
  });
}
export function resetCart(userId){
  return new Promise(async (resolve)=>{
    const response = await fetchItemsByUserId(userId);
    const items = response.data;
    for(let item of items){
      await deleteItemsFromCart(item.id);
    }
    resolve({status:'success'})
  })
}
