const { withApplicationSdk, NextConfigWithApplicationSdkConfig } = require('@5minds/processcube_app_sdk/server');

/** @type {import('next').NextConfig} */
const nextConfig = {};

/** @type {NextConfigWithApplicationSdkConfig} */
const nextConfigWithApplicationSdkConfig = {
  ...nextConfig,
  applicationSdk: {
    useExternalTasks: true,
  },
};

module.exports = withApplicationSdk(nextConfigWithApplicationSdkConfig);
