import React, { useEffect } from 'react';
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Col, Input, InputNumber, DatePicker, Button } from 'antd';

import styles from './batchModal.less';
import moment from 'moment';
interface IProps {
    OnOk: (data: any) => void,
    OnCancel: () => void
}

interface IPriceType {
    price_comment: string,
    peer_price: number,
    retail_price: number,
    price_type: | 1 | 2,
}

interface IState {
    data: {
        '团期库存信息': any[],
        '团期基准价格': IPriceType[],
        '团期其他价格': IPriceType[]
    },
    showWarning: boolean
}

interface ICell {
    initValue: any,
    update: any,
    required: boolean,
    title: string,
    showWarning: boolean,
    type: string
}

function Cell(props: ICell) {
    const { initValue, update, required, title, showWarning, type } = props;
    const [value, setValue] = React.useState(initValue)
    const [error, setError] = React.useState(showWarning && required && !initValue);
    const message = `请输入 ${title} !`;

    useEffect(() => {
        setError(showWarning && required && !value);
    }, [required, showWarning, value]);

    const errorCheck = (newValue: any) => {
        if (required && !newValue) { return true; }
        return false;
    }
    const onChange = (newValue: any, type: any) => {
        if (type === 'date' && newValue !== null) {
            newValue = newValue.format('YYYY-MM-DD');
        }
        setValue(newValue)
        if (errorCheck(newValue)) {
            setError(true);

        } else if (update) {
            setError(false);
            update(newValue)
        }
    }

    return (
        <React.Fragment>
            {type === 'Text' && <Input onChange={e => onChange(e.target.value, 'text')} value={value} style={{ width: '100%' }} />}
            {type === 'Number' && <InputNumber onChange={v => onChange(v, 'number')} value={value} min={0} />}
            {type === 'Date' && <DatePicker getPopupContainer={(node) => node as HTMLElement} style={{ width: '100%' }} format="YYYY-MM-DD" onChange={v => onChange(v, 'date')} value={moment(value)} />}
            {
                error && <span style={{ color: 'red' }}>{message}</span>
            }
        </React.Fragment>
    )
}

function InitState() {
    const basePrice: IPriceType = {
        'price_type': 1, 'price_comment': '', 'peer_price': 0, 'retail_price': 0
    }
    const baseInfo: any = { 'gp_total': 0, 'stock': 0, 'person_limit': 0 }
    const otherPrice:IPriceType[] = [];
    return {
        data: {
            '团期库存信息': [baseInfo],
            '团期基准价格': [basePrice],
            '团期其他价格': otherPrice
        },
        showWarning: false
    }
}


class BatchModal extends React.Component<IProps, IState> {
    readonly state = InitState()

    inputChange = (v: any, field: string, type: string, index: number) => {
        const { data } = this.state;
        if (type === '团期其他价格') {
            data[type][index][field] = v;
        } else {
            data[type][0][field] = v;
        }
        this.setState({ data });
    }

    update = (field: string, type: string, index: number) => (v: any) => {
        this.inputChange(v, field, type, index);
    }

    add_other_price = () => {
        const { data } = this.state;
        data['团期其他价格'].push({ price_type: 2,'price_comment': '', 'peer_price': 0, 'retail_price': 0 });
        this.setState({ data });
    }

    del_other_price = (row: number) => {
        const { data } = this.state;
        data['团期其他价格'].splice(row, 1);

        this.setState({ data });
    }

    submit = () => {
        const { OnOk } = this.props;
        const { data } = this.state;
        let check = false;
        if (data['团期库存信息']) {
            ['gp_total', 'stock', 'person_limit'].forEach((field) => {
                if (check) {
                    return;
                }
                if (!data['团期库存信息'][0][field]) {
                    this.setState({ showWarning: true });
                    check = true;

                }
            });
        }
        if (data['团期基准价格']) {
            ['price_comment', 'peer_price', 'retail_price'].forEach((field) => {
                if (check) {
                    return;
                }
                if (!data['团期基准价格'][0][field]) {
                    this.setState({ showWarning: true });
                    check = true;

                }
            });
        }
        if (data['团期其他价格']) {
            ['price_comment', 'peer_price', 'retail_price'].forEach((field) => {
                if (check) {
                    return;
                }
                data['团期其他价格'].forEach((value: any) => {
                    if (!value[field]) {
                        this.setState({ showWarning: true });
                        check = true;

                    }
                });
            });
        }
        if (!check && OnOk) {
            OnOk(data);
        }
    };

    cancel = () => {
        const { OnCancel } = this.props;
        if (OnCancel) OnCancel();
    }

