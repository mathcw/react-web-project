import React, { useEffect } from 'react';
import { Col, message } from 'antd';

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
        '审批记录': any[],
        'flow_id': string
    } = {
        profile_photo: '',
        '审批记录': [],
        'flow_id': '0'
    };
    const { viewConfig } = route;
    const { state: ref } = location;

    const { data, setData, load, onCancel, cfg } = useActionPage<typeof initData>(viewConfig, initData, ref);

    const actionMap = {
        关闭: onCancel,
    }

    useEffect(() => {
        load().then((loadRst) => {
            setData({ profile_photo: loadRst.profile_photo, '审批记录': loadRst['审批记录'], flow_id: loadRst.flow_id });
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
                <Col xs={24} sm={24} md={5} lg={5} style={{ marginLeft: 350 }}>
                    <img src={data.profile_photo || ''} alt="avatar" style={{ width: '100%', height: '200px' }} />
                </Col>

                <ApproveModal history={data['审批记录'] || []} passOk={passOk} rejectOk={rejectOk} />
            </div>
        </PageHeaderWrapper>
    );
}

export default Page;
