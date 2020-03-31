import React from 'react';
import { useRootState } from '@/rootState';
import AppConst from '@/utils/AppConst';
import { router } from 'umi';

const Welcome: React.FC = () => {
  const {user} = useRootState();
  if(user.type === AppConst.USER_EMP){
    router.replace('/home/admin');
  }else if(user.type === AppConst.USER_SUP){
    router.replace('/home/supplier');
  }else{
    router.replace('/user/login');
  }

  return null
}

export default Welcome;
