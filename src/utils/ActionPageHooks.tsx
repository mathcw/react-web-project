// 统一一下详情页的逻辑
// 统一了一下列表页的逻辑
import {useState} from 'react';
import { message } from 'antd';
import router from 'umi/router';

import { getActionConfig, btnClickEvent,getActionButton } from './utils';
import { read, submit } from './req';
import { IModBtn as IActionBtn } from '@/viewconfig/ModConfig';
import { log } from './core';


export function useActionPage<T extends object>(authority:string,initData:T,ref?:object){
    const [data, setData] = useState<T>(initData);
    const cfg = getActionConfig(authority); 
    const load = async () => {
        try {
            const rst:T = await new Promise<T>((resolve, reject) => {
                if(cfg.read){
                    read(cfg.read.url,{
                        action: authority
                    },{...ref},cfg.read.data).then(r => {
                        resolve(r.data);
                    }),(e:any)=>{
                        reject(e);
                    }
                }else{
                    resolve(data);
                }
            });
            return rst;
        } catch (e) {
            log(e);
            throw e;
        }
    }

    const onOk = () =>{
        if(cfg.submit){
            submit(cfg.submit.url, data,cfg.submit.data).then((r:any) => {
                message.success(r.message);
                router.goBack();
            })
        }
    }

    const onCancel = () => {
        router.goBack();
    }

    return {data,setData,load,onOk,onCancel,cfg};
}

export function useActionBtn(authority:string,actionMap?:object){
    const btns :IActionBtn[] = btnClickEvent(getActionButton(authority),actionMap);
    return {btns}
}