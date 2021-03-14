const path = require('path');

const resolveSource = (relativePath) => path.resolve(process.cwd(), 'src', relativePath);

module.exports = {
  webpack: {
    alias: {
      '~components': resolveSource('components/'),
      '~containers': resolveSource('containers/'),
      '~constants': resolveSource('constants/'),
    },
  },
};
