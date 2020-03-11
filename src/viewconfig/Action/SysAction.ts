import { ActionConfigItem } from "@/viewconfig/ActionConfig";

const config: ActionConfigItem = {
    启停流程: {
        directlySubmit: true,
        submit: {
          url: "/comm/FlowList/toggle/state",
          data: { schema_name: "schema_name", state:"state" }
        }
    },


};

export default config;
