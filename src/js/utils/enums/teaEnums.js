/**
 * tea_category:
 *  DarkTeas: 黑茶
 *  RedTeas: 红茶
 *  WhiteTeas: 白茶
*/

const getAllTeas = (tea_category) => {
    const getAllDarkTeasModel = {
        flag: "tea",
        event: "TEA",
        action: "GETALL",
        fields: {
            tea_category: tea_category,
            user_id: 999
        }
    }
    return getAllDarkTeasModel;
}

const getLimitTeas = (tea_category, tea_subcategory) => {
    const getConditionTeasModel = {
        flag: "tea",
        event: "TEA",
        action: "GETLIMIT",
        fields: {
            tea_category: tea_category,
            user_id: 999,
            tea_subcategory: tea_subcategory
        }
    }
    return getConditionTeasModel;
}

const getShengPuErTeas = getLimitTeas('DarkTeas', 'shengpuer_tea');
const getShuPuErTeas = getLimitTeas('DarkTeas', 'shupuer_tea');
const getGuShuHongTeas = getLimitTeas('RedTeas', 'gushuhong_tea');
const getGuShuBaiTeas = getLimitTeas('WhiteTeas', 'gushubai_tea');

const getAllDarkTeas = getAllTeas('DarkTeas');
const getAllRedTeas = getAllTeas('RedTeas');
const getAllWhiteTeas = getAllTeas('WhiteTeas');

const deleteTea = (tea_name, tea_category) => {
    const deleteTeaModel = {
        flag: "tea",
        event: "TEA",
        action: "DELETE",
        fields: {
            tea_name: tea_name,
            tea_category: tea_category,
            user_id: 999
        }
    }
    return deleteTeaModel;
}

const deleteDarkTea = deleteTea('DarkTeas');
const deleteRedTea = deleteTea('RedTeas');
const deleteWhiteTea = deleteTea('WhiteTeas');

const teaEnums = {
    getAllTeas,
    getAllDarkTeas,
    getAllRedTeas,
    getAllWhiteTeas,

    getLimitTeas,
    getShengPuErTeas,
    getShuPuErTeas,
    getGuShuHongTeas,
    getGuShuBaiTeas,

    deleteTea,
    deleteDarkTea,
    deleteRedTea,
    deleteWhiteTea
}


export default teaEnums;