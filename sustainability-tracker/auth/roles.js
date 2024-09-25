const ROLE_ADMIN = 'admin';
const ROLE_WORKER = 'worker';

function hasRole(req, ...roles) {
  if (!Array.isArray(req.roles))
    return false;

  console.log(req.roles, roles);
  for (let role of roles) {
    if (req.roles.includes(role)) {
      return true;
    }
  }
  return false;
}

module.exports = {
  ROLE_ADMIN,
  ROLE_WORKER,
  hasRole
}
