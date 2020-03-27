import React, { useState, useEffect } from 'react';

import PageHeaderWrapper from '@/components/PageHeaderWrapper/actionPageHeader';
import renderHeaderBtns from '@/components/PageHeaderWrapper/headerBtns';
import { IActionPageProps } from '@/viewconfig/ActionConfig';
import { useActionPage, useActionBtn } from '@/utils/ActionPageHooks';

import styles from './edit.less';
import { Row, Col, Upload, message, Select, Input, Button } from 'antd';
import { LoadingOutlined, PlusOutlined, MinusCircleFilled } from '@ant-design/icons';
import { upload } from '@/utils/req';
import { getEnum } from '@/utils/enum';

const { Dragger } = Upload;

const uploadButton = (loading: boolean) =>
    <div>
        <p className="ant-upload-drag-icon">
            {
                loading && <LoadingOutlined />
            }
            {
                !loading && <PlusOutlined />
            }
        </p>
        <p>点击或者拖拽到本区域进行上传</p>
    </div>

const Page: React.FC<IActionPageProps> = ({ route, location }) => {
    const { authority,viewConfig } = route;
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

    const { data, setData, load, onOk, onCancel, cfg } = useActionPage<typeof initData>(authority,viewConfig, initData, state);
    const [stampLoading, setStampLoading] = useState(false);
    const [yyzzLoading, setYyzzLoading] = useState(false);
    const [jyLoading, setJyLoading] = useState(false);
    const [zrxLoading, setZrxLoading] = useState(false);

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

    const imgUploadCheck = (file: File) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('请上传 JPG/PNG 图片!');
            return isJpgOrPng;
        }
        const isLt1M = (file.size / 1024 / 1024) < 1;
        if (!isLt1M) {
            message.error('图片不能超过 1MB!');
            return isLt1M;
        }
        return isJpgOrPng && isLt1M;
    }

    const handleChange = (info: any, field: string) => {
        if (info.file.status === 'uploading') {
            if (field === 'stamp')
                setStampLoading(true);
            if (field === '营业执照')
                setYyzzLoading(true);
            if (field === '经营许可证')
                setJyLoading(true);
            if (field === '旅行社责任险')
                setZrxLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            if (field === 'stamp') {
                setStampLoading(false);
                setData({ ...data, stamp: info.file.url })
            }
            if (field === '营业执照') {
                setYyzzLoading(true);
                setData({ ...data, '营业执照': info.file.url })
            }
            if (field === '经营许可证') {
                setJyLoading(true);
                setData({ ...data, '经营许可证': info.file.url })
            }
            if (field === '旅行社责任险') {
                setZrxLoading(true);
                setData({ ...data, '旅行社责任险': info.file.url })
            }
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} 文件上传失败.`);
        }
    };

    const handleCustomRequest = (prop: { file: File }, field: string) => {
        const { file } = prop;
        const formData = new FormData();
        formData.append('file', file);
        upload(formData, 'erpSup').then(res => {
            if (res.success && res.save_path) {
                const fileinfo = { file: { status: 'done', url: res.save_path } }
                handleChange(fileinfo, field);
            } else {
                handleChange({ file: { status: 'error', name: file.name } }, field);
            }
        }, () => {
            handleChange({ file: { status: 'error', name: file.name } }, field);
        })
    };

    const changeInfo = (val: any, field: string) => {
        data['供应商信息'][field] = val;
        setData({ ...data })
    }

    const changeAccountContact = (val: any, field: string, index: number) => {
        if (field == 'country') {
            data['银行账号编辑'][index].city = '';
        }
        data['银行账号编辑'][index][field] = val;
        setData({ ...data });
    }

    const changeYwContact = (val: any, field: string, index: number) => {
        data['业务联系人'][index][field] = val;
        setData({ ...data });
    }

    const addYWCon = () => {
        data['业务联系人'].push({});
        setData({ ...data });
    }

    const addYHCon = () => {
        data['银行账号编辑'].push({});
        setData({ ...data });
    }

    const deleteRow = (block: string, index: number) => {
        data[block].splice(index, 1);
        setData({ ...data });
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
                        <Dragger
                            name="stamp"
                            multiple={false}
                            showUploadList={false}
                            beforeUpload={imgUploadCheck}
                            onChange={info => handleChange(info, 'stamp')}
                            customRequest={({ file }) => handleCustomRequest({ file }, 'stamp')}
                            className='upload-dragger'
                        >
                            {data.stamp ? <img src={data.stamp} alt="图片" className={styles.picUpload} /> : uploadButton(stampLoading)}
                        </Dragger>
                    </div>
                </Col>
                <Col xs={24} sm={24} md={18} lg={18} className={styles.content}>
                    <Row>
                        <Col span={12}>
                            <div className={styles.cell}>
                                <div className={styles.cellLabel}>
                                    商家类型
                                </div>
                                <Select
                                    onChange={(value: any) => { changeInfo(value, 'supp_type') }}
                                    showSearch
                                    optionFilterProp='children'
                                    className={styles.cellSelect}
                                    placeholder={'商家类型'}
                                    value={data['供应商信息']['supp_type']}
                                >
                                    {
                                        Object.keys(getEnum('SuppKind')).map(key =>
                                            <Select.Option key={key} value={key}>{getEnum('SuppKind')[key]}</Select.Option>
                                        )
                                    }
                                </Select>
                            </div>
                        </Col>
                        <Col span={12}>
                            <div className={styles.cell}>
                                <div className={styles.cellLabel}>
                                    所在城市
                                </div>
                                <Select
                                    onChange={(value: any) => { changeInfo(value, 'city_id') }}
                                    showSearch
                                    optionFilterProp='children'
                                    className={styles.cellSelect}
                                    placeholder={'所在城市'}
                                    value={data['供应商信息']['city_id']}
                                >
                                    {
                                        Object.keys(getEnum('City')).map(key =>
                                            <Select.Option key={key} value={key}>{getEnum('City')[key]}</Select.Option>
                                        )
                                    }
                                </Select>
                            </div>
                        </Col>
                        <Col span={12}>
                            <div className={styles.cell}>
                                <div className={styles.cellLabel}>
                                    商家编号
                                </div>
                                <div style={{ padding: '0 11px', lineHeight: '32px', height: '32px', border: '1px solid #d9d9d9', borderRadius: '4px' }}>
                                    {data['供应商信息']['id'] ? 'S0'+data['供应商信息']['id'] : ''}
                                </div>
                            </div>
                        </Col>
                        <Col span={12}>
                            <div className={styles.cell}>
                                <div className={styles.cellLabel}>
                                    公司全称
                                </div>
                                <Input
                                    className={styles.cellInput}
                                    placeholder="请输入公司全称"
                                    value={data['供应商信息']['full_name']}
                                    onChange={e => changeInfo(e.target.value, 'full_name')}
                                />
                            </div>
                        </Col>
                        <Col span={12}>
                            <div className={styles.cell}>
                                <div className={styles.cellLabel}>
                                    品牌名称
                                </div>
                                <Input
                                    className={styles.cellInput}
                                    placeholder="请输入品牌名称"
                                    value={data['供应商信息']['brand']}
                                    onChange={e => changeInfo(e.target.value, 'brand')}
                                />
                            </div>
                        </Col>
                        <Col span={12}>
                            <div className={styles.cell}>
                                <div className={styles.cellLabel}>
                                    办公地址
                                </div>
                                <Input
                                    className={styles.cellInput}
                                    placeholder="请输入办公地址"
                                    value={data['供应商信息']['addr']}
                                    onChange={e => changeInfo(e.target.value, 'addr')}
                                />
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
                        <Dragger
                            name="营业执照"
                            multiple={false}
                            showUploadList={false}
                            beforeUpload={imgUploadCheck}
                            onChange={info => handleChange(info, '营业执照')}
                            customRequest={({ file }) => handleCustomRequest({ file }, '营业执照')}
                            className='upload-dragger'
                        >
                            {data['营业执照'] ? <img src={data['营业执照']} alt="图片" className={styles.picUpload} /> : uploadButton(yyzzLoading)}
                        </Dragger>
                    </div>
                </Col>
                <Col xs={24} sm={24} md={7} lg={7} className={styles.content}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <div style={{ lineHeight: '24px', paddingLeft: '0px' }}>
                            经营许可证
                        </div>
                        <Dragger
                            name="经营许可证"
                            multiple={false}
                            showUploadList={false}
                            beforeUpload={imgUploadCheck}
                            onChange={info => handleChange(info, '经营许可证')}
                            customRequest={({ file }) => handleCustomRequest({ file }, '经营许可证')}
                            className='upload-dragger'
                        >
                            {data['经营许可证'] ? <img src={data['经营许可证']} alt="图片" className={styles.picUpload} /> : uploadButton(jyLoading)}
                        </Dragger>
                    </div>
                </Col>
                <Col xs={24} sm={24} md={7} lg={7} className={styles.content}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <div style={{ lineHeight: '24px', paddingLeft: '0px' }}>
                            旅行社责任险
                        </div>
                        <Dragger
                            name="旅行社责任险"
                            multiple={false}
                            showUploadList={false}
                            beforeUpload={imgUploadCheck}
                            onChange={info => handleChange(info, '旅行社责任险')}
                            customRequest={({ file }) => handleCustomRequest({ file }, '旅行社责任险')}
                            className='upload-dragger'
                        >
                            {data['旅行社责任险'] ? <img src={data['旅行社责任险']} alt="图片" className={styles.picUpload} /> : uploadButton(zrxLoading)}
                        </Dragger>
                    </div>
                </Col>
            </Row>
            
            {/* ===== 业务联系人 ===== */}
            <Row className={styles.Mod} style={{ marginTop: '20px' }}>
                <Col span={24} className={styles.title}>
                    <div className={styles.text}>业务联系人</div>
                    <Button
                        type="primary"
                        size="small"
                        className={styles.btns}
                        onClick={() => {
                            addYWCon()
                        }}
                    >
                        添加
                    </Button>
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
                                    <Input
                                        style={{ width: '95%' }}
                                        placeholder="姓名"
                                        value={item['name']}
                                        onChange={e => changeYwContact(e.target.value, 'name', index)}
                                    />
                                </Col>
                                <Col span={5} className={styles.cell}>
                                    <Select
                                        style={{ width: '95%' }}
                                        onChange={(value: any) => { changeYwContact(value, 'gender', index) }}
                                        showSearch
                                        optionFilterProp='children'
                                        className={styles.cellSelect}
                                        placeholder='性别'
                                        value={item['gender']}
                                    >
                                        {
                                            Object.keys(getEnum('Gender')).map(key =>
                                                <Select.Option key={key} value={key}>{getEnum('Gender')[key]}</Select.Option>
                                            )
                                        }
                                    </Select>
                                </Col>
                                <Col span={6} className={styles.cell}>
                                    <Input
                                        style={{ width: '95%' }}
                                        placeholder="座机"
                                        value={item['phone']}
                                        onChange={e => changeYwContact(e.target.value, 'phone', index)}
                                    />
                                </Col>
                                <Col span={6} className={styles.cell}>
                                    <Input
                                        style={{ width: '95%' }}
                                        placeholder="手机"
                                        value={item['mobile']}
                                        onChange={e => changeYwContact(e.target.value, 'mobile', index)}
                                    />
                                </Col>
                                <Col span={1} style={{ paddingTop: '5px' }}>
                                    <MinusCircleFilled
                                        style={{ color: '#ff4d4f', fontSize: '1.5em' }}
                                        onClick={() => {
                                            deleteRow('业务联系人', index)
                                        }}
                                    />
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
                    <Button
                        type="primary"
                        size="small"
                        className={styles.btns}
                        onClick={()=>{
                            addYHCon();
                        }}
                    >
                        添加
                    </Button>
                </Col>
                <Col span={24} className={styles.contentother}>
                    <Row>
                        <Col span={3} className={styles.cell}>
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
                                <Col span={3} className={styles.cell}>
                                    <Select
                                        style={{ width: '95%' }}
                                        onChange={(value: any) => { changeAccountContact(value, 'country', index) }}
                                        showSearch
                                        optionFilterProp='children'
                                        className={styles.cellSelect}
                                        placeholder='开户国家'
                                        value={account['country']}
                                    >
                                        {
                                            Object.keys(getEnum('Country')).map(key =>
                                                <Select.Option key={key} value={key}>{getEnum('Country')[key]}</Select.Option>
                                            )
                                        }
                                    </Select>
                                </Col>
                                <Col span={4} className={[styles.cell, 'clear'].join(' ')}>
                                    <Select
                                        style={{ width: '95%' }}
                                        onChange={(value: any) => { changeAccountContact(value, 'city', index) }}
                                        showSearch
                                        optionFilterProp='children'
                                        className={styles.cellSelect}
                                        placeholder='开户城市'
                                        value={account['city']}
                                    >
                                        {
                                            Object.keys(getEnum({ 'text': '', 'type': 'City', 'cascade': 'country' }, account)).map(key =>
                                                <Select.Option key={key} value={key}>{getEnum({ 'text': '', 'type': 'City', 'cascade': 'country' }, account)[key]}</Select.Option>
                                            )
                                        }
                                    </Select>
                                </Col>
                                <Col span={4} className={styles.cell}>
                                    <Input
                                        style={{ width: '95%' }}
                                        placeholder="开户行"
                                        value={account['bank']}
                                        onChange={e => changeAccountContact(e.target.value, 'bank', index)}
                                    />
                                </Col>
                                <Col span={4} className={styles.cell}>
                                    <Input
                                        style={{ width: '95%' }}
                                        placeholder="户名"
                                        value={account['bank_account_name']}
                                        onChange={e => changeAccountContact(e.target.value, 'bank_account_name', index)}
                                    />
                                </Col>
                                <Col span={4} className={styles.cell}>
                                    <Input
                                        style={{ width: '95%' }}
                                        placeholder="账号"
                                        value={account['bank_account']}
                                        onChange={e => changeAccountContact(e.target.value, 'bank_account', index)}
                                    />
                                </Col>
                                <Col span={4} className={styles.cell}>
                                    <Input
                                        style={{ width: '95%' }}
                                        placeholder="网点号"
                                        value={account['bank_outlets']}
                                        onChange={e => changeAccountContact(e.target.value, 'bank_outlets', index)}
                                    />
                                </Col>
                                <Col span={1} style={{ paddingTop: '5px' }}>
                                    <MinusCircleFilled
                                        style={{ color: '#ff4d4f', fontSize: '1.5em' }}
                                        onClick={() => {
                                            deleteRow('银行账号编辑', index)
                                        }}
                                    />
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
                    />
                </Col>
            </Row>
        </PageHeaderWrapper >
    );
}

export default Page;
