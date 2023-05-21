export const capitalizeFirstLetter = (str: string) => {
  const arr = str.toLowerCase().split(" ");

  for (let i = 0; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
  }

  return arr.join(" ");
};

export const formatCompanyName = (str: string) => {
  const ending = "SPÓŁKA AKCYJNA";
  const trimmedStr = str.trim();

  if (trimmedStr.endsWith(ending)) {
    return trimmedStr.slice(0, trimmedStr.length - ending.length).trim();
  }

  return trimmedStr;
};
