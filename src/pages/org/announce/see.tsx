import React, { useEffect } from 'react';
import { Col } from 'antd';
import BraftEditor, { EditorState } from 'braft-editor'
import 'braft-editor/dist/index.css'
import { IActionPageProps } from '@/viewconfig/ActionConfig';
import PageHeaderWrapper from '@/components/PageHeaderWrapper/actionPageHeader';
import renderHeaderBtns from '@/components/PageHeaderWrapper/headerBtns';

import styles from './edit.less';
import { useActionPage, useActionBtn } from '@/utils/ActionPageHooks';

const Page: React.FC<IActionPageProps> = ({ route, location }) => {

    const initData: {
        'title': string,
        'editor': EditorState,
        'body': string,
        'body_html': string,
    } = {
        'title': '',
        'editor': BraftEditor.createEditorState(''),
        'body': '',
        'body_html': ''
    };
    const { viewConfig } = route;
    const { state: ref } = location;

    const { data, setData, load, onCancel, cfg } = useActionPage<typeof initData>(viewConfig, initData, ref);

    const actionMap = {
        关闭: onCancel,
    }

    useEffect(() => {
        load().then((loadRst) => {
            let State = BraftEditor.createEditorState(loadRst.body || '');
            setData({ title: loadRst.title, editor: State, body: loadRst.body, body_html: loadRst.body_html });
        });
    }, [])

    const { btns } = useActionBtn(viewConfig, actionMap);

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
            </Col>
        </PageHeaderWrapper>
    );
}

export default Page;
