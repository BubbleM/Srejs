import { getCoreConfig, setCoreConfig } from './loadConfig';

export const isDev = () => {
    const NODE_ENV = (process.env && process.env.NODE_ENV) || 'development';

    return NODE_ENV.trim() !== 'production';
};
export const setOptions = (options) => {
    let coreOptions = Object.assign({}, getCoreConfig(), options);
    return setCoreConfig(coreOptions);
};
export const getOptions = (name) => {
    let options = null;
    return (() => {
        options = options || getCoreConfig();
        return options[name] || null;
    })();
};
