const { ConsoleColor } = require('./consoleColor');
const path = require('path');
const fs = require('fs-extra');
const os = require('os');

const defaultOptions = {
  syncTo: '',
  from: '',
  name: '',
  syncDir: ['*'],
  rootDir: '',
  stage: 'afterEmit',
};

class Sync {
  /**
   *
   * @param {defaultOptions} options
   */
  constructor(options = defaultOptions) {
    /**
     * @type {defaultOptions}
     */
    this.data = {
      name: Sync.name,
      from: path.join(options.rootDir || '', 'dist'),
      syncDir: ['*'],
      ...options,
    };
  }

  apply(compiler) {
    const pluginName = this.data.name;
    const self = this;
    compiler.hooks.done.tap(
      {
        name: pluginName,
      },
      () => {
        if (
          self.data.rootDir &&
          self.data.syncTo &&
          self.data.syncTo === self.data.from
        )
          return;

        const ifaces = os.networkInterfaces();
        Object.keys(ifaces).forEach(function (ifname) {
          ifaces[ifname].forEach(function (iface) {
            if (iface.family !== 'IPv4' || iface.internal !== false) {
              return;
            }
            ConsoleColor.y(iface.address);
          });
        });
        fs.stat(self.data.from, function (err, stats) {
          if (stats.isDirectory()) {
            const items = self.data.syncDir || [];
            for (let i = 0; i < items.length; i++) {
              const item = items[i];
              if (item === '*') {
                fs.copy(self.data.from, self.data.syncTo, {
                  overwrite: true,
                }).catch(er => {
                  console.error(er);
                });
                break;
              } else {
                fs.copy(
                  `${self.data.from}/${item}`,
                  `${self.data.syncTo}/${item}`,
                  { overwrite: true },
                ).catch(er => {
                  console.error(er);
                });
              }
            }
          }
        });
        setTimeout(() => {
          console.log(
            ConsoleColor.y('-------------------------------------------'),
          );
          console.log(`Status SyncTo        :`, ConsoleColor.g('DONE'));
          console.log(`SyncTo Path   :`, ConsoleColor.y(`${self.data.syncTo}`));
        }, 1000);
        console.log(ConsoleColor.g(`---- added ${pluginName}`));
      },
    );
  }
}

module.exports = Sync;
