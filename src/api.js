const url = 'https://api.coincap.io/v2';

async function getAssets() {
  const result = await fetch(`${url}/assets?limit=20`);
  const json = await result.json();
  return json.data;
}

async function getAsset(coin) {
  const result = await fetch(`${url}/assets/${coin}`);
  const json = await result.json();
  console.log(result);
  return json.data;
}

async function getAssestHistory(coin) {
  const result = await fetch(`${url}/assets/${coin}/history?interval=d1`);
  const json = await result.json();
  return json.data;
}

async function getMarkets(coin) {
  const result = await fetch(`${url}/assets/${coin}/markets?limit=5`);
  const json = await result.json();
  return json.data;
}

async function getExchange(id) {
  const result = await fetch(`${url}/exchanges/${id}`);
  const json = await result.json();
  return json.data;
}

export default {
  getAssets,
  getAsset,
  getAssestHistory,
  getMarkets,
  getExchange,
};
