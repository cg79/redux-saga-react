export const apiGetUsers = (success = true, time = 1000) => {
  return new Promise((resolve, reject) => {
    console.log('apiGetUsers');
    setTimeout(() => {
      if (success) {
        return resolve([
          {
            id: 1,
            name: new Date().toISOString(),
          },
          {
            id: 2,
            name: new Date().toISOString(),
          },
        ]);
      }

      reject({
        ex: new Date().toISOString(),
      });
    }, time);
  });
};

export default apiGetUsers;
