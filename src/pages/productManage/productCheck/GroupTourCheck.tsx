import React, { useState, useEffect, useRef } from 'react';
import { Col, Select, message, Row, Input, Button, Upload, Modal, Icon, InputNumber } from 'antd';

import PageHeaderWrapper from '@/components/PageHeaderWrapper/actionPageHeader';
import renderHeaderBtns from '@/components/PageHeaderWrapper/headerBtns';
import { IActionPageProps } from '@/viewconfig/ActionConfig';
import { useActionPage, useActionBtn } from '@/utils/ActionPageHooks';

import styles from './GroupTourCheck.less';
import { getEnum, IEnumCfg, searchChange } from '@/utils/enum';
import FastSelect from '@/components/FastSelect';
import { upload, submit } from '@/utils/req';
import { prePage, nextPage, loadPdf } from '@/utils/pdf';
import { router } from 'umi';
import { ApproveModal } from '@/components/ApproveBtns';

const { Option } = Select;

const selectCfg = {
  pd_direction: { 'text': '出境/国内', 'type': 'PdDirection' },
  primary_nav: { 'text': '一级导航', 'type': 'PrimaryNav', 'cascade': 'pd_direction' },
  secondary_nav: { 'text': '二级导航', 'type': 'SecondaryNav', 'cascade': 'primary_nav' }
};