    render() {
        const { data, showWarning } = this.state;
        return (
            <Col sm={24} md={24} lg={24}>
                <Col className={[styles.batchModal, 'clear'].join(' ')}>
                    {data['团期库存信息'] && <Col className={[styles.mod, 'clear'].join(' ')}>
                        <Col className={styles.modTitle}>
                            <Col className={styles.modTitleText}>库存信息</Col>
                        </Col>
                        <Col className={styles.modContent}>
                            <Col span={8} className={styles.cell}>
                                <Col className={styles.modLabel}>计划总位</Col>
                                <Col className={styles.modValue}>
                                    <Cell
                                        initValue={data['团期库存信息'][0].gp_total}
                                        title='计划总位'
                                        update={this.update('gp_total', '团期库存信息', 0)}
                                        showWarning={showWarning}
                                        required
                                        type='Number'
                                    />
                                </Col>
                            </Col>
                            <Col span={8} className={styles.cell}>
                                <Col className={styles.modLabel}>库存剩余</Col>
                                <Col className={styles.modValue}>
                                    <Cell
                                        initValue={data['团期库存信息'][0].stock}
                                        title='库存剩余'
                                        update={this.update('stock', '团期库存信息', 0)}
                                        showWarning={showWarning}
                                        required
                                        type='Number'
                                    />
                                </Col>
                            </Col>
                            <Col span={8} className={styles.cell}>
                                <Col className={styles.modLabel}>成团人数</Col>
                                <Col className={styles.modValue}>
                                    <Cell
                                        initValue={data['团期库存信息'][0].person_limit}
                                        title='成团人数'
                                        update={this.update('person_limit', '团期库存信息', 0)}
                                        showWarning={showWarning}
                                        required
                                        type='Number'
                                    />
                                </Col>
                            </Col>
                        </Col>
                    </Col>}
                    {data['团期基准价格'] && <Col className={[styles.mod, 'clear'].join(' ')}>
                        <Col className={styles.modTitle}>
                            <Col className={styles.modTitleText}>基准价格</Col>
                        </Col>
                        <Col className={styles.modContent}>
                            <Col span={8} className={styles.cell}>
                                <Col className={styles.modLabel}>价格名称</Col>
                                <Col className={styles.modValue}>
                                    <Cell
                                        initValue={data['团期基准价格'][0].price_comment}
                                        title='价格名称'
                                        update={this.update('price_comment', '团期基准价格', 0)}
                                        showWarning={showWarning}
                                        required
                                        type='Text'
                                    />
                                </Col>
                            </Col>
                            <Col span={8} className={styles.cell}>
                                <Col className={styles.modLabel}>同行价</Col>
                                <Col className={styles.modValue}>
                                    <Cell
                                        initValue={data['团期基准价格'][0].peer_price}
                                        title='同行价'
                                        update={this.update('peer_price', '团期基准价格', 0)}
                                        showWarning={showWarning}
                                        required
                                        type='Number'
                                    />
                                </Col>
                            </Col>
                            <Col span={8} className={styles.cell}>
                                <Col className={styles.modLabel}>直客价</Col>
                                <Col className={styles.modValue}>
                                    <Cell
                                        initValue={data['团期基准价格'][0].retail_price}
                                        title='直客价'
                                        update={this.update('retail_price', '团期基准价格', 0)}
                                        showWarning={showWarning}
                                        required
                                        type='Number'
                                    />
                                </Col>
                            </Col>
                        </Col>
                    </Col>}
                    <Col className={[styles.mod, 'clear'].join(' ')}>
                        <Col className={styles.modTitle}>
                            <Col className={styles.modTitleText}>其他价格</Col>
                            <Col className={styles.add} style={{ marginRight: '-90px' }}>
                                <PlusCircleOutlined
                                    className="pointer"
                                    style={{ color: '#1890FF' }}
                                    onClick={() => this.add_other_price()} />
                            </Col>
                        </Col>
                        <Col className={[styles.modContent, 'clear'].join(' ')}>
                            <Col span={8} className={styles.cell}>
                                <Col className={styles.modLabel}>价格名称</Col>
                            </Col>
                            <Col span={8} className={styles.cell}>
                                <Col className={styles.modLabel}>同行价</Col>
                            </Col>
                            <Col span={8} className={styles.cell}>
                                <Col className={styles.modLabel}>直客价</Col>
                            </Col>
                        </Col>
                        {data['团期其他价格'].map((row: any, index: any) => {
                            return (
                                <Col className={[styles.modContent, 'clear'].join(' ')} key={index}>
                                    <Col span={8} className={styles.cell}>
                                        <Col className={styles.modValue}>
                                            <Cell
                                                initValue={row.price_comment}
                                                title='价格名称'
                                                update={this.update('price_comment', '团期其他价格', index)}
                                                showWarning={showWarning}
                                                required
                                                type='Text'
                                            />
                                        </Col>
                                    </Col>
                                    <Col span={8} className={styles.cell}>
                                        <Col className={styles.modValue}>
                                            <Cell
                                                initValue={row.peer_price}
                                                title='同行价'
                                                update={this.update('peer_price', '团期其他价格', index)}
                                                showWarning={showWarning}
                                                required
                                                type='Number'
                                            />
                                        </Col>
                                    </Col>
                                    <Col span={7} className={styles.cell}>
                                        <Col className={styles.modValue}>
                                            <Cell
                                                initValue={row.retail_price}
                                                title='直客价'
                                                update={this.update('retail_price', '团期其他价格', index)}
                                                showWarning={showWarning}
                                                required
                                                type='Number'
                                            />
                                        </Col>
                                    </Col>
                                    {/* <Col className={styles.cell}> */}
                                    <MinusCircleOutlined className={styles.delete} onClick={() => this.del_other_price(index)} />
                                    {/* </Col> */}
                                </Col>
                            );
                        })}
                    </Col>
                </Col>
                <Col className={styles.footerBtnBox}>
                    <Button
                        type="primary"
                        onClick={() => {
                            this.cancel();
                        }}
                        className={styles.footerBtn}
                    >
                        取消
                    </Button>
                    <Button
                        className={styles.footerBtn}
                        type="primary"
                        onClick={() => {
                            this.submit();
                        }}
                    >
                        确定
                    </Button>
                </Col>
            </Col>
        );
    }
}

export default BatchModal;