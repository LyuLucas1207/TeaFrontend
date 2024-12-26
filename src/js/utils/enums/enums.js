import teaEnums from './teaEnums';
import urlEnums from './urlEnums';
import userEnums from './userEnums';

const enums = {
    teaEnums: {
        getAllTeas: teaEnums.getAllTeas,
        getAllDarkTeas: teaEnums.getAllDarkTeas,
        getAllRedTeas: teaEnums.getAllRedTeas,
        getAllWhiteTeas: teaEnums.getAllWhiteTeas,
        getLimitTeas: teaEnums.getLimitTeas,
        getShengPuErTeas: teaEnums.getShengPuErTeas,
        getShuPuErTeas: teaEnums.getShuPuErTeas,
        getGuShuHongTeas: teaEnums.getGuShuHongTeas,
        getGuShuBaiTeas: teaEnums.getGuShuBaiTeas,

        deleteTea: teaEnums.deleteTea,
        deleteDarkTea: teaEnums.deleteDarkTea,
        deleteRedTea: teaEnums.deleteRedTea,
        deleteWhiteTea: teaEnums.deleteWhiteTea
    },
    urlEnums: {
        defineUrl: urlEnums.defineUrl,
        default: urlEnums.default,
        development: urlEnums.development,
        production: urlEnums.production,
        image_development: urlEnums.image_development,
        image_production: urlEnums.image_production
    },
    userEnums: {
        userLogin: userEnums.userLogin,
        userInfoGetByEmail: userEnums.userInfoGetByEmail,
        userInfoGetByPhone: userEnums.userInfoGetByPhone,
        userAll: userEnums.userAll
    }
};

export default enums;
