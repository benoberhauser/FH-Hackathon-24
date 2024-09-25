const user = {
  firstname: 'Joe',
  lastname: 'Dow'
};

const get0 = (_req, resp) => {
  let infoObj = {
    text: 'accessible for all users',
    user
  }
  resp.json(infoObj);
};

const get1 = (_req, resp) => {
  let infoObj = {
    text: 'only accessible for authenticated users',
    user
  }
  resp.json(infoObj);
};

const get2 = (_req, resp) => {
  let infoObj = {
    text: 'only accessible for users with role "worker"',
    user
  }
  resp.json(infoObj);
};

const get3 = (_req, resp) => {
  let infoObj = {
    text: 'only accessible for users with role "admin"',
    user
  }
  resp.json(infoObj);
};

module.exports = { get0, get1, get2, get3 };