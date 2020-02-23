import React, { useState } from 'react';
import moment from 'moment';
import '@ant-design/compatible/assets/index.css';
import { DatePicker, TimePicker, Input, Col, Button,Form } from 'antd';
import { FormItemProps } from 'antd/es/form';

import styles from './index.less';

interface IModal {
    info: any,
    onOk: (p: any) => void,
    onCancel: () => void
}

interface ICfg {
    text: string; //label 名
    editable?: boolean; // 可否编辑
    required?: boolean; // 是否必填
}

const initFormItemMap = (list: { [field: string]: ICfg }) => {
    const rst: { [field: string]: FormItemProps } = {};
    Object.keys(list).forEach(field => {
        rst[field] = {
            label: (
                <label className={list[field].required ? "ant-form-item-required" : ""}>
                    {list[field].text}
                </label>
            ),
            children:null
        };
    });
    return rst;
};

const init = (info:any) =>{
    const data = {
        占位时限日志: info['占位时限日志'] ? [...info['占位时限日志']] : [],
        end_date: info.end_date ?moment(info.end_date).format('YYYY-MM-DD'): moment(new Date()).add(1, 'hour').format('YYYY-MM-DD'),
        hour: info.hour ?info.hour: moment(new Date()).format('HH:mm'),
        timer_end_date: info.timer_end_date || moment(new Date()).format('YYYY-MM-DD HH:mm'),
    };
    data.timer_end_date = data.end_date + ' ' + data.hour;
    return data;
}

const Modal: React.FC<IModal> = ({ info, onOk, onCancel }) => {

    const [data, setData] = useState(init(info));

    const [formItemMap, setFormItemMap] = useState(initFormItemMap(
        {
            end_date: {
                text: '时限日期',
                editable: true,
                required: true,
            },
            hour: {
                text: '时限时间',
                editable: true,
                required: true,
            },
        }
    ));

    const cancel = () => {
        if (onCancel) {
            onCancel()
        }
    }

    const ok = () => {
        if (onOk) {
            onOk(data)
        }
    }

    const log = () => {
        if (data['占位时限日志'] && data['占位时限日志'].length > 0) {
            return (
                <Col style={{ margin: '12px 0 24px 0' }} >
                    <Col span={24} className={styles.title}>时限日志:</Col>
                    <Col>
                        <Col span={10}>
                            提交时间
                    </Col>
                        <Col span={12}>
                            到期时间
                    </Col>
                    </Col>
                    {
                        data['占位时限日志'].map((item, index) => (
                            <Col key={`${item.id}index${index}`}>
                                <Col span={10}>
                                    {item.create_at}
                                </Col>
                                <Col span={12}>
                                    {item.timer_end_date}
                                </Col>
                            </Col>
                        ))
                    }

                    <Col span={24} className={styles.change} >变更时限:</Col>
                </Col>
            );
        }
        return (
            <Col style={{ margin: '0' }} >
            </Col>
        );
    }

    const onChange = (field: string, val: moment.Moment|null,format:string) => {
        
        const rst = { ...data };
        if(val){
            rst[field] = val.format(format);
        }else{
            rst[field] = '';
        }
        rst.timer_end_date = rst.end_date + ' ' + rst.hour;
        setData(rst);
    }

    return (
        <>
            {log()}
            <Form.Item
                style={{ margin: "5px 0" }}
                label='时限日期'
                key='end_date'
                {...formItemMap['end_date']}
            >
                <DatePicker
                    style={{ width: "100%" }}
                    format="YYYY-MM-DD"
                    value={ moment(data['end_date'], 'YYYY-MM-DD')}
                    getPopupContainer={(node)=>{return node as HTMLElement}}
                    onChange={val => onChange('end_date', val,'YYYY-MM-DD')}
                />
            </Form.Item>
            <Form.Item
                style={{ margin: "5px 0" }}
                label='时限时间'
                key='hour'
                {...formItemMap['end_date']}
            >
                <TimePicker
                    style={{ width: "100%" }}
                    format="HH:mm"
                    value={moment(data['hour'], 'HH:mm') }
                    getPopupContainer={(node)=>{return node as HTMLElement}}
                    onChange={val => onChange('hour', val,'HH:mm')}
                />
            </Form.Item>
            <Form.Item
                style={{ margin: "5px 0" }}
                label='到期时间'
                key='timer_end_date'
            >
                <Input value={data.timer_end_date} readOnly />
            </Form.Item>

            <Col className={styles.footerBtns}>
                <Button
                    className={styles.btn}
                    type="primary"
                    onClick={e => {
                        cancel();
                    }}
                >
                    取消
                </Button>
                <Button
                    className={styles.btn}
                    type="primary"
                    onClick={e => {
                        ok();
                    }}
                >
                    确定
                </Button>
            </Col>
        </>
    );
}

export default Modal;
