import React, { useState, useEffect, useRef } from 'react';
import { Col, Select, Row, Input, Button, Upload, InputNumber, message } from 'antd';

import PageHeaderWrapper from '@/components/PageHeaderWrapper/actionPageHeader';
import renderHeaderBtns from '@/components/PageHeaderWrapper/headerBtns';
import { IActionPageProps } from '@/viewconfig/ActionConfig';
import { useActionPage, useActionBtn } from '@/utils/ActionPageHooks';

import styles from './GroupTourCheck.less';
import { getEnum, IEnumCfg } from '@/utils/enum';
import FastSelect from '@/components/FastSelect';
import { prePage, nextPage, loadPdf } from '@/utils/pdf';
import { ApproveModal } from '@/components/ApproveBtns';
import { submit } from '@/utils/req';
import { router } from 'umi';

const { Option } = Select;
const { Dragger } = Upload;

const selectCfg = {
  pd_direction: { 'text': '出境/国内', 'type': 'PdDirection' },
  primary_nav: { 'text': '一级导航', 'type': 'PrimaryNav', 'cascade': 'pd_direction' },
  secondary_nav: { 'text': '二级导航', 'type': 'SecondaryNav', 'cascade': 'primary_nav' }
};

interface IUpdateImg {
  type: string,
  photo?: string,
  update?: (url: string) => void
}
const UploadImg = (props: IUpdateImg) => {
  const { type, photo, update } = props;

  const uploadButton = (
    <div>
      <p className="ant-upload-text">未上传图片</p>
    </div>
  );

  return (
    <React.Fragment>
      <Dragger
        name="photo"
        multiple={false}
        showUploadList={false}
        className='upload-dragger'
        disabled
      >
        {photo ? <img src={photo} alt="图片" className={styles.picUpload} /> : uploadButton}
      </Dragger>
    </React.Fragment>
  );
}

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

  const actionMap = {
    关闭: onCancel,
  }

  const { btns } = useActionBtn(viewConfig, actionMap);

  // 图片上传cb
  const handlePicUpload = (imageUrl: string) => {
    const rst = { ...data };
    rst['产品图片'][0] = imageUrl;
    setData(rst);
  }

  // 渲染下拉框
  const renderEnumSelect = (cfg: IEnumCfg, field: string, data: object) => {
    const Enum = getEnum(cfg, data) || {};

    return (
      <Select
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

  const renderProductTheme = () => {
    const Enum = getEnum('PdTheme');

    return (
      <Col>
        <FastSelect
          showSearch
          style={{ width: '100%' }}
          optionFilterProp='children'
          mode='multiple'
          placeholder='热卖标签'
          value={data['游玩主题']}
          options={Enum}
          type='PdTheme'
          disabled
        />
      </Col>
    )
  }

  const renderZjTheme = () => {
    const Enum = {};
    data['自建主题'].forEach((item: any) => {
      Enum[item] = item;
    })

    return (
      <Col>
        <FastSelect
          showSearch
          style={{ width: '100%' }}
          optionFilterProp='children'
          mode='multiple'
          placeholder='如果上述热卖标签没有适用您产品的，可在这里自建标签！'
          value={data['自建主题']}
          options={Enum}
          type='自建主题'
          disabled
        />
      </Col>
    )
  }

  // pdf
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
            </Col>
            <Col className={styles.titleR}>
              <Col className={styles.text}>产品信息</Col>
            </Col>
          </Col>
          {/* 产品图片 */}
          <Col xs={24} sm={24} md={10} lg={10} className={styles.imgWrapper}>
            <Col className={styles.imgBox}>
              <UploadImg photo={data['产品图片'][0]} type='productPic' update={handlePicUpload} />
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
                  showSearch
                  style={{ width: '100%' }}
                  optionFilterProp='children'
                  mode='multiple'
                  placeholder='出游方向选出境,只能选择国家,如果选国内,只能选省份'
                  value={data['途径城市']}
                  options={data['产品信息'] && data['产品信息']['pd_direction'] === '1' ? getEnum('Country') : getEnum('CNProvince')}
                  type={data['产品信息'] && data['产品信息']['pd_direction'] === '1' ? 'Country' : 'CNProvince'}
                  disabled
                />}
                {data['产品信息'] && !data['产品信息']['pd_direction'] && <FastSelect
                  showSearch
                  style={{ width: '100%' }}
                  optionFilterProp='children'
                  mode='multiple'
                  placeholder='出游方向选出境,只能选择国家,如果选国内,只能选省份'
                  value={data['途径城市']}
                  type=''
                  options={{}}
                  disabled
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
                  showSearch
                  value={data['产品信息']['dep_city_id'] || ''}
                  className={styles.cellSelect1}
                  maxTagCount={10}
                  maxTagTextLength={8}
                  options={getEnum('City')}
                  type='City'
                  disabled
                />
              </Col>
              <Col className={styles.cellLabel} xs={24} sm={3} md={3} lg={3}>
                返回城市
                  </Col>
              <Col className={styles.cellInput} xs={24} sm={8} md={8} lg={8}>
                <FastSelect
                  showSearch
                  value={data['产品信息']['back_city_id'] || ''}
                  className={styles.cellSelect1}
                  maxTagCount={10}
                  maxTagTextLength={8}
                  options={getEnum('City')}
                  type='City'
                  disabled
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
            </Col>
          </Col>
          <Col className={styles.content2}>
            <Input.TextArea
              className={styles.product}
              placeholder="请输入产品特色"
              autoSize={{ minRows: 4, maxRows: 8 }}
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
                  name="avatar"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  disabled
                >
                  {data.pdfUrl ? renderPdf() : <div>
                    <div className="ant-upload-text">未上传行程</div>
                  </div>}
                </Upload>
                <Col span={2} className={styles.backgroundBtn} onClick={() => addPage()}>
                  <Button shape="circle" icon="right" />
                </Col>
              </Col>
            </Col>
            <ApproveModal history={data['审批记录'] || []} passOk={passOk} rejectOk={rejectOk} />
          </Col>

        </Col>
      </Col>
    </Row>
  </PageHeaderWrapper>
}

export default Page;
