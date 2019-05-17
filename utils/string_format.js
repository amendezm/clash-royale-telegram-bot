const collectionDayFormat = stringArray => {
  let max = 0;
  for (let index = 0; index < stringArray.length; index++) {
    let sum =
      stringArray[index][0].length +
      stringArray[index][1].length +
      stringArray[index][2].length;
    if (sum > max) {
      max = sum;
    }
  }
  const newStringArray = stringArray.map(string =>
    toCollectionString(string, max + 10)
  );
  return newStringArray;
};

const toCollectionString = (array, max) => {
  let size = 0;
  for (let i = 0; i < array.length; i++) {
    size += array[i].length;
  }
  let dif = max - size;
  let space = "";
  for (let i = 0; i < dif; i++) {
    space = space.concat("_");
  }
  return `${array[0]}${space}${array[1]}  ${array[2]}/3`;
};

const membersFormat = membersArray => {
  let newArray = membersArray.map(member => [
    `${member[0]}${member[0].length < 2 ? " " : ""}`,
    member[1],
    member[2]
  ]);
  let max = 0;
  newArray.forEach(member => {
    let value = member[0].length + member[1].length + member[2].length;
    max = value > max ? value : max;
  });
  return membersArray.map(member => toMemberString(member, max + 5));
};

const toMemberString = (member, max) => {
  const size = member[0].length;
  const level = `${size < 2 ? "0" : ""}${member[0]}`;
  let dif = max - (level.length + member[1].length + member[2].length);
  let space = "";
  for (let i = 0; i < dif; i++) {
    space = space.concat("_");
  }
  return `${level}  ${member[1]}${space}${member[2]}`;
};

module.exports.collectionDayFormat = collectionDayFormat;
module.exports.membersFormat = membersFormat;
