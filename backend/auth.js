// backend/auth.js
const passport = require('passport');
const LdapStrategy = require('passport-ldapauth');

const ldapOptions = {
  server: {
    url: 'ldap://your-ldap-server-url',
    bindDN: 'cn=read-only-admin,dc=example,dc=com',
    bindCredentials: 'password',
    searchBase: 'ou=users,dc=example,dc=com',
    searchFilter: '(uid={{username}})'
  }
};

passport.use(new LdapStrategy(ldapOptions));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

module.exports = passport;
