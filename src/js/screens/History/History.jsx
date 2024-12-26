
import React from 'react';
import { validateUrl } from '../../utils/helpers/validate';
import Components from '../../components/components';
import { PATHS } from '../../constants/paths';
function History() {
    const timelineData = [
        {
            dataText: "上古与传说时代",
            imgSrc: PATHS.SRC.ASSETS.IMAGES.TIME1,
            year: "（约公元前3000年及更早）",
            description: "传说中，神农氏（约距今5000年前）在中国西南地区尝百草，发现茶叶可解毒。这一故事虽无确凿史料，但作为茶起源的口传神话流传甚广。植物学与考古学研究认为，云南、四川、贵州、湖北西部为茶树的野生原产地，自然条件孕育了人类对茶的早期认识与利用。",
            reference: {
                "陆羽": "《茶经》，中华书局，1981年。",
                "韩嗣炎": "《中国茶文化史》，上海文化出版社，1991年。",
                "王玲": "《中国茶文化概论》，福建人民出版社，2000年。"
            }
        },
        {
            dataText: "商周至先秦两汉",
            imgSrc: PATHS.SRC.ASSETS.IMAGES.TIME2,
            year: "（约公元前11世纪—公元3世纪）",
            description: "在商周时期的巴蜀地区（今四川、重庆）已有茶叶利用的迹象。《华阳国志·巴志》提到“香茗”被作为贡品进献。至西汉时期，四川地区已有买卖茶叶与饮茶的记载，王褒《僮约》（公元前59年）中“武阳买茶”记载为其明证。当时茶饮尚不普及，仅在特定区域、特定阶层中出现。",
            reference: {
                "常璩": "《华阳国志》，中华书局，1987年校注本。",
                "王褒": "《僮约》，见于《全汉文》。",
                "陈文华": "《中国茶叶通史》，中国农业出版社，2005年。"
            }
        },
        {
            dataText: "魏晋南北朝",
            imgSrc: PATHS.SRC.ASSETS.IMAGES.TIME3,
            year: "（3—6世纪）",
            description: "魏晋时期文献已多处提及茶作为社交助兴饮品，文人士大夫间饮茶成风。南北朝时期，茶由上层社会向民间逐渐扩散。茶不仅是清谈之助，更在部分地区成为日常饮品的雏形。",
            reference: {
                "刘义庆": "《世说新语》，中华书局，1983年。",
                "程启坤": "《茶文化概论》，中国轻工业出版社，1992年。"
            }
        },
        {
            dataText: "隋唐时期",
            imgSrc: PATHS.SRC.ASSETS.IMAGES.TIME4,
            year: "（7—10世纪）",
            description: "隋代饮茶之风较前更盛，但尚集中在上层。唐代是中国茶文化成熟的关键时期：茶园面积扩大，制茶和炒青技术提升。陆羽（733-804）著《茶经》（约8世纪末问世），首次系统总结茶的产地、制法、品评、用具及茶艺原则，将茶文化加以理论化和体系化。茶叶通过陆上丝绸之路、西行商旅传至中亚、西亚乃至欧洲部分地区，成为文化交流与商贸的重要商品。",
            reference: {
                "陆羽": "《茶经》，中华书局，1981年。",
                "封演": "《封氏闻见记》，中华书局，1986年。",
                "Ming Wilson": "\"Chinese Tea Culture: A Brief Introduction,\" Victoria and Albert Museum Archives。"
            }
        },
        {
            dataText: "宋代",
            imgSrc: PATHS.SRC.ASSETS.IMAGES.TIME5,
            year: "（10—13世纪）",
            description: "宋代茶文化达到极盛：茶为日常必备饮品，上至朝廷、下至平民百姓皆嗜茶。斗茶之风兴起，评判茶叶品质与冲泡技艺蔚为风尚。五大名窑（汝、官、哥、钧、定）出产精美茶具，推动茶器艺术发展。茶馆林立，茶事活动成为社会生活的重要组成。",
            reference: {
                "赵佶": "《大观茶论》，上海古籍出版社，1980年。",
                "林语堂": "\"The Importance of Living,\" 1937，中译本有商务印书馆版。"
            }
        },
        {
            dataText: "元代",
            imgSrc: PATHS.SRC.ASSETS.IMAGES.TIME6,
            year: "（13—14世纪）",
            description: "元代茶生产与贸易持续繁荣，形成万里茶路，连接中国南北产区与贸易中心，促进南北文化交流。茶叶不再仅是生活饮品，更是经济商品，为明清茶贸易的进一步发展铺路。",
            reference: {
                "周锋": "《丝绸之路与茶马古道》，民族出版社，1993年。",
                "Denis Twitchett and Herbert Franke (eds.)": "\"The Cambridge History of China: Volume 6: Alien Regimes and Border States, 907–1368,\" Cambridge University Press, 1994。"
            }
        },
        {
            dataText: "明代",
            imgSrc: PATHS.SRC.ASSETS.IMAGES.TIME7,
            year: "（14—17世纪）",
            description: "明代是茶学研究和茶类分类定型的时期：出现一批茶学专著，系统化研究茶叶。六大茶类（绿、黄、白、青（乌龙）、红、黑）逐步确立。皇帝倡导散茶替代蒸青团茶，加速绿茶和散茶的普及。紫砂壶与瓷器的广泛使用推动泡茶方式变革。",
            reference: {
                "徐渭": "《茶笺》，见《徐文长全集》。",
                "黄一农": "《明代茶事研究》，中华书局，2009年。",
                "Joseph Needham": "\"Science and Civilisation in China, Vol.6: Biology and Biological Technology,\" Cambridge University Press。"
            }
        },
        {
            dataText: "清代",
            imgSrc: PATHS.SRC.ASSETS.IMAGES.TIME8,
            year: "（17—20世纪初）",
            description: "清代茶业经济崛起，茶与丝绸、瓷器同为出口大宗商品。康乾盛世时，对内茶馆文化繁荣，对外茶叶经海上丝绸之路远播至东南亚、南亚、中东、东非和欧洲。中国茶输入欧洲，促进英、法等国的饮茶风尚形成，国际茶贸易格局初定。",
            reference: {
                "《清史稿》": "中华书局标点本。",
                "木村坚吉（Kenji Kimura）": "\"History of Tea in East Asia,\" Tokyo University Press，1998年英日双语版。"
            }
        },
        {
            dataText: "近代",
            imgSrc: PATHS.SRC.ASSETS.IMAGES.TIME9,
            year: "（19世纪中叶—20世纪初）",
            description: "近代中国政治、经济格局巨变，国际贸易关系重塑：鸦片战争后，西方殖民势力将中国茶苗与制茶技术传播至印度、斯里兰卡等地，使其成为世界茶生产中心之一。中国茶产业受到外来竞争与国内动荡影响，虽地位有所下降，但仍在国际茶叶市场保持影响。",
            reference: {
                "韩嗣炎": "《中国茶叶对外贸易史》，中国商务出版社，1989年。",
                "Robert Gardella": "\"Harvesting Mountains: Fujian and the China Tea Trade, 1757–1937,\" University of California Press, 1994。"
            }
        }
        // 如果需要添加更多条目，可以在此处继续添加...
      ];
    return (
        <div style={{ minheight: "100vh", width: "100vw"}}>
            <Components.TimeLine timelineData={timelineData} />
            {/* <Publics.SizingBox.BorderBox width="300px" height="450px" style={{ backgroundColor: "transparent" }}>
                <Components.ImageCompare beforeImage={Image1} afterImage={Image2} />
            </Publics.SizingBox.BorderBox> */}
        </div>
    );
}

export default validateUrl(History);