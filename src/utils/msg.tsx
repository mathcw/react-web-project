import React from 'react';
import { Button, notification,message } from 'antd';
import { ButtonProps } from 'antd/lib/button';

message.config({
  maxCount: 1,
});

interface Imsg{
    title:string,
    extra?:{
        action:string,
        assoc:any
    }
}

const openActionNotification = (msg:Imsg,buttonType:ButtonProps['type'],buttonSize:ButtonProps['size']) => {
  const key = `open${Date.now()}`;
  const click = () =>{
    // trigger(msg.extra.action,msg.extra.assoc,null);
    notification.close(key);
  }
  const btn = (
    <Button type={buttonType} size={buttonSize} onClick={() => click()}>
      查看
    </Button>
  );
  notification.open({
      message: msg.title,
      description:'',
      placement:'bottomLeft',
      btn,
      key
  });
};


const openNotification = (msg:Imsg) => {
  const key = `open${Date.now()}`;
  notification.open({
      message: msg.title,
      description:'',
      placement:'bottomLeft',
      key
  });
};


export default function msgPush(msg:Imsg,type?:ButtonProps['type'],size?:ButtonProps['size']){
    const buttonType = type||"primary";
    const buttonSize = size||"small";

    if(msg.extra && msg.extra.action && msg.extra.assoc){
      openActionNotification(msg,buttonType,buttonSize);
      return ;
    }
    openNotification(msg);
}

