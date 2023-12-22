// A mock function to mimic making an async request for data
export function fetchLoggedInUser(userId) {
  return new Promise(async (resolve) => {
    const response = await fetch(https://ecommerce-backend-psi-eight.vercel.app/user/"+userId);
    const data = await response.json();
    resolve({data});
  });
}

export function fetchLoggedInUserOrders(userId) {
  return new Promise(async (resolve) => {
    const response = await fetch("https://ecommerce-backend-psi-eight.vercel.app/orders?user="+userId);
    const data = await response.json();
    resolve({data});
  });
}

export function updateUser(update) {
  return new Promise(async (resolve) => {
    const response = await fetch('https://ecommerce-backend-psi-eight.vercel.app/user/'+update.id, {
      method: 'PATCH',
      body: JSON.stringify(update),
      headers: { 'content-type': 'application/json' },
    });
    const data = await response.json();
    // TODO: on server it will only return some info of user (not password)
    resolve({ data });
  });
}
