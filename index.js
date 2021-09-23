const coinValues = {
  "ONE HUNDRED": 100,
  TWENTY: 20,
  TEN: 10,
  FIVE: 5,
  ONE: 1,
  QUARTER: 0.25,
  DIME: 0.1,
  NICKEL: 0.05,
  PENNY: 0.01,
};

function checkCashRegister(price, cash, cid) {
  const change = getFixed(cash - price);
  const cidSum = sum(cid);
  if (cidSum < change) {
    return { status: "INSUFFICIENT_FUNDS", change: [] };
  }

  let cidObj = makeCidObj(cid);
  let cashRegister = calculateCashRegisterChange(cidObj, change);
  const cirSum = sum(cashRegister.change);

  if (cirSum == cidSum) {
    return { status: "CLOSED", change: cid };
  }

  return cashRegister;
}
function getFixed(num) {
  return Number(num.toFixed(2));
}
function sum(cid) {
  let allMoney = 0;
  cid.forEach((coin) => (allMoney += coin[1]));
  return getFixed(allMoney);
}
function makeCidObj(cid) {
  let obj = {};
  for (let i = 0; i < cid.length; i++) {
    obj[cid[i][0]] = cid[i][1];
  }
  return obj;
}
function calculateCashRegisterChange(cidObj, change) {
  let newChange = {};
  while (change > 0) {
    let coinName = getBiggestCoinNameThatCanBeTakenOut(cidObj, change);
    if (!coinName) {
      return { status: "INSUFFICIENT_FUNDS", change: [] };
    }
    let coinValue = coinValues[coinName];
    cidObj[coinName] -= coinValue;
    newChange[coinName] = !newChange[coinName]
      ? coinValue
      : getFixed(newChange[coinName] + coinValue);

    change = getFixed(change - coinValue);
  }
  return { status: "OPEN", change: Object.entries(newChange) };
}

function getBiggestCoinNameThatCanBeTakenOut(cidObj, change) {
  for (let [coinName, coinValue] of Object.entries(coinValues)) {
    let coinSumInCid = cidObj[coinName];
    if (coinSumInCid !== 0 && change - coinValue >= 0) {
      return coinName;
    }
  }
  return null;
}
console.log(
  checkCashRegister(19.5, 20, [
    ["PENNY", 0.5],
    ["NICKEL", 0],
    ["DIME", 0],
    ["QUARTER", 0],
    ["ONE", 0],
    ["FIVE", 0],
    ["TEN", 0],
    ["TWENTY", 0],
    ["ONE HUNDRED", 0],
  ])
);
