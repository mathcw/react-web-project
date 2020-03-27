import React, { useEffect } from 'react';
import { Col, message,Row } from 'antd';

import { IActionPageProps } from '@/viewconfig/ActionConfig';
import PageHeaderWrapper from '@/components/PageHeaderWrapper/actionPageHeader';
import renderHeaderBtns from '@/components/PageHeaderWrapper/headerBtns';

import { useActionPage, useActionBtn } from '@/utils/ActionPageHooks';
import { ApproveModal } from '@/components/ApproveBtns';
import router from 'umi/router';
import { submit } from '@/utils/req';

const Page: React.FC<IActionPageProps> = ({ route, location }) => {
    const initData: {
        'profile_photo': string,
        'supplier_full_name': string,
        'supplier_department_name': string,
        'name': string,
        '审批记录': any[],
        'flow_id': string
    } = {
        profile_photo: '',
        supplier_full_name: '',
        supplier_department_name: '',
        name: '',
        '审批记录': [],
        'flow_id': '0'
    };
    const { authority,viewConfig } = route;
    const { state: ref } = location;

    const { data, setData, load, onCancel, cfg } = useActionPage<typeof initData>(authority,viewConfig, initData, ref);

    const actionMap = {
        关闭: onCancel,
    }

    useEffect(() => {
        load().then((loadRst) => {
            setData({ 
                profile_photo: loadRst.profile_photo,
                '审批记录': loadRst['审批记录'],
                flow_id: loadRst.flow_id,
                supplier_full_name: loadRst.supplier_full_name,
                supplier_department_name: loadRst.supplier_department_name,
                name:loadRst.name
            });
        });
    }, [])

    const { btns } = useActionBtn(viewConfig, actionMap);

    const passOk = (comment: string) => {
        if (cfg.submit) {
            submit(cfg.submit.url, {
                flow_id: data.flow_id
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
                flow_id: data.flow_id
                , opinion: 2, comment: comment
            }, cfg.submit.data).then((r: any) => {
                message.success(r.message);
                router.goBack();
            })
        }
    }

    return (
        <PageHeaderWrapper
            title={cfg.title || ''}
            extra={renderHeaderBtns(btns)}
        >
            <div style={{ backgroundColor: 'white' }}>
                <Row>
                    <Col xs={24} sm={24} md={24} lg={24}>
                        <div style={{ textAlign:"center" }}>
                            <img src={data.profile_photo || ''} alt="avatar" style={{ width: '200px', height: '200px' }} />
                        </div>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} style={{ textAlign:"center",padding:"20px 0" }}>
                        {data.supplier_full_name}-{data.supplier_department_name}-{data.name}
                    </Col>
                </Row>

                <ApproveModal history={data['审批记录'] || []} passOk={passOk} rejectOk={rejectOk} />
            </div>
        </PageHeaderWrapper>
    );
}

export default Page;