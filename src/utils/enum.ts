import { sys } from "@/utils/core";

export const dict = {
  State: { 0: "停用", 1: "启用" },
  OpenMode: { 1: "手动录入", 2: "部门申请" },
  Flow: { 0: "未进行", 1: "未提交", 2: "待审批", 3: "拒审批", 4: "审批通过" },
  ActiveState: { 0: "未激活", 1: "已激活" },
  Gender: { 0: "男", 1: "女" },
  //日志类型
  LogType: {
    1: "创建",
    2: "修改",
    3: "启停",
    4: "删除",
    5: "废除"
  },
  enum_ver: ""
};

export async function enumInit(ver: string) {
  const r = await fetch(`/api/files/TY_B2B/cache/Enum.js?ver=${ver}`);
  const rst = await r.json();

  Object.keys(rst).forEach(key => {
    dict[key] = rst[key];
  });
  dict.enum_ver = ver;
}

export interface IEnumCfg {
  type: string;
  cascade?: string;
  cascaded?: boolean;
  cascade_type?: string;
  mod?: string;
  text?: string;
}

export function searchChange(
  cfg: string | IEnumCfg,
  field: string,
  data: object
) {
  return data;
}

export function getEnum(
  cfg: string | IEnumCfg,
  row: object = {},
  pemField?: string | number
) {
  if (typeof cfg === "string") {
    return dict[cfg];
  }
  let rest = {};
  if (typeof cfg === "object") {
    if (!cfg.type) {
      return {};
    }
    // eslint-disable-next-line camelcase
    const { type } = cfg;
    rest = dict[type] || {};
    if (cfg.cascade) {
      const target = row[cfg.cascade];

      if (cfg.cascaded) {
        rest = rest[target] || {};
      } else {
        let cascadeSet = {};
        const result = {};
        if (cfg.cascade_type) {
          cascadeSet = dict[cfg.cascade_type];
        } else {
          switch (type) {
            case "Employee":
              cascadeSet = dict["EmployeeDepartment"];
              break;
            case "Department":
              cascadeSet = dict["DepartmentCompany"];
              break;
            default:
              break;
          }
        }

        if (cascadeSet) {
          Object.keys(cascadeSet).forEach(k => {
            if (Array.isArray(target)) {
              if (target.includes(cascadeSet[k])) {
                if (rest[k]) {
                  result[k] = rest[k];
                }
              }
            } else if (target === cascadeSet[k]) {
              if (rest[k]) {
                result[k] = rest[k];
              }
            }
          });
        }

        rest = result;
      }
    }

    if (pemField) {
      const mod = (row && row["mod"]) || cfg.mod;
      const pemFilters = sys.filters;
      const pem = pemFilters[mod];
      const currentUser = sys.user;

      if (pem && pem[pemField]) {
        const filter = pem[pemField];
        const result = {};
        if (filter[0] === -1) {
          let target: string;
          switch (type) {
            case "Company":
            case "ManagerCompany":
              target = currentUser.company_id;
              break;
            case "Department":
            case "ManagerDepartment":
              target = currentUser.department_id;
              break;
            case "Employee":
            case "ManagerEmployee":
              target = currentUser.employee_id;
              break;
            default:
              break;
          }
          Object.keys(rest).forEach(k => {
            if (k === target) {
              result[k] = rest[k];
            }
          });
        } else {
          const restKeys = new Set(Object.keys(rest));
          const targetKeys = new Set(filter);
          const intersectionSet = new Set(
            [...restKeys].filter(x => targetKeys.has(x))
          );

          Object.keys(rest).forEach(k => {
            if (intersectionSet.has(k)) {
              result[k] = rest[k];
            }
          });
        }
        rest = result;
      }
    }
  }
  return rest;
}
