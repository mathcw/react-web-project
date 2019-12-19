import React from 'react';
import { Button, Modal } from 'antd';
import { IModBtn } from '@/viewconfig/ModConfig';
import styles from './index.less';

export default (btns:IModBtn[]) => (
    <div className={[styles.HeaderOperator, Object.keys(btns).length > 0 ? '' : 'hide'].join(' ')}>
        {
            Object.keys(btns).map(key => (
                <div key={key} className="dib">
                <Button
                icon={btns[key].icon || undefined}
                type={btns[key].type || undefined}
                size={btns[key].size || undefined}
                onClick={() => {
                    if (!btns[key].onClick) {
                        Modal.error({
                            title: `${key}未配置`,
                            content: `${key}未配置`,
                        })
                        return;
                    }
                    btns[key].onClick();
                    }}
                >
                {btns[key].text || ''}
                </Button>
            </div>
            ))
        }
    </div>
)
