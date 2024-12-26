const urls = {
    default: 'https://192.168.1.64:10001',
    development: 'https://192.168.1.64:10001',
    production: 'https://www.lucaslyu.com:10001',

    image_development: 'https://192.168.1.64:10000/images/',
    image_production: 'https://www.lucaslyu.com:10000/images/',

    staff_development: 'https://192.168.1.64:10000/images/staff/',
    staff_production: 'https://www.lucaslyu.com:10000/images/staff/',

    user_development: 'https://192.168.1.64:9999',
    user_production: 'https://www.lucaslyu.com:9999'
};

const defineUrl = (flag = null) => {
    const dev = process.env.NODE_ENV === 'development';
    if (typeof flag === 'string' && (flag.toLowerCase() === 'image' || flag.toLowerCase() === 'images' || flag.toLowerCase().includes('image'))){
        return dev ? 
            urls.image_development : urls.image_production;
    } else if (typeof flag === 'string' &&  (flag.toLowerCase() === 'user' || flag.toLowerCase().includes('user') || flag.toLowerCase() === 'users' || flag.toLowerCase().includes('users'))){
        return dev ? 
            urls.user_development : urls.user_production;
    } else if (typeof flag === 'string' &&  (flag.toLowerCase() === 'staff' || flag.toLowerCase().includes('staff') || flag.toLowerCase() === 'staffs' || flag.toLowerCase().includes('staffs'))){
        return dev ? 
            urls.staff_development : urls.staff_production
    } else {
        return dev ? 
            urls.development : urls.production;
    }
};

const urlEnums = {
    defineUrl: defineUrl,
    default: urls.default,
    development: urls.development,
    production: urls.production,

    image_development: urls.image_development,
    image_production: urls.image_production,

    staff_development: urls.staff_development,
    staff_production: urls.staff_production,

    user_development: urls.user_development,
    user_production: urls.user_production
};

export default urlEnums;
