## pre-requisites

These instructions are written for a unix or unix-like environment (e.g. Mac OS). I'm not familiar with the subtleties involved with running npm on Windows so I won't be able to help much with debugging those environments.

Make sure you have the following installed:

* Node.js (v8.5.0 should be work, but newer versions are probably okay too)
* npm (v5.3.0 should work, but newer versions are probably okay too)

## installing

```
git clone git@github.com:NUDelta/pyrus.git
cd pyrus
npm install
```

Make sure that your `/etc/hosts` file is configured to point `localhost` to `127.0.0.1`, like so:

```
##
# Host Database
#
# localhost is used to configure the loopback interface
# when the system is booting.  Do not change this entry.
##
127.0.0.1	localhost
```

## running pyrus

Make sure you have a `.env` file which sits at the top level of your project directory (i.e. directly alongside other configuration files like `package.json`). It should follow the format as defined in `.env.example`. You do not need to fill out any fields which begin with `APP_` or `WS_APP_`; these will be updated by `./bin/updateEnv.js`.

If you've satisfied the above, you can now run

```
npm run start
```

and Pyrus should start