const Page: React.FC<IActionPageProps> = ({ route, location }) => {
  const { viewConfig } = route;
  const { state: ref } = location;

  const initData: {
    产品信息: object,
    产品图片: string[],
    游玩主题: any[],
    自建主题: any[],
    pdfUrl: string
  } = {
    '产品信息': { days: 1, nights: 1 },
    '产品图片': [],
    '游玩主题': [],
    '自建主题': [],
    pdfUrl: ''
  }

  let canvas = useRef<HTMLCanvasElement>(null);

  const [pdfPageNum, setPdfPageNum] = useState(1);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [pdfUploading, setPdfUploading] = useState(false);

  const { data, setData, load, onCancel, cfg } = useActionPage<typeof initData>(viewConfig, initData, ref);


  useEffect(() => {
    load().then((loadedData: typeof initData) => {
      setData(loadedData);
      if (loadedData.pdfUrl) {
        setPdfLoading(true);
      }
    });
  }, [])

  useEffect(() => {
    if (pdfLoading && canvas) {
      //load pdf 
      loadPdf(
        data.pdfUrl,
        canvas.current,
        1000,
        () => { setPdfLoading(false) }
      )
    }
  }, [pdfLoading, canvas])

  const onOk = () => {
    if (data['产品信息']['days'] && data['产品信息']['nights']) {
      if (parseInt(data['产品信息']['days']) < parseInt(data['产品信息']['nights'])) {
        message.error('天数必须大于晚数!');
        return;
      }
    }
    if (cfg.submit) {
      submit(cfg.submit.url, data, cfg.submit.data).then((r: any) => {
        message.success(r.message);
        router.goBack();
      })
    }
  };

  const actionMap = {
    提交: onOk,
    关闭: onCancel,
  }

  const { btns } = useActionBtn(viewConfig, actionMap);

  // 上传按钮
  const uploadButton = (
    <div>
      <Icon type={pdfUploading ? 'loading' : 'plus'} />
      <div className="ant-upload-text">Upload</div>
    </div>
  );

  // 改变产品信息
  const changeProInfo = (field: string, val: any) => {
    let rst = { ...data };
    rst['产品信息'][field] = val;
    rst['产品信息'] = searchChange(selectCfg, field, rst['产品信息']);
    if (field === 'pd_direction') {
      rst['途径城市'] = [];
    }
    setData(rst);
  }

  // 渲染下拉框
  const renderEnumSelect = (cfg: IEnumCfg, field: string, data: object) => {
    const Enum = getEnum(cfg, data) || {};

    return (
      <Select
        onChange={(value: any) => { changeProInfo(field, value) }}
        showSearch
        optionFilterProp='children'
        className={styles.cellSelect}
        maxTagCount={10}
        maxTagTextLength={8}
        placeholder={cfg.text || ''}
        value={data[field]}
        key={field}
        disabled
      >
        {
          Object.keys(Enum).map(key =>
            <Option key={key} value={key}>{Enum[key]}</Option>
          )
        }
      </Select>
    );
  }
  // 渲染产品标签
  const renderProductTag = () => {
    return (
      <Col>
        {
          Object.keys(selectCfg).map((field) =>
            renderEnumSelect(selectCfg[field], field, data['产品信息'])
          )
        }
      </Col>
    );
  };

  // 途径城市
  const changeProCity = (value: any) => {
    const rst = { ...data };
    rst['途径城市'] = [...value];
    setData(rst);
  }

  const changeProTheme = (value: any) => {
    const rst = { ...data };
    rst['游玩主题'] = [...value];
    setData(rst);
  }

  const renderProductTheme = () => {
    const Enum = getEnum('PdTheme');

    return (
      <Col>
        <FastSelect
          disabled
          onChange={(value: any) => { changeProTheme(value) }}
          showSearch
          style={{ width: '100%' }}
          optionFilterProp='children'
          mode='multiple'
          placeholder='热卖标签'
          value={data['游玩主题']}
          options={Enum}
          type='PdTheme'
        />
      </Col>
    )
  }

  const changeZjTheme = (value: any) => {
    const rst = { ...data };
    rst['自建主题'] = [...value];
    setData(rst);
  }

  const renderZjTheme = () => {
    const Enum = {};
    if (data['自建主题']) {
      data['自建主题'].forEach((item: any) => {
        Enum[item] = item;
      })
    }

    return (
      <Col>
        <FastSelect
          disabled
          onChange={(value: any) => { changeZjTheme(value) }}
          showSearch
          style={{ width: '100%' }}
          optionFilterProp='children'
          mode='multiple'
          placeholder='如果上述热卖标签没有适用您产品的，可在这里自建标签！'
          value={data['自建主题']}
          options={Enum}
          type='自建主题'
        />
      </Col>
    )
  }

  // pdf
  const beforeUpload = (file: File) => {
    let isSuffixType = file.type === 'application/pdf' || file.type === 'application/msword' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    if (!isSuffixType) {
      if (file.name) {
        const suffix = file.name.split('.').pop() || 'errorType';
        if (['pdf', 'doc', 'docx'].indexOf(suffix) !== -1) {
          isSuffixType = true;
        } else {
          message.error('格式不对, 请上传PDF文档或WORD文档!');
        }
      } else {
        message.error('格式不对, 请上传PDF文档或WORD文档!');
      }
    }
    const isLt2M = file.size / 1024 / 1024 < 20;
    if (!isLt2M) {
      message.error('文件最大不能超过20MB!');
    }
    return isSuffixType && isLt2M;
  }

  const handleChange = (info: any) => {
    if (info.file.status === 'uploading') {
      return;
    }
    setPdfUploading(false);
    if (info.file.status === 'done') {
      const rst = { ...data };
      rst.pdfUrl = info.file.pdfUrl;
      setData(rst);
      setPdfLoading(true);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} 文件上传失败.`);
    }
  };

  const handlePdfUpload = (prop: { file: File }) => {
    setPdfUploading(true);
    const formData = new FormData();
    const { file } = prop;
    formData.append('file', file);
    upload(formData, 'productPdf').then(res => {
      if (res.success && res.save_path) {
        const fileinfo = { file: { status: 'done', pdfUrl: res.save_path } }
        handleChange(fileinfo);
      } else {
        handleChange({ file: { status: 'error', name: file.name } });
      }
    }, () => {
      handleChange({ file: { status: 'error', name: file.name } });
    })
  };

  const minusPage = () => {
    const pages = prePage();
    setPdfPageNum(pages);
  }

  const addPage = () => {
    const pages = nextPage();
    setPdfPageNum(pages);
  }

  const renderPdf = () => {
    return (
      <Col span={20} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <canvas ref={canvas} style={{ width: '80%' }} />
      </Col>
    );
  }

  const passOk = (comment: string) => {
    if (cfg.submit) {
      submit(cfg.submit.url, {
        flow_id: data['产品信息']['flow_id']
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
        flow_id: data['产品信息']['flow_id']
        , opinion: 2, comment: comment
      }, cfg.submit.data).then((r: any) => {
        message.success(r.message);
        router.goBack();
      })
    }
  }

  return <PageHeaderWrapper
    title={cfg.title || ''}
    extra={renderHeaderBtns(btns)}
  >
    <Row>
      <Col className={styles.add}>
        <Col className={[styles.addMod, 'clear'].join(' ')}>
          <Col className={styles.title}>
            <Col className={styles.titleL} xs={24} sm={24} md={10} lg={10}>
              <Col className={styles.text}>产品图片</Col>
              <Col className={styles.backgroundtext}>(上传一张即可,1M以内,尺寸建议比例16:9)</Col>
            </Col>
            <Col className={styles.titleR}>
              <Col className={styles.text}>产品信息</Col>
            </Col>
          </Col>
          {/* 产品图片 */}
          <Col xs={24} sm={24} md={10} lg={10} className={styles.imgWrapper}>
            <Col className={styles.imgBox}>
              <img src={data['产品图片'][0]} alt="图片" className={styles.picUpload} />
            </Col>
          </Col>
          {/* 产品信息 */}
          <Col
            className={styles.content}
            xs={24}
            sm={24}
            md={14}
            lg={14}
            style={{ paddingLeft: '24px' }}
          >
            <Col className={[styles.cell, 'clear'].join(' ')}>
              <Col className={styles.cellLabel} xs={24} sm={3} md={3} lg={3}>
                产品名称
                  </Col>

              <Col className={styles.cellInput} xs={24} sm={20} md={20} lg={20}>
                <Input
                  placeholder="请输入产品名称"
                  value={data['产品信息']['pd_name'] || ''}
                  disabled
                />
              </Col>
            </Col>
            {/* 导航标签 */}
            <Col className={[styles.cell, 'clear'].join(' ')}>
              <Col className={styles.cellLabel} xs={24} sm={3} md={3} lg={3}>
                导航标签
              </Col>
              <Col className={styles.cellInput} xs={24} sm={20} md={20} lg={20}>
                {renderProductTag()}
              </Col>
            </Col>
            {/* 途径地区 */}
            <Col className={[styles.cell, 'clear'].join(' ')}>
              <Col className={styles.cellLabel} xs={24} sm={3} md={3} lg={3}>
                途径地区
              </Col>
              <Col className={styles.cellInput} xs={24} sm={20} md={20} lg={20}>
                {data['产品信息'] && data['产品信息']['pd_direction'] && <FastSelect
                  disabled
                  onChange={(value) => { changeProCity(value) }}
                  showSearch
                  style={{ width: '100%' }}
                  optionFilterProp='children'
                  mode='multiple'
                  placeholder='出游方向选出境,只能选择国家,如果选国内,只能选省份'
                  value={data['途径城市']}
                  options={data['产品信息'] && data['产品信息']['pd_direction'] === '1' ? getEnum('Country') : getEnum('CNProvince')}
                  type={data['产品信息'] && data['产品信息']['pd_direction'] === '1' ? 'Country' : 'CNProvince'}
                />}
                {data['产品信息'] && !data['产品信息']['pd_direction'] && <FastSelect
                  disabled
                  onChange={(value) => { changeProCity(value) }}
                  showSearch
                  style={{ width: '100%' }}
                  optionFilterProp='children'
                  mode='multiple'
                  placeholder='出游方向选出境,只能选择国家,如果选国内,只能选省份'
                  value={data['途径城市']}
                  type=''
                  options={{}}
                />}
              </Col>
            </Col>
            {/* 往返城市 */}
            <Col className={[styles.cell, 'clear'].join(' ')}>
              <Col className={styles.cellLabel} xs={24} sm={3} md={3} lg={3}>
                出发城市
                  </Col>
              <Col className={styles.cellInput} xs={24} sm={8} md={8} lg={8}>
                <FastSelect
                  disabled
                  showSearch
                  value={data['产品信息']['dep_city_id'] || ''}
                  onChange={val => changeProInfo('dep_city_id', val)}
                  className={styles.cellSelect1}
                  maxTagCount={10}
                  maxTagTextLength={8}
                  options={getEnum('City')}
                  type='City'
                />
              </Col>
              <Col className={styles.cellLabel} xs={24} sm={3} md={3} lg={3}>
                返回城市
                  </Col>
              <Col className={styles.cellInput} xs={24} sm={8} md={8} lg={8}>
                <FastSelect
                  disabled
                  showSearch
                  value={data['产品信息']['back_city_id'] || ''}
                  onChange={val => changeProInfo('back_city_id', val)}
                  className={styles.cellSelect1}
                  maxTagCount={10}
                  maxTagTextLength={8}
                  options={getEnum('City')}
                  type='City'
                />
              </Col>
            </Col>
            {/* 天数晚数 */}
            <Col className={[styles.cell, 'clear'].join(' ')}>
              <Col className={styles.cellLabel} xs={24} sm={3} md={3} lg={3}>
                晚数
                  </Col>
              <Col className={styles.cellInput} xs={24} sm={8} md={8} lg={8}>
                <InputNumber
                  min={1}
                  max={999}
                  value={data['产品信息']['nights'] || 0}
                  onChange={val => changeProInfo('nights', val)}
                  style={{ width: '77%' }}
                  disabled
                />
                &nbsp; 晚
                  </Col>
              <Col className={styles.cellLabel} xs={24} sm={3} md={3} lg={3}>
                天数
                  </Col>
              <Col className={styles.cellInput} xs={24} sm={8} md={8} lg={8}>
                <InputNumber
                  min={1}
                  max={999}
                  value={data['产品信息']['days'] || 0}
                  onChange={val => changeProInfo('days', val)}
                  style={{ width: '77%' }}
                  disabled
                />
                &nbsp; 天
                  </Col>
            </Col>
            <Col className={[styles.cell, 'clear'].join(' ')}>
              <Col className={styles.cellLabel} xs={24} sm={3} md={3} lg={3}>
                自费情况
                  </Col>
              <Col className={styles.cellInput} xs={24} sm={8} md={8} lg={8}>
                <FastSelect
                  showSearch
                  value={data['产品信息']['own_expense'] || ''}
                  onChange={val => changeProInfo('own_expense', val)}
                  className={styles.cellSelect1}
                  maxTagCount={10}
                  maxTagTextLength={8}
                  options={getEnum('HaveNo')}
                  type='HaveNo'
                  disabled
                />
              </Col>
              <Col className={styles.cellLabel} xs={24} sm={3} md={3} lg={3}>
                购物情况
                  </Col>
              <Col className={styles.cellInput} xs={24} sm={8} md={8} lg={8}>
                <FastSelect
                  showSearch
                  value={data['产品信息']['shopping'] || ''}
                  onChange={val => changeProInfo('shopping', val)}
                  className={styles.cellSelect1}
                  maxTagCount={10}
                  maxTagTextLength={8}
                  options={getEnum('HaveNo')}
                  type='HaveNo'
                  disabled
                />
              </Col>
            </Col>
            {/* 游玩主题 */}
            <Col className={[styles.cell, 'clear'].join(' ')}>
              <Col className={styles.cellLabel} xs={24} sm={3} md={3} lg={3}>
                特色标签
                  </Col>
              <Col className={styles.cellInput} xs={24} sm={20} md={20} lg={20}>
                {
                  renderProductTheme()
                }
              </Col>
            </Col>
          </Col>
        </Col>

        {/* 自建标签 */}
        <Col className={styles.addMod}>
          <Col className={styles.title}>
            <Col className={styles.titleL}>
              <Col className={styles.text} style={{ margin: '2px' }}>自建标签</Col>
            </Col>
          </Col>
          <Col className={styles.content1}>
            {
              renderZjTheme()
            }
          </Col>
        </Col>

        {/* 产品特色 */}
        <Col className={styles.addMod}>
          <Col className={styles.title}>
            <Col className={styles.titleL}>
              <Col className={styles.text}>产品特色</Col>
              <Col className={styles.backgroundtext}>(请注意文字排版的整齐美观)</Col>
            </Col>
          </Col>
          <Col className={styles.content2}>
            <Input.TextArea
              className={styles.product}
              placeholder="请输入产品特色"
              autoSize={{ minRows: 4, maxRows: 8 }}
              onChange={e => changeProInfo('feature', e.target.value)}
              value={data['产品信息']['feature']}
              disabled
            />
          </Col>
        </Col>

        {/* 产品行程 */}
        <Col className={styles.addMod}>
          <Col className={styles.title}>
            <Col className={styles.titleL}>
              <Col className={styles.text}>产品行程</Col>
              <Col className={styles.backgroundtext}>(直接将您的行程文件上传,文件要小于8M,请注意去掉您自己公司的LOGO,以便门市下载后转发给客户)</Col>
            </Col>
          </Col>
          <Col className={styles.content}>
            <Col className={styles.scheduling}>
              <Col className={styles.schedulingContent}>
                <Col className={styles.backgroundBtn} span={2} onClick={() => minusPage()}>
                  <Button
                    shape="circle"
                    icon="left"
                    disabled={pdfPageNum <= 1}
                  />
                </Col>
                <Upload
                  disabled
                  name="avatar"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  onChange={handleChange}
                  customRequest={({ file }) => handlePdfUpload({ file })}
                  beforeUpload={beforeUpload}
                >
                  {data.pdfUrl ? renderPdf() : uploadButton}
                </Upload>
                <Col span={2} className={styles.backgroundBtn} onClick={() => addPage()}>
                  <Button shape="circle" icon="right" />
                </Col>
              </Col>
            </Col>
          </Col>

        </Col>
      </Col>
    </Row>
    <div className={styles.approve}>
      <ApproveModal history={data['审批记录'] || []} passOk={passOk} rejectOk={rejectOk} />
    </div>
  </PageHeaderWrapper>
}

export default Page;
