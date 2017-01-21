/**
 * Created by Administrator on 2016/9/7.
 */
import React, { Component } from 'react';
import {Row, Col, Upload, Button, message, Icon ,Input,Spin ,Table,Select,Pagination} from 'antd';
const Option = Select.Option;
import {sysGet} from './../webConfig/units'
import './../less/imports.less'
class Imports extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            xlsxName: 'excel 文件',
            successCount: 0,
            skipCount: 0,
            total: 0,
            failCount: 0,
            id: '',
            isLoading: false,
            page: {
                start: 0,
                count: 10,
                total: 0,
                current: 1,
                type: '',
                items: []
            }
        }
    }

    handChange(info) {
        if (info.file.status == 'uploading') {
            console.log(info.file, info.fileList);
            this.setState({
                isLoading: true,
                total: 0
            })
        }
        if (info.file.status === 'done') {
            let {response}  = info.file
            if (response.msg == 1) {
                let body = response.body
                let {id} = body
                this.setState({
                    id,
                    xlsxName: info.file.name
                })
                message.success(`${response.msgInfo}`);
                this.getImportStatus()
            } else {
                message.error(`${response.msgInfo}`);
                this.setState({
                    xlsxResult: response.msgInfo,
                    isLoading: false
                })
            }
        } else if (info.file.status === 'error') {
            this.setState({
                isLoading: false
            })
            message.error(`${info.file.name} 上传失败。`);
        }
    }

    getImportStatus() {
        let { id } =this.state
        sysGet('/ssl/xlsxInfo/' + id).then((result)=> {
            console.log(result)
            if (result.msg != 1) {
                this.setState({
                    isLoading: false
                })
                message.error('系统出错');
                return false
            }
            let body = result.body
            if (body.status != 'IMPORT_FINISH') {
                setTimeout(()=> {
                    this.getImportStatus()
                }, 5000)
            } else {
                if (result.msg != 1) {
                    this.setState({
                        isLoading: false
                    })
                    message.error('系统出错');
                    return false
                }
                let body = result.body
                let {successCount,skipCount,total,failCount,id} = body
                let {page} =this.state
                page.type = ''
                this.setState({
                    successCount,
                    id,
                    skipCount,
                    total,
                    failCount,
                    page,
                    isLoading: false
                })
                this.getResultById()
            }
        })
    }

    showResult(result) {
        if (!result) {
            return '';
        }
        return (
            <div className='xlsx-result'>
                <span>导入结果:</span>
                <span>总资源</span>
                <span className='number'>{this.state.total}</span>
                <span>成功上传</span>
                <span className='number'>{this.state.successCount}</span>
                <span>失败上传</span>
                <span className='number'>{this.state.failCount}</span>
                <span>跳过</span>
                <span className='number'>{this.state.skipCount}</span>
                <span>失败行...</span>
            </div>
        )
    }

    showLoad(loading) {
        if (!loading) {
            return ''
        }
        return (
            <div className='sys-loading'>
                <div className='load-body'>
                    <Spin />

                    <p>正在导入...</p>
                </div>
            </div>
        )
    }

    handleChange(value) {
        console.log(value)
        let {page} =this.state
        page.type = value
        page.start = 0
        page.current = 1
        this.setState({
            page
        })
        this.getResultById()
    }

    onChange(value) {

        let {page} =this.state
        if (value == page.current) {
            return false
        }
        page.start = (value - 1) * page.count
        page.current = value
        console.log(value)
        this.setState({
            page
        })
        this.getResultById()
    }

    showTable(result) {
        let columns = [{
            title: '联系人',
            dataIndex: 'contactName',
            key: 'contactName',
            width: '10%'
        }, {
            title: '公司名称',
            dataIndex: 'briefName',
            key: 'briefName',
            width: '12%'
        }, {
            title: '职位名称',
            dataIndex: 'jobName',
            key: 'jobName',
            width: '12%'
        }, {
            title: '手机',
            dataIndex: 'mobile',
            key: 'mobile',
            width: '20%'
        }, {
            title: '行号',
            dataIndex: 'fileLine',
            key: 'fileLine',
            width: '6%'
        }, {
            title: '创建时间',
            dataIndex: 'createdTime',
            key: 'createdTime',
            width: '20%'
        }, {
            title: '错误原因',
            dataIndex: 'error',
            key: 'error',
            width: '20%'
        }];
        if (!result) {
            return '';
        }
        return (
            <div>
                <Select showSearch
                        style={{ width: 200 }}
                        placeholder="请选择类型"
                        onChange={(value)=>this.handleChange(value)}>
                    <Option value="">全部</Option>
                    <Option value="success">导入成功</Option>
                    <Option value="error">导入失败</Option>
                    <Option value="skip">导入跳过</Option>
                </Select>
                <Table columns={columns} dataSource={this.state.page.items} pagination={false}
                       style={{marginTop:'20px'}}></Table>
                <Pagination current={this.state.page.current} onChange={(value)=>this.onChange(value)}
                            total={this.state.page.total}/>

            </div>

        )
    }

    getResultById() {
        let {id} =this.state
        let {start,count,type} =this.state.page
        let param = {
            batchId: id,
            start,
            count,
            type
        }
        sysGet('/ssl/jobsLog', param).then((data)=> {
            console.log(data)
            if (data.msg != 1) {
                message.error('系统出错');
                return false
            }
            let body = data.body
            let {page} =this.state
            page.total = body.total
            body.items.map(obj=> {
                let date = new Date(obj.createdTime).toLocaleString()
                obj.createdTime = date
            })
            page.items = body.items
            this.setState({
                page
            })
        })
    }

    render() {
        const props = {
            name: 'excel',
            action: '/ssl/upload/xls',
            showUploadList: false,
            headers: {
                authorization: 'authorization-text',
            },
            onChange: (info)=>this.handChange(info)
        };
        return (
            <div>
                <p className="title">
                    获取资源-外部导入
                </p>
                <Row style={{marginTop:'20px'}}>
                    <Col span={3}>
                        <div style={{textAlign:'right',lineHeight:'24px',padding:'4px 7px',fontSize:'16px'}}>外部导入</div>
                    </Col>
                    <Col span={10}>
                        <Input value={this.state.xlsxName} defaultValue='excel 文件'/>
                    </Col>
                    <Col span={5} push={1}>
                        <Upload {...props}>
                            <Button type="primary">
                                <Icon type="upload"/> 点击上传excel
                            </Button>
                        </Upload>
                    </Col>
                </Row>

                <div>
                    {
                        this.showResult(this.state.total)
                    }
                </div>
                <div>
                    {
                        this.showTable(this.state.total)
                    }

                </div>
                <div>
                    {
                        this.showLoad(this.state.isLoading)
                    }
                </div>

            </div>
        );
    }
}
export default Imports




