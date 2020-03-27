import React, { useEffect } from 'react';
import { Col, message } from 'antd';
import BraftEditor, { EditorState } from 'braft-editor'
import 'braft-editor/dist/index.css'
import { IActionPageProps } from '@/viewconfig/ActionConfig';
import PageHeaderWrapper from '@/components/PageHeaderWrapper/actionPageHeader';
import renderHeaderBtns from '@/components/PageHeaderWrapper/headerBtns';

import styles from './edit.less';
import { useActionPage, useActionBtn } from '@/utils/ActionPageHooks';
import { ApproveModal } from '@/components/ApproveBtns';
import router from 'umi/router';
import { submit } from '@/utils/req';

const Page: React.FC<IActionPageProps> = ({ route, location }) => {

    const initData: {
        'title': string,
        'editor': EditorState,
        'body': string,
        'body_html': string,
        '审批记录': any[],
        'flow_id': string
    } = {
        'title': '',
        'editor': BraftEditor.createEditorState(''),
        'body': '',
        'body_html': '',
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
            let State = BraftEditor.createEditorState(loadRst.body || '');
            setData({ title: loadRst.title, editor: State, body: loadRst.body, body_html: loadRst.body_html,'审批记录':loadRst['审批记录'],flow_id:loadRst.flow_id });
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
            <Col className={[styles.Approve].join(' ')}>
                <Col className={styles.title}>
                    <Col className={styles.titleL}>
                        <Col className={styles.text}>{data.title}</Col>
                    </Col>
                </Col>
                <Col className="editor-wrapper">
                    <BraftEditor
                        value={data.editor}
                        readOnly
                        controls={[]}
                        contentStyle={{ height: 'auto', maxHeight: '450px' }}
                    />
                </Col>
                <ApproveModal history={data['审批记录'] || []} passOk={passOk} rejectOk={rejectOk} />
            </Col>

        </PageHeaderWrapper>
    );
}

export default Page;
