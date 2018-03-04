import request from "request-promise-native";

export const newGame = async prompt => {
  return new Promise(resolve => {
    request(
      `http://${process.env.APP_BACKEND}:${
        process.env.APP_BACKEND_PORT
      }/new/${prompt}`
    )
      .then(body => resolve(JSON.parse(body)))
      .catch(err => {});
  });
};

export const getGame = async gameId => {
  return new Promise(resolve => {
    request(
      `http://${process.env.APP_BACKEND}:${
        process.env.APP_BACKEND_PORT
      }/challenge/${gameId}`
    )
      .then(body => resolve(JSON.parse(body)))
      .catch(err => {});
  });
};
