import React, { useEffect } from 'react';
import { Col, Input, message, Upload, Icon } from 'antd';
import BraftEditor, { EditorState, ControlType, ExtendControlType } from 'braft-editor'
import { ContentUtils } from 'braft-utils'
import 'braft-editor/dist/index.css'
import { IActionPageProps } from '@/viewconfig/ActionConfig';
import PageHeaderWrapper from '@/components/PageHeaderWrapper/actionPageHeader';
import renderHeaderBtns from '@/components/PageHeaderWrapper/headerBtns';

import styles from './edit.less';
import { useActionPage, useActionBtn } from '@/utils/ActionPageHooks';
import { submit, upload } from '@/utils/req';
import { router } from 'umi';

const Page: React.FC<IActionPageProps> = ({ route, location }) => {

    const initData: {
        'title': string,
        'editor': EditorState,
        'body': string,
        'body_html': string,
        'xml'?: string,
    } = {
        'title': '',
        'editor': BraftEditor.createEditorState(''),
        'body': '',
        'body_html': '',
        'xml': ''
    };
    const { viewConfig } = route;
    const { state: ref } = location;

    const { data, setData, load, onCancel, cfg } = useActionPage<typeof initData>(viewConfig, initData, ref);

    const onOk = () => {
        if (cfg.submit) {
            const post_data = {
                title: data.title,
                body: data.body,
                body_html: data.body_html
            }
            if (ref && ref.id) {
                post_data['id'] = ref.id
            }

            submit(cfg.submit.url, post_data, cfg.submit.data).then((r: any) => {
                message.success(r.message);
                router.goBack();
            })
        }
    }

    const actionMap = {
        提交: onOk,
        关闭: onCancel,
    }

    useEffect(() => {
        load().then((loadRst) => {
            let State = BraftEditor.createEditorState(loadRst.body || '');
            setData({ title: loadRst.title, editor: State, body: loadRst.body, body_html: loadRst.body_html });
        });
    }, [])

    const changeAnnTitle = (e: { target: { value: string; }; }) => {
        setData({ ...data, title: e.target.value });
    };

    const handleEditorChange = (HeditorState: EditorState) => {
        setData({ ...data, editor: HeditorState, body_html: HeditorState.toHTML(), body: HeditorState.toRAW() });
    };

    const controls: ControlType[] = ['bold', 'italic', 'underline', 'text-color', 'separator', 'link', 'separator'];

    const uploadHandler = (param: any) => {
        const formData = new FormData();
        formData.append('file', param.file);
        upload(formData, 'announce_media').then((res: { success: boolean; save_path: string; }) => {
            if (res.success && res.save_path) {
                setData({
                    ...data, editor: ContentUtils.insertMedias(data.editor, [{
                        type: 'IMAGE',
                        url: res.save_path
                    }])
                })
            }
        }, () => {
        })
    }

    const extendControls: ExtendControlType[] = [
        {
            key: 'antd-uploader',
            type: 'component',
            component: (
                <Upload
                    accept="image/*"
                    showUploadList={false}
                    customRequest={uploadHandler}
                >
                    <button type="button" className="control-item button upload-button" data-title="插入图片">
                        <Icon type="picture" theme="filled" />
                    </button>
                </Upload>
            )
        }
    ]

    const { btns } = useActionBtn(viewConfig, actionMap);

    return (
        <PageHeaderWrapper
            title={cfg.title || ''}
            extra={renderHeaderBtns(btns)}
        >
            <Col className={styles.title}>
                <Col className={styles.titleL}>
                    <Col className={styles.text} style={{ marginRight: '20px' }}>公告标题 :</Col>
                    <Col className={styles.text}>
                        <Input
                            placeholder="请输入公告标题"
                            value={data.title}
                            onChange={changeAnnTitle}
                        />
                    </Col>
                </Col>
            </Col>
            <Col className={styles.title}>
                <Col className={styles.titleL}>
                    <Col className={styles.text}>内容 :</Col>
                </Col>
            </Col>
            <Col className="editor-wrapper" style={{ backgroundColor: 'white' }}>
                <BraftEditor
                    value={data.editor}
                    onChange={handleEditorChange}
                    controls={controls}
                    extendControls={extendControls}
                />
            </Col>

        </PageHeaderWrapper>
    );
}

export default Page;
