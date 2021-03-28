export const getCurrentData = (data, type, activeTypes) => {
  return data?.filter(item => {
    return activeTypes?.findIndex(elem => elem === item[type].toString()) > -1;
  });
};
