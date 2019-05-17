const chestSort = chests => {
  let { upcoming, ...others } = chests;
  let keyChest = {};
  let numbers = [];
  for (chest in others) {
    keyChest[others[chest]] = chest;
    numbers = [...numbers, others[chest]];
  }
  numbers = numbers.sort((a, b) => (a < b ? -1 : 1));
  return (
    upcoming.join("\n") +
    "\n" +
    numbers.map(number => `${keyChest[number]} +${number}`).join("\n")
  );
};

module.exports = chestSort;
