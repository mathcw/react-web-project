import React, { useEffect, useState } from 'react';
import { Input, Button, Row, Col, message,Switch } from 'antd';
import { IModPageProps } from '@/viewconfig/ModConfig';
import PageHeaderWrapper from "@/components/PageHeaderWrapper";
import { getModConfig } from '@/utils/utils';
import { read,submit as post } from '@/utils/req';
import styles from './setting.less';


const ConfigPage: React.FC<IModPageProps> = ({ route }) => {
    const { viewConfig } = route;
    const initData = {
        系统配置:'',
        系统参数:{
            'pdf_cvt_url':'',
            'gs':'',
            'exiftool':'',
            'cpdf':'',
            'dispatcher':'',
            'dispatcher_port':'',
            'afsKey':'',
            'afsSecret':'',
            'frontAfsSecret':'',
            'enableAfs':false
        }
    }
    const [data,setData] = useState<typeof initData>(initData);
    const load = () =>{
        const cfg = getModConfig(viewConfig);
        if(cfg.read){
            read(cfg.read.url, { mod: viewConfig}).then(r => {
                setData({...r.data});
            })
        }
    }
    useEffect(() => {
        load();
    }, []);
    const changeSysParams = (field:string,value:any)=>{
        data['系统参数'][field] = value;
        setData({...data});
    }
    const submit = () =>{
        post('/sys/Config/submit', { key: '系统参数', value: { ...data['系统参数'] } }).then(
            r => {
                message.success(r.message);
            },
            e => {
                return e;
            }
        );
    }
    return (
        <PageHeaderWrapper>
            <div className={styles.Config}>
                <Row className={styles.cellBox}>
                    <Col span={24} className={styles.cell}>
                        <Col className={`${styles.title} ${styles.rowtitle}`}>pdf_cvt_url</Col>
                        <Row gutter={8} className={styles.row}>
                            <Col span={10}>
                                <Input
                                    value={data['系统参数'].pdf_cvt_url || ''}
                                    onChange={e => changeSysParams('pdf_cvt_url', e.target.value)}
                                    placeholder='pdf_cvt_url'
                                />
                            </Col>
                        </Row>
                    </Col>
                    <Col span={24} className={styles.cell}>
                        <Col className={`${styles.title} ${styles.rowtitle}`}>gs</Col>
                        <Row gutter={8} className={styles.row}>
                            <Col>
                                <Input
                                    value={data['系统参数'].gs || ''}
                                    onChange={e => changeSysParams('gs', e.target.value)}
                                />
                            </Col>
                        </Row>
                    </Col>
                    <Col span={24} className={styles.cell}>
                        <Col className={`${styles.title} ${styles.rowtitle}`}>exiftool</Col>
                        <Row gutter={8} className={styles.row}>
                            <Col>
                                <Input
                                    value={data['系统参数'].exiftool || ''}
                                    onChange={e => changeSysParams('exiftool', e.target.value)}
                                />
                            </Col>
                        </Row>
                    </Col>
                    <Col span={24} className={styles.cell}>
                        <Col className={`${styles.title} ${styles.rowtitle}`}>cpdf</Col>
                        <Row gutter={8} className={styles.row}>
                            <Col>
                                <Input
                                    value={data['系统参数'].cpdf || ''}
                                    onChange={e => changeSysParams('cpdf', e.target.value)}
                                />
                            </Col>
                        </Row>
                    </Col>
                    <Col span={24} className={styles.cell}>
                        <Col className={`${styles.title} ${styles.rowtitle}`}>调度者</Col>
                        <Row gutter={8} className={styles.row}>
                            <Col span={7}>
                                <Input
                                    value={data['系统参数'].dispatcher || ''}
                                    onChange={e => changeSysParams('dispatcher', e.target.value)}
                                />
                            </Col>
                            <Col span={7}>
                                <Input
                                    value={data['系统参数'].dispatcher_port || ''}
                                    onChange={e => changeSysParams('dispatcher_port', e.target.value)}
                                    placeholder='port'
                                />
                            </Col>
                        </Row>
                    </Col>
                    <Col span={24} className={styles.cell}>
                        <Col className={`${styles.title} ${styles.rowtitle}`}>阿里云afs</Col>
                        <Row gutter={8} className={styles.row}>
                            <Col span={2}>
                                <Switch checked={data['系统参数'].enableAfs} onChange={(checked)=>changeSysParams('enableAfs', checked)} />
                            </Col>
                            <Col span={5}>
                                <Input
                                    value={data['系统参数'].afsKey || ''}
                                    onChange={e => changeSysParams('afsKey', e.target.value)}
                                    placeholder='afsKey'
                                    disabled={!data['系统参数'].enableAfs}
                                />
                            </Col>
                            <Col span={5}>
                                <Input
                                    value={data['系统参数'].afsSecret || ''}
                                    onChange={e => changeSysParams('afsSecret', e.target.value)}
                                    placeholder='afsSecret'
                                    disabled={!data['系统参数'].enableAfs}
                                />
                            </Col>
                            <Col span={5}>
                                <Input
                                    value={data['系统参数'].frontAfsSecret || ''}
                                    onChange={e => changeSysParams('frontAfsSecret', e.target.value)}
                                    placeholder='frontAfsSecret'
                                    disabled={!data['系统参数'].enableAfs}
                                />
                            </Col>

                        </Row>
                    </Col>
                </Row>
                <div className="text-center">
                    <Button type="primary" onClick={submit}>
                        保存
                    </Button>
                </div>
            </div>
        </PageHeaderWrapper>
    );
}

export default ConfigPage;
