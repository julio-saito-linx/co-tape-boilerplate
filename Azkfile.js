/* globals systems path sync persistent */
/* eslint camelcase: [2, {properties: "never"}] */
/* eslint comma-dangle: [0, {properties: "never"}] */

/* see Azkfile.md */
systems({

  app: {
    depends: [],
    image: {'docker': 'node:latest'},
    provision: [
      'npm install'
    ],
    workdir: '/azk/#{manifest.dir}',
    shell: '/bin/bash',

    command: 'npm test',
    mounts: {
      '/azk/#{manifest.dir}': path('.'),
      '/azk/node_modules': persistent('#{manifest.dir}/node_modules')
    },

    scalable: { default: 1, limit: 1 },
    http: null,
    ports: null,
    wait: undefined,

    envs: {
      SHELL: '/bin/bash',
      PATH: 'node_modules/.bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin'
    }
  },

});
