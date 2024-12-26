import teaControllers from './teaControllers';
import userControllers from './userControllers';

const controllers = {
    teaControllers: {
        getAllTeas: teaControllers.getAllTeas,
        getAllDarkTeas: teaControllers.getAllDarkTeas,
        getAllRedTeas: teaControllers.getAllRedTeas,
        getAllWhiteTeas: teaControllers.getAllWhiteTeas,

        getLimitTeas: teaControllers.getLimitTeas,
        getShengPuErTeas: teaControllers.getShengPuErTeas,
        getShuPuErTeas: teaControllers.getShuPuErTeas,
        getGuShuHongTeas: teaControllers.getGuShuHongTeas,
        getGuShuBaiTeas: teaControllers.getGuShuBaiTeas,

        addTeaWithImages: teaControllers.addTeaWithImages,
        updateTea: teaControllers.updateTea,

        deleteTea: teaControllers.deleteTea,
        deleteDarkTea: teaControllers.deleteDarkTea,
        deleteRedTea: teaControllers.deleteRedTea,
        deleteWhiteTea: teaControllers.deleteWhiteTea
    },
    userControllers: {
        userLogin: userControllers.userLogin,
        userCheck: userControllers.userCheck,
        userInfoGetByEmail: userControllers.userInfoGetByEmail,
        userInfoGetByPhone: userControllers.userInfoGetByPhone,
        userAll: userControllers.userAll,
        addStaffWithImage: userControllers.addStaffWithImage
    }
};

export default controllers;
