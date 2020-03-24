import React, { useState, useEffect } from 'react';
import { IModPageProps } from '@/viewconfig/ModConfig';

import { Row, Col, Avatar, Button, Divider, Spin, Modal, Input, Upload, message } from 'antd';
import Link from 'umi/link';
import { rootAction, useRootState } from '@/rootState';
import { ActionType } from '@/rootState/rootAction';

import styles from './Admin.less';
import { read, upload, submit } from '@/utils/req';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
const {Password} = Input;
const {Dragger} = Upload;
const defaultProfile = require('@/assets/profile.png');

function beforeUpload(file:any) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('请上传 JPG/PNG 图片!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('图片不能超过 2MB!');
  }
  return isJpgOrPng && isLt2M;
}

interface pageData{
    msg:any[],
    msg_flow:any[],
    announce:any[],
    account:{
        type: string
        assoc_id: string
        name: string
        mobile: string
        superior_department_name: string
        superior_company_name: string
        photo: string
    },
    recently_data:{
        pd_nums: string
        supp_nums: string
        pd_month_nums: string
        supp_month_nums: string
        pd_week_nums: string
        supp_week_nums: string
    },
    profileModal:any,
    photoLoading:any,
    profile:string,
    photo:any,
    passWordModal:any,
    passWord:string
}

