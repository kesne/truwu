const sleep = (amount: number) =>
  new Promise((resolve) => setTimeout(resolve, amount));

export default sleep;
