import React, { useState } from 'react';
import moment from 'moment';
import { DatePicker, TimePicker, Input, Col, Button, Form, Row } from 'antd';

import styles from './index.less';

interface IModal {
    info: any,
    onOk: (p: any) => void,
    onCancel: () => void
}

const init = (info: any) => {
    const data = {
        占位时限日志: info['占位时限日志'] ? [...info['占位时限日志']] : [],
        end_date: !!info.end_date ? moment(info.end_date) : moment(new Date()),
        hour: !!info.hour ? moment(info.hour) : moment(new Date()),
        timer_end_date: !! info.timer_end_date ? moment(info.timer_end_date).format('YYYY-MM-DD HH:mm') : moment(new Date()).format('YYYY-MM-DD HH:mm'),
    };
    data.timer_end_date = moment(data.end_date).format('YYYY-MM-DD ') + ' ' + moment(data.hour).format('HH:mm');
    return data;
}

const Modal: React.FC<IModal> = ({ info, onOk, onCancel }) => {

    const data = init(info);
    const formData = {
        end_date:data['end_date'],
        hour:data['hour'],
        timer_end_date:data['timer_end_date']
    }

    const [form] = Form.useForm();

    const cancel = () => {
        if (onCancel) {
            onCancel()
        }
    }

    const ok = () => {
        if (onOk) {
            form.validateFields().then(
                (formValues:any)=>{
                onOk({
                    end_date: formValues['end_date'].format('YYYY-MM-DD'),
                    hour:formValues['hour'].format('HH:mm'),
                    timer_end_date:formValues['timer_end_date']
                })
                },()=>{

                }
            );
        }
    }

    const log = () => {
        if (data['占位时限日志'] && data['占位时限日志'].length > 0) {
            return (
                <>
                <Row style={{ margin: '12px 0 24px 0' }} >
                    <Col span={24} className={styles.title}>时限日志:</Col>
                </Row>
                <Row>
                    <Col span={10}>
                        提交时间
                    </Col>
                    <Col span={12}>
                        到期时间
                    </Col>
                </Row>
                {
                    data['占位时限日志'].map((item, index) => (
                        <Row key={`${item.id}index${index}`}>
                            <Col span={10}>
                                {item.create_at}
                            </Col>
                            <Col span={12}>
                                {item.timer_end_date}
                            </Col>
                        </Row>
                    ))
                }
                <Row>
                    <Col span={24} className={styles.change} >变更时限:</Col>
                </Row>
                </>
            );
        }
        return (
            <Row style={{ margin: '0' }} >
            </Row>
        );
    }

    const onChange = (field: string, val: moment.Moment | null, format: string) => {

        const formValues = form.getFieldsValue();
        if(val){
            formValues[field] = val;
            form.setFieldsValue(
                {timer_end_date:formValues['end_date'].format('YYYY-MM-DD') + ' ' + formValues['hour'].format('HH:mm')}
            )
        }else{
            form.setFieldsValue(
                {timer_end_date:''}
            )
        }
    }

    return (
        <>
            {log()}
            <Form layout="vertical" form={form} initialValues={formData}>
                <Form.Item
                    style={{ margin: "10px 0" }}
                    label='时限日期'
                    name='end_date'
                    rules={[{ required: true ,message: '时限日期是必填的'}]}
                >
                    <DatePicker
                        style={{ width: "100%" }}
                        format="YYYY-MM-DD"
                        getPopupContainer={(node) => { return node as HTMLElement }}
                        onChange={val => onChange('end_date', val, 'YYYY-MM-DD')}
                    />
                </Form.Item>
                <Form.Item
                    style={{ margin: "10px 0" }}
                    label='时限时间'
                    name='hour'
                    rules={[{ required: true,message: '时限时间是必填的' }]}
                >
                    <TimePicker
                        style={{ width: "100%" }}
                        format="HH:mm"
                        getPopupContainer={(node) => { return node as HTMLElement }}
                        onChange={val => onChange('hour', val, 'HH:mm')}
                    />
                </Form.Item>
                <Form.Item
                    style={{ margin: "10px 0" }}
                    label='到期时间'
                    key='timer_end_date'
                    name='timer_end_date'
                >
                    <Input readOnly />
                </Form.Item>
            </Form>

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
