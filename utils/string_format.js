const collectionDayFormat = stringArray => {
  let max = 0;
  for (let index = 0; index < stringArray.length; index++) {
    console.log(stringArray[index]);
    let sum =
      stringArray[index][0].length +
      stringArray[index][1].length +
      stringArray[index][2].length;
    if (sum > max) {
      max = sum;
    }
  }
  console.log(max);
  const newStringArray = stringArray.map(string =>
    stringFormat(string, max + 10)
  );
  newStringArray.forEach(x => {
    console.log(x);
  });
  return newStringArray;
};

const stringFormat = (array, max) => {
  let size = 0;
  for (let i = 0; i < array.length; i++) {
    size += array[i].length;
  }
  let dif = max - size;
  let space = "";
  for (let i = 0; i < dif; i++) {
    space = space.concat("_");
  }
  console.log(space.length);
  return `${array[0]}${space}${array[1]}  ${array[2]}/3`;
};

module.exports = collectionDayFormat;
