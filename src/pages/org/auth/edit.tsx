import React, { useState, useEffect } from 'react';
import { Collapse, Modal, Icon, Button, Checkbox, Col, Divider, Input } from 'antd';

import PageHeaderWrapper from '@/components/PageHeaderWrapper/actionPageHeader';
import renderHeaderBtns from '@/components/PageHeaderWrapper/headerBtns';
import { IActionPageProps } from '@/viewconfig/ActionConfig';
import { useActionPage , useActionBtn} from '@/utils/ActionPageHooks';

import FilterModalContent,{IFilteConfig} from './FilterModalContent';

import styles from './edit.less';


const { Panel } = Collapse;
const { Group: CheckboxGroup } = Checkbox;

interface IAuthData{
    name:string,
    scope:string,
    actions:string[],
    filters:{
        [key:string]:{
            [key:string]:string[]
        }
    }
}

interface IModAuthConfig{
    action?:{
        [key:string]:object
    },
    s_regular?:{
        [key:string]:object
    }
}

const Page:React.FC<IActionPageProps> = ({route,location})=>{
    const { authority } = route;
    const { state } = location;

    const initData:{
        menu:string[],
        auth:IAuthData
    } = { menu: [], auth: {name:'',scope:'',actions:[],filters:{}} }

    const {data,setData,load,onOk,onCancel,cfg} = useActionPage<typeof initData>(authority,initData,state);

    const [filterModalShow, setModalShow] = useState(false);
    const [selectModalCfg, setModalCfg] = useState({mod:'',field:'',regular:'',type:''});

    useEffect(() => {
        load();
    }, [])

    const onInfoChange = (value:string, field:string) => {
        data.auth[field] = value;
        setData({ ...data });
    }

    const onCheckAllChange = (modCfg:IModAuthConfig, mod:string, checked:boolean) => {
        const { auth } = data;
        if (checked) {
          const set = new Set(auth['actions']);
          set.add(mod);
          if(modCfg.action){
            Object.keys(modCfg.action).forEach(action => {
                set.add(action)
              })
          }
          auth['actions'] = [...set];
        } else {
            const set = new Set(auth['actions']);
            set.delete(mod);
            if(modCfg.action){
                Object.keys(modCfg.action).forEach(action => {
                    set.delete(action)
                })
            }
            auth['actions'] = [...set];
        }
        setData({ ...data, auth });
    }

    const onCheckChange = (modCfg:IModAuthConfig, checkedValues:string[]) => {
        const { auth } = data;
        const set = new Set(auth.actions);
        const allActions:any[] = [];
        const checkedActions:any[] = [];

        if(modCfg.action){
            Object.keys(modCfg.action).forEach(action => {
                allActions.push(action);
                if (checkedValues.includes(action)) {
                  checkedActions.push(action);
                }
            })
        }
        allActions.forEach(x => set.delete(x));
        checkedActions.forEach(x => set.add(x));
        auth.actions = [...set];
        setData({ ...data, auth });
    };

    const modalCancel = () => {
        setModalShow(false);
        setModalCfg({mod:'',field:'',regular:'',type:''});
    }

    const modalOk = (mod:string, filter:object) => {
        if (filter) {
          const { auth } = data;
          
          if (Object.keys(filter).length > 0) {
            auth.filters[mod] = {...filter};
          } else if (auth.filters) {
            delete auth.filters[mod];
          }
          setData({ ...data, auth });
        }
        setModalShow(false);
        setModalCfg({mod:'',field:'',regular:'',type:''});
    }

    const editPemFilter = (Filtercfg:IFilteConfig) => {
        setModalShow(true);
        setModalCfg(Filtercfg);
    }

    const renderFilter = (regular:any, mod:string) => {
        const { auth  } = data;
        const filters = auth.filters;
        // eslint-disable-next-line max-len
        const filterType = { Company: 1, Department: 1, Employee: 1, Supplier: 1, SupplierDepartment: 1, SupplierSales: 1 };
        if (regular) {
          return (
            Object.keys(regular).map(field => (
              filterType[regular[field].type] === 1 &&
              <Button
                key={`${mod}/${field}`}
                onClick={() => editPemFilter({ mod, field, regular, type: regular[field].auth_type || regular[field].type })}
                className={styles.filterItemButton}
              >
                {// eslint-disable-next-line eqeqeq
                  filters[mod] && filters[mod][field] && filters[mod][field][0] != '-1' && <Icon type="lock" className={styles.filterIconLock} />
                }
                {// eslint-disable-next-line eqeqeq
                  filters[mod] && filters[mod][field] && filters[mod][field][0] == '-1' && <Icon type="user" className={styles.filterIconselfLock} />
                }
                {regular[field].text}
              </Button>
            ))
          )
        }
        return null;
    }

    const renderMenu = () => {
        const { menu = {}, auth } = data;
        return (
          <Collapse
            bordered={false}
            defaultActiveKey={['1']}
            expandIcon={({ isActive }) => <Icon type="right" rotate={isActive ? 90 : 0} />}
          >
            {Object.keys(menu).map(menuKey => (
              <Panel header={menuKey} key={menuKey}>
                {Object.keys(menu[menuKey]).map(mod => (
                  <div key={mod} className={styles.modItem}>
                    <Checkbox
                      className={styles.modItemCheckbox}
                      onChange={e =>
                        onCheckAllChange(menu[menuKey][mod], mod, e.target.checked)
                      }
                      checked={auth['actions'].indexOf(mod) !== -1}
                    >
                      {menu[menuKey][mod].text}
                    </Checkbox>
                    {menu[menuKey][mod] && menu[menuKey][mod].action && (
                      <CheckboxGroup
                        className={styles.modItemCheckboxGroup}
                        options={Object.keys(menu[menuKey][mod].action).filter(
                          item => menu[menuKey][mod].action[item].text,
                        )}
                        value={Object.keys(menu[menuKey][mod].action).filter(
                          item => auth.actions.indexOf(item) !== -1,
                        )}
                        onChange={checkedValues =>
                          onCheckChange(menu[menuKey][mod], checkedValues as string[])
                        }
                      />
                    )}
                    <Col className={styles.filterItem}>{renderFilter(menu[menuKey][mod].s_regular, mod)}</Col>
                    <Divider dashed />
                  </div>
                ))}
              </Panel>
            ))}
          </Collapse>
        );
    }

    const renderFilterModalContent = () => {
        const { auth } = data;
        return (
          <FilterModalContent
            cfg={selectModalCfg}
            auth={auth}
            onCancel={modalCancel}
            onSubmit={modalOk}
          />
        )
    }

    const actionMap = {
        提交: onOk,
        关闭: onCancel,
    }

    const {btns} = useActionBtn(authority,actionMap);

    return <PageHeaderWrapper
            title={cfg.title || ''}
            extra={renderHeaderBtns(btns)}
        >
        <Collapse
            bordered={false}
            defaultActiveKey={['1']}
            expandIcon={({ isActive }) => <Icon type="right" rotate={isActive ? 90 : 0} />}
            >
            <Panel header="描述信息" key="描述信息">
                <div className={styles.info}>
                <span className={styles.infoLable}>权限名称:</span>
                <Input
                    size="default"
                    placeholder="权限名称"
                    value={data.auth.name}
                    onChange={e => onInfoChange(e.target.value, 'name')}
                />
                </div>
                <div className={styles.info}>
                <span className={styles.infoLable}>适用范围:</span>
                <Input
                    size="default"
                    placeholder="适用范围"
                    value={data.auth.scope}
                    onChange={e => onInfoChange(e.target.value, 'scope')}
                />
                </div>
            </Panel>
        </Collapse>
        {renderMenu()}
        <Modal
            title="可见数据"
            visible={filterModalShow}
            okButtonProps={{ className: 'hide' }}
            cancelButtonProps={{ className: 'hide' }}
            onCancel={modalCancel}
            >
            {filterModalShow && renderFilterModalContent()}
        </Modal>
    </PageHeaderWrapper>
}

export default Page;