const page:React.FC<IModPageProps> = ({ route }) => {
  const [data, setData] = useState<pageData>({
    msg:[],
    msg_flow:[],
    announce:[],
    account:{
        type:'',
        assoc_id:'',
        name:'',
        mobile:'',
        superior_department_name:'',
        superior_company_name:'',
        photo:''
    },
    recently_data:{
        pd_nums: '',
        supp_nums: '',
        pd_month_nums: '',
        supp_month_nums: '',
        pd_week_nums: '',
        supp_week_nums: ''
    },
    profileModal:false,
    photoLoading:false,
    profile:'',
    photo:defaultProfile,
    passWordModal:false,
    passWord:'',
  });
  useEffect(() => {
      read('/Home/Admin/read_home', { mod: '管理员首页' }).then(res => {
          setData({ ...res.data });
      })
  }, []);

  const { loading } = useRootState();

  const handleChange = (info:any) => {
    if (info.file.status === 'uploading') {
      data.photoLoading=true;
      setData({ ...data });
      return;
    }
    if (info.file.status === 'done') {
      data.photoLoading=false;
      data.profile=info.file.url;
      setData({ ...data });
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} 文件上传失败.`);
    }
  };

  const handleCustomRequest = (r:any) => {
    const uploadType='photo';
    const formData = new FormData();
    formData.append('file', r.file);
    upload(formData,uploadType).then(res=>{
      if(res.success&&res.save_path){
        const fileinfo = {file:{status:'done',url:res.save_path}}
        handleChange(fileinfo);
      }else{
        handleChange({file:{status:'error',name:r.file.name}});
      }
    },()=>{
      handleChange({file:{status:'error',name:r.file.name}});
    })
  };
  const modifyProfile = () => {
    data.profileModal=true;
    setData({ ...data });
  }

  const modalProfileOk= () => {
    submit('/org/Account/set_emp_profile_photo',{'profile':data.profile}).then((r)=>{
      data.profileModal=false;
      setData({ ...data });
      message.success(r.message);
    })
  }

  const modalProfileCancel= () => {
    data.profileModal=false;
    data.profile='';
    setData({ ...data });
  }

  const uploadButton = (
    <div>
      <p className="ant-upload-drag-icon">
        {
          data.photoLoading && <LoadingOutlined />
        }
        {
          !data.photoLoading && <PlusOutlined />
        }
      </p>
      <p className="ant-upload-text">点击或者拖拽到本区域进行上传</p>
    </div>
  );

  const modifyPassWord= () => {
    data.passWordModal=true;
    setData({ ...data });
  }

  const modalOk= () => {
    submit('/org/Account/set_password',{'passWord':data.passWord}).then((r)=>{
      data.passWordModal=false;
      setData({ ...data });
      message.success(r.message);
    })
  }

  const modalCancel= () => {
    data.passWordModal=false;
    data.passWord='';
    setData({ ...data });
  }

  const changePassWord= (passWord:any) => {
    data.passWord=passWord;
    setData({ ...data });
  }

  const logout= () => {
    rootAction(ActionType.LAYOUT);
  }

  return <React.Fragment>
        <div className={[loading ? '' : 'hide', 'Spin-box'].join(' ')}>
          <Spin tip="Loading..." />
        </div>
        <Row className={styles.TopContent}> 
          {/* 个人信息 */}
            <Col xl={10} lg={10} md={24} sm={24} xs={24}  className={styles.infos}>
              <Row className={styles.block}>
                <Row className={styles['mod-title']}>
                  <Col className="mod-text">个人信息</Col>
                </Row>
                <Divider style={{ margin: 0 }} />
                <Row className={styles.content}>
                  <Col span={8} style={{ textAlign: 'center' }}>
                    <Col> 
                      <Avatar 
                      src={data.account.photo || 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'} 
                      size={64}/>
                    </Col>
                <Col className={styles['left-text']}>{data.account.name}</Col>
                  </Col>
                  <Col span={16} className={styles['content-right']}>
                      <Col className={styles.title}>中国旅游B2B数据交互服务中心</Col>
                      <Col className={styles.brand}>{data.account.name}--{data.account.mobile}</Col>
                      <Col className={styles.brand} style={{display: 'flex', justifyContent: 'space-around', padding: 0, marginTop: '12px'}}>
                        <Button size="small" style={{fontSize: '12px', padding: '0 4px'}} onClick={modifyProfile}>修改头像</Button>
                        <Button size="small" style={{fontSize: '12px', padding: '0 4px'}} onClick={modifyPassWord}>修改密码</Button>
                        <Button size="small" style={{fontSize: '12px', padding: '0 4px'}} onClick={logout}>退出登录</Button>
                      </Col>
                    </Col>
                </Row>
              </Row>
            </Col>
            {/* 任务审批 */}
            <Col xl={14} lg={14} md={24} sm={24} xs={24}  className={styles.infos}>
              <Row className={styles.block}>
                  <Col className={styles['mod-title']}>
                    <Col span={22} className="mod-text">任务审批</Col>
                    <Col span={2} className="mod-more">
                      <Link to="/office/msgflow/list" className={styles['text-right']}>
                        更多>
                      </Link>
                    </Col>
                  </Col>
                  <Divider style={{ margin: 0 }} />
                  <Col className={`${styles.content} ${styles.contentc}`}>
                    {data.msg_flow.map((item, index) => (
                      <Row>
                        <Col span={8} className={styles['times']}>
                          {item.create_at}
                        </Col>
                        <Col span={16} className={['text-overflow'].join(' ')}>
                          {item.title}
                        </Col>
                      </Row>
                    ))}
                  </Col>
                </Row>
            </Col>
        </Row>

        <Row className={styles.TopContent}> 
          {/* 平台公告 */}
          <Col xl={14} lg={14} md={24} sm={24} xs={24}  className={styles.infos}>
              <Row className={styles.block}>
                  <Col className={styles['mod-title']}>
                    <Col span={22} className="mod-text">平台公告</Col>
                    <Col span={2} className="mod-more">
                      <Link to="/office/announcement/list" className={styles['text-right']}>
                        更多>
                      </Link>
                    </Col>
                  </Col>
                  <Divider style={{ margin: 0 }} />
                  <Col className={`${styles.content} ${styles.contentc}`}>
                    {data.announce.map((item, index) => (
                      <Row>
                        <Col span={8} className={styles['times']}>
                          {item.create_at}
                        </Col>
                        <Col span={16} className={['text-overflow'].join(' ')}>
                          {item.title}
                        </Col>
                      </Row>
                    ))}
                  </Col>
                </Row>
            </Col>
          {/* 最近数据 */}  
          <Col xl={10} lg={10} md={24} sm={24} xs={24}  className={`${styles.infos} ${styles.NoticeAndActivity}`}>
            <Row className={styles.block}>
              <Col className={styles['mod-title']}>
                <Col className="mod-text">最近数据</Col>
              </Col>
              <Divider style={{ margin: 0 }} />
              <Col className={`${styles.content} ${styles.contentc}`} style={{ padding: '0' }}>
              <Col span={8} className={styles.c2item}>
                <Col className={[styles.c2item1, styles.center].join(' ')}>
                  <div>平台全部产品</div>
                  <span>{data.recently_data.pd_nums}</span>
                </Col>
              </Col>
              <Col span={8} className={styles.c2item}>
                <Col className={[styles.c2item2, styles.center].join(' ')}>
                  <div>本月新增产品</div>
                  <span>{data.recently_data.pd_month_nums}</span>
                </Col>
              </Col>
              <Col span={8} className={styles.c2item}>
                <Col className={[styles.c2item3, styles.center].join(' ')}>
                  <div>本周新增产品</div>
                  <span>{data.recently_data.pd_week_nums}</span>
                </Col>
              </Col>
              <Col span={8} className={styles.c2item}>
                <Col className={[styles.c2item4, styles.center].join(' ')}>
                  <div>平台全部商家</div>
                  <span>{data.recently_data.supp_nums}</span>
                </Col>
              </Col>
              <Col span={8} className={styles.c2item}>
                <Col className={[styles.c2item4, styles.center].join(' ')}>
                  <div>本月新增商家</div>
                  <span>{data.recently_data.supp_month_nums}</span>
                </Col>
              </Col>
              <Col span={8} className={styles.c2item}>
                <Col className={[styles.c2item4, styles.center].join(' ')}>
                  <div>本周新增商家</div>
                  <span>{data.recently_data.supp_week_nums}</span>
                </Col>
              </Col>
            </Col>
            </Row>
          </Col>             
        </Row>
        <Row className={styles.TopContent}> 
          {/* 消息通知 */}
          <Col xl={14} lg={14} md={24} sm={24} xs={24}  className={styles.infos}>
              <Row className={styles.block}>
                  <Col className={styles['mod-title']}>
                    <Col span={22} className="mod-text">平台公告</Col>
                    <Col span={2} className="mod-more">
                      <Link to="/office/msg/list" className={styles['text-right']}>
                        更多>
                      </Link>
                    </Col>
                  </Col>
                  <Divider style={{ margin: 0 }} />
                  <Col className={`${styles.content} ${styles.contentc}`}>
                    {data.msg.map((item, index) => (
                      <Row>
                        <Col span={8} className={styles['times']}>
                          {item.create_at}
                        </Col>
                        <Col span={16} className={['text-overflow'].join(' ')}>
                          {item.title}
                        </Col>
                      </Row>
                    ))}
                  </Col>
                </Row>
            </Col>
        </Row>

        <Modal
          title="修改密码"
          visible={data.passWordModal}
          onOk={modalOk}
          onCancel={modalCancel}
        >
          <Password
            placeholder="请输入密码"
            onChange={e => changePassWord(e.target.value)}
          />
        </Modal>
        <Modal
          title="修改头像"
          visible={data.profileModal}
          onOk={modalProfileOk}
          onCancel={modalProfileCancel}
        >
          <Dragger
            name="photo"
            multiple={false}
            showUploadList={false}
            beforeUpload={beforeUpload}
            onChange={info => handleChange(info)}
            customRequest={({ file })=>handleCustomRequest({ file })}
          >
            {data.profile ? <img src={data.profile} alt="图片" className={styles.upload} /> : uploadButton}
          </Dragger>
        </Modal>
    </React.Fragment>
}

export default page