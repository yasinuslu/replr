/* eslint-disable no-param-reassign */

module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    if (dev) {
      // Important: return the modified config
      config.plugins = config.plugins.filter(plugin => {
        if (plugin.constructor.name === 'ForkTsCheckerWebpackPlugin') return false;
        return true;
      });
    }

    return config;
  },
};
