import React, { useEffect } from 'react';
import PageHeaderWrapper from '@/components/PageHeaderWrapper/actionPageHeader';
import renderHeaderBtns from '@/components/PageHeaderWrapper/headerBtns';
import { IActionPageProps } from '@/viewconfig/ActionConfig';
import { useActionPage, useActionBtn } from '@/utils/ActionPageHooks';
import styles from './approve.less';
import { Row, Col, message, Input } from 'antd';
import { getEnum } from '@/utils/enum';
import { submit } from '@/utils/req';
import { ApproveModal } from '@/components/ApproveBtns';
import { router } from 'umi';


const Page: React.FC<IActionPageProps> = ({ route, location }) => {
    const { viewConfig } = route;
    const { state } = location;
    const initData: {
        供应商信息: object,
        业务联系人: any[],
        银行账号编辑: any[],
        stamp: string,
        营业执照: string,
        经营许可证: string,
        旅行社责任险: string
    } = {
        供应商信息: {
        },
        业务联系人: [],
        银行账号编辑: [],
        stamp: '',
        营业执照: '',
        经营许可证: '',
        旅行社责任险: '',
    };

    const { data, setData, load, onOk, onCancel, cfg } = useActionPage<typeof initData>(viewConfig, initData, state);

    useEffect(() => {
        load().then((loadedData: typeof initData) => {
            setData({ ...loadedData });
        });
    }, [])

    const actionMap = {
        提交: onOk,
        关闭: onCancel,
    }

    const { btns } = useActionBtn(viewConfig, actionMap);

    const changeInfo = (val: any, field: string) => {
        data['供应商信息'][field] = val;
        setData({ ...data })
    }

    const passOk = (comment: string) => {
        if (cfg.submit) {
            submit(cfg.submit.url, {
                flow_id: data['供应商信息']['flow_id']
                , opinion: 1, comment: comment
            }, cfg.submit.data).then((r: any) => {
                message.success(r.message);
                router.goBack();
            })
        }
    }
    
    const rejectOk = (comment: string) => {
        if (cfg.submit) {
            submit(cfg.submit.url, {
                flow_id: data['供应商信息']['flow_id']
                , opinion: 2, comment: comment
            }, cfg.submit.data).then((r: any) => {
                message.success(r.message);
                router.goBack();
            })
        }
    }

    return (
        <PageHeaderWrapper title={cfg.title || ''} extra={renderHeaderBtns(btns)} >
            <Row className={styles.Mod}>
                <Col span={24} className={styles.title}>
                    <div className={styles.text}>基础信息</div>
                </Col>
                <Col xs={24} sm={24} md={6} lg={6} className={styles.content}>
                    <div style={{ display: 'flex', flexDirection: 'column' , paddingTop:'5px' }}>
                        <div style={{ lineHeight: '24px', paddingLeft: '0px' ,marginTop: '-6px'}}>
                            商家商标
                        </div>
                        {data.stamp ? <img src={data.stamp} alt="图片" className={styles.picUpload} /> : <span style={{ color:"darkgray" }}>待上传...</span>}
                    </div>
                </Col>
                <Col xs={24} sm={24} md={18} lg={18} className={styles.content}>
                    <Row>
                        <Col span={12}>
                            <div className={styles.cell}>
                                <div className={styles.cellLabel}>
                                    商家类型
                                </div>
                                <div style={{ padding: '0 11px', lineHeight: '32px', height: '32px', border: '1px solid #d9d9d9', borderRadius: '4px' }}>
                                    { getEnum('SuppKind')[data['供应商信息']['supp_type']] }
                                </div>
                            </div>
                        </Col>
                        <Col span={12}>
                            <div className={styles.cell}>
                                <div className={styles.cellLabel}>
                                    所在城市
                                </div>
                                <div style={{ padding: '0 11px', lineHeight: '32px', height: '32px', border: '1px solid #d9d9d9', borderRadius: '4px' }}>
                                    { getEnum('City')[data['供应商信息']['city_id']] }
                                </div>
                            </div>
                        </Col>
                        <Col span={12}>
                            <div className={styles.cell}>
                                <div className={styles.cellLabel}>
                                    商家编号
                                </div>
                                <div style={{ padding: '0 11px', lineHeight: '32px', height: '32px', border: '1px solid #d9d9d9', borderRadius: '4px' }}>
                                    { data['供应商信息']['id'] ? 'S0'+data['供应商信息']['id']: '' }
                                </div>
                            </div>
                        </Col>
                        <Col span={12}>
                            <div className={styles.cell}>
                                <div className={styles.cellLabel}>
                                    公司全称
                                </div>
                                <div style={{ padding: '0 11px', lineHeight: '32px', height: '32px', border: '1px solid #d9d9d9', borderRadius: '4px' }}>
                                    { data['供应商信息']['full_name'] }
                                </div>
                            </div>
                        </Col>
                        <Col span={12}>
                            <div className={styles.cell}>
                                <div className={styles.cellLabel}>
                                    品牌名称
                                </div>
                                <div style={{ padding: '0 11px', lineHeight: '32px', height: '32px', border: '1px solid #d9d9d9', borderRadius: '4px' }}>
                                    { data['供应商信息']['brand'] }
                                </div>
                            </div>
                        </Col>
                        <Col span={12}>
                            <div className={styles.cell}>
                                <div className={styles.cellLabel}>
                                    办公地址
                                </div>
                                <div style={{ padding: '0 11px', lineHeight: '32px', height: '32px', border: '1px solid #d9d9d9', borderRadius: '4px' }}>
                                    { data['供应商信息']['addr'] }
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row className={styles.Mod} style={{ marginTop: '20px', justifyContent: 'space-between' }}>
                <Col span={24} className={styles.title}>
                    <div className={styles.text}>证照信息</div>
                </Col>
                <Col xs={24} sm={24} md={7} lg={7} className={styles.content}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <div style={{ lineHeight: '24px', paddingLeft: '0px' }}>
                            营业执照
                        </div>
                        {data['营业执照'] ? <img src={data['营业执照']} alt="图片" className={styles.picUpload} /> : <span style={{ color:"darkgray" }}>待上传...</span>}
                    </div>
                </Col>
                <Col xs={24} sm={24} md={7} lg={7} className={styles.content}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <div style={{ lineHeight: '24px', paddingLeft: '0px' }}>
                            经营许可证
                        </div>
                        {data['经营许可证'] ? <img src={data['经营许可证']} alt="图片" className={styles.picUpload} /> : <span style={{ color:"darkgray" }}>待上传...</span>}
                    </div>
                </Col>
                <Col xs={24} sm={24} md={7} lg={7} className={styles.content}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <div style={{ lineHeight: '24px', paddingLeft: '0px' }}>
                            旅行社责任险
                        </div>
                        {data['旅行社责任险'] ? <img src={data['旅行社责任险']} alt="图片" className={styles.picUpload} /> : <span style={{ color:"darkgray" }}>待上传...</span>}
                    </div>
                </Col>
            </Row>
            
            {/* ===== 业务联系人 ===== */}
            <Row className={styles.Mod} style={{ marginTop: '20px' }}>
                <Col span={24} className={styles.title}>
                    <div className={styles.text}>业务联系人</div>
                </Col>
                <Col span={24} className={styles.contentother}>
                    <Row>
                        <Col span={6} className={styles.cell}>
                            <div className={styles.cellLabel}>
                                姓名
                            </div>
                        </Col>
                        <Col span={6} className={styles.cell}>
                            <div className={styles.cellLabel}>
                                性别
                            </div>
                        </Col>
                        <Col span={6} className={styles.cell}>
                            <div className={styles.cellLabel}>
                                座机
                            </div>
                        </Col>
                        <Col span={6} className={styles.cell}>
                            <div className={styles.cellLabel}>
                                手机
                            </div>
                        </Col>
                    </Row>
                </Col>
                <Col span={24} className={styles.contentother}>
                    {
                        data['业务联系人'].map((item, index) => (
                            <Row key={`业务联系人${index}`} >
                                <Col span={6} className={styles.cell}>
                                    <div style={{ padding: '0 0 0 10px', margin:'0 10px',lineHeight: '32px', height: '32px', border: '1px solid #d9d9d9', borderRadius: '4px' }}>
                                        { item['name'] }
                                    </div>
                                </Col>
                                <Col span={6} className={styles.cell}>
                                    <div style={{ padding: '0 0 0 10px', margin:'0 10px', lineHeight: '32px', height: '32px', border: '1px solid #d9d9d9', borderRadius: '4px' }}>
                                        { getEnum('Gender')[item['gender']] }
                                    </div>
                                </Col>
                                <Col span={6} className={styles.cell}>
                                    <div style={{ padding: '0 0 0 10px', margin:'0 10px', lineHeight: '32px', height: '32px', border: '1px solid #d9d9d9', borderRadius: '4px' }}>
                                        { item['phone'] }
                                    </div>
                                </Col>
                                <Col span={6} className={styles.cell}>
                                    <div style={{ padding: '0 0 0 10px', margin:'0 10px', lineHeight: '32px', height: '32px', border: '1px solid #d9d9d9', borderRadius: '4px' }}>
                                        { item['mobile'] }
                                    </div>
                                </Col>
                            </Row>
                        ))
                    }
                </Col>
            </Row>

            {/* ===== 银行账号编辑 ===== */}
            <Row className={styles.Mod} style={{ marginTop: '20px' }}>
                <Col span={24} className={styles.title}>
                    <div className={styles.text}>结算账号</div>
                </Col>
                <Col span={24} className={styles.contentother}>
                    <Row>
                        <Col span={4} className={styles.cell}>
                            <div className={styles.cellLabel}>
                                国家
                            </div>
                        </Col>
                        <Col span={4} className={styles.cell}>
                            <div className={styles.cellLabel}>
                                城市
                            </div>
                        </Col>
                        <Col span={4} className={styles.cell}>
                            <div className={styles.cellLabel}>
                                开户行
                            </div>
                        </Col>
                        <Col span={4} className={styles.cell}>
                            <div className={styles.cellLabel}>
                                户名
                            </div>
                        </Col>
                        <Col span={4} className={styles.cell}>
                            <div className={styles.cellLabel}>
                                账号
                            </div>
                        </Col>
                        <Col span={4} className={styles.cell}>
                            <div className={styles.cellLabel}>
                                网点号
                            </div>
                        </Col>
                    </Row>
                </Col>
                <Col span={24} className={styles.contentother}>
                    {
                        data['银行账号编辑'].map((account, index) => (
                            <Row key={`银行账号编辑${index}`} >
                                <Col span={4} className={styles.cell}>
                                    <div style={{ padding: '0 0 0 10px', margin:'0 10px', lineHeight: '32px', height: '32px', border: '1px solid #d9d9d9', borderRadius: '4px' }}>
                                        { getEnum('Country')[account['country']] }
                                    </div>
                                </Col>
                                <Col span={4} className={[styles.cell, 'clear'].join(' ')}>
                                    <div style={{ padding: '0 0 0 10px', margin:'0 10px', lineHeight: '32px', height: '32px', border: '1px solid #d9d9d9', borderRadius: '4px' }}>
                                        { getEnum('City')[account['city']] }
                                    </div>
                                </Col>
                                <Col span={4} className={styles.cell}>
                                    <div style={{ padding: '0 0 0 10px', margin:'0 10px', lineHeight: '32px', height: '32px', border: '1px solid #d9d9d9', borderRadius: '4px' }}>
                                        { account['bank'] }
                                    </div>
                                </Col>
                                <Col span={4} className={styles.cell}>
                                    <div style={{ padding: '0 0 0 10px', margin:'0 10px', lineHeight: '32px', height: '32px', border: '1px solid #d9d9d9', borderRadius: '4px' }}>
                                        { account['bank_account_name'] }
                                    </div>
                                </Col>
                                <Col span={4} className={styles.cell}>
                                    <div style={{ padding: '0 0 0 10px', margin:'0 10px', lineHeight: '32px', height: '32px', border: '1px solid #d9d9d9', borderRadius: '4px' }}>
                                        { account['bank_account'] }
                                    </div>
                                </Col>
                                <Col span={4} className={styles.cell}>
                                    <div style={{ padding: '0 0 0 10px', margin:'0 10px', lineHeight: '32px', height: '32px', border: '1px solid #d9d9d9', borderRadius: '4px' }}>
                                        { account['bank_outlets'] }
                                    </div>
                                </Col>
                            </Row>
                        ))
                    }
                </Col>
            </Row>

            <Row className={styles.Mod} style={{ marginTop: '20px', justifyContent: 'space-between' }}>
                <Col span={24} className={styles.title}>
                    <div className={styles.text}>备注信息</div>
                </Col>
                <Col span={24} className={styles.contento}>
                    <Input.TextArea
                        value={data['供应商信息']['comment']}
                        placeholder="请输入备注"
                        autoSize={{ minRows: 4, maxRows: 8 }}
                        onChange={e => changeInfo(e.target.value, 'comment')}
                        readOnly
                    />
                </Col>
            </Row>
            <div className={styles.approve}>
                <ApproveModal history={data['审批记录'] || []} passOk={passOk} rejectOk={rejectOk} />
            </div>
        </PageHeaderWrapper >
    );
}

export default Page;
