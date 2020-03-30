import { ActionConfigItem } from "@/viewconfig/ActionConfig";

const config: ActionConfigItem = {
    
    启停船舶: {
        directlySubmit: true,
        submit: {
        url: "/business/CruiseShip/toggle/state",
        data: { id: "id", state:"state"}
        }
    },
    启停邮轮航线: {
        directlySubmit: true,
        submit: {
        url: "/business/CruiseLine/toggle/state",
        data: { id: "id", state:"state"}
        }
    },
    启停数据字典: {
        directlySubmit: true,
        submit: {
        url: "/business/CommDct/toggle/state",
        data: { id: "id", state:"state"}
        }
    },
    启停城市: {
        directlySubmit: true,
        submit: {
        url: "/business/City/toggle/state",
        data: { id: "id", state:"state"}
        }
    },
    删除城市:{
        directlySubmit: true,
        confirm:'确认删除城市吗?',
        submit: {
        url: "/business/City/destroy",
        data: { id: "id"}
        }
    },
    启停协议: {
        directlySubmit: true,
        submit: {
        url: "/business/SuppDct/toggle/state",
        data: { id: "id", state:"state"}
        }
    },
};

export default config;