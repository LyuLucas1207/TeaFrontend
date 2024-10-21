const TEA_CATEGORIES = [
    { label: '绿茶', value: 'GreenTea' },
    { label: '红茶', value: 'RedTea' },
    { label: '白茶', value: 'WhiteTea' },
    { label: '青茶', value: 'OolongTea' },
    { label: '黄茶', value: 'YellowTea' },
    { label: '黑茶', value: 'DarkTea' },
];

const TEA_SUBCATEGORIES = {
    GreenTea: [
        { label: '龙井', value: 'Longjing' },
        { label: '碧螺春', value: 'Biluochun' },
        { label: '毛峰', value: 'Maofeng' },
    ],
    RedTea: [
        { label: '祁门红茶', value: 'Keemun' },
        { label: '滇红', value: 'Dianhong' },
        { label: '正山小种', value: 'Lapsang' },
    ],
    WhiteTea: [
        { label: '白毫银针', value: 'SilverNeedle' },
        { label: '白牡丹', value: 'WhitePeony' },
        { label: '寿眉', value: 'Shoumei' },
    ],
    OolongTea: [
        { label: '铁观音', value: 'Tieguanyin' },
        { label: '大红袍', value: 'Dahongpao' },
        { label: '水仙', value: 'Shuixian' },
    ],
    YellowTea: [
        { label: '君山银针', value: 'Junshan' },
        { label: '黄山毛峰', value: 'Huangshan' },
        { label: '莫干黄芽', value: 'Mogan' },
    ],
    DarkTea: [
        { label: '普洱茶', value: 'Puerh' },
        { label: '六堡茶', value: 'Liubao' },
        { label: '安化黑茶', value: 'Anhua' },
    ],
};

export { TEA_CATEGORIES, TEA_SUBCATEGORIES };