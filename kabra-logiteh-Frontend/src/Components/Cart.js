import React, { Component } from 'react'
import {Modal,Spin,Form,Input,Typography, InputNumber ,Radio} from "antd";
import {LoadingOutlined} from '@ant-design/icons';
import { List, Avatar } from 'antd';
import { connect } from 'react-redux';
import { getCart, updateCart } from '../redux/actions/dataActions';


const antIcon = <LoadingOutlined style={{ fontSize: 24 , color:"black" }} spin />;

export class Cart extends Component {
    constructor(props){
        super(props);
        this.state ={
            loading:false,
            total:this.props.CART,
        }
    }

    async componentDidMount(){
    this.props.GETDATA();
    }
  
    HandleQuntity = (type,count,productID,index) =>{
        if(type=="+"){
            if(count>=0){
                this.props.UPDATECART(productID,count+1);
                this.props.GETDATA();
            }
        }
        else{
            if(count>=1){
                this.props.UPDATECART(productID,count-1);
                this.props.GETDATA();
               
            }
        }
      
    }
    getTotalPrice=(items)=>{ 
        let total=0;
        items.map((item)=>{
            total+=item.productID.price * item.count
        })
        return total;

     
    }
    render() {
      
        return (
            <Modal
            title="Cart"
            centered
            visible={this.props.show}
            onOk={() => this.props.change()}
            onCancel={() => this.props.change()}>
            <Spin indicator={antIcon} size="large" spinning={this.state.loading}>
             <div style={{minHeight:"70vh"}}>
            <List
                itemLayout="horizontal"
                dataSource={this.props.CART}
                renderItem={(item , index) => (
                <List.Item>
                    <List.Item.Meta
                    avatar={<img src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" width="50"  height="50" />}
                    title={<a href="https://ant.design">{item.productID.pname}</a>}
                    description={
                        <div>
                        <div>
                            <b>Price: {item.productID.price}$</b>&nbsp; &nbsp;
                        <span>
                        <Radio.Group defaultValue="medium"  buttonStyle="solid" size={"small"}>
                                <Radio.Button  onClick={() => this.HandleQuntity("+",item.count,item.productID._id,index)} value="increase">+</Radio.Button>
                        </Radio.Group>
                        &nbsp; <Input
                                    value={item.count}
                                    // onChange={(e)=>alert(e.target.value)}
                                    size={"small"}
                                    style={{width:"60px ",paddingLeft:"10px"}}
                                    />&nbsp; 

                        <Radio.Group defaultValue="medium"  buttonStyle="solid" size={"small"}>
                        <Radio.Button onClick={() => this.HandleQuntity("-",item.count,item.productID._id,index)} value="decrease">-</Radio.Button>
                        </Radio.Group>
                        </span>
                        </div>

                        </div>
                    }
                    />
                    </List.Item>
                )}
            />
            <div>
                {!this.props.CART.length==0 && 
                <b>Total: {this.getTotalPrice(this.props.CART)}$</b>
                }
            </div>

            </div>
            </Spin>
        </Modal>
        )
    }
}
const mapStateToProps = state => {
    return {
        CART: state.data.cart,
    }
   
}
const mapDispatchToProps = dispatch => {
    return { GETDATA: () => dispatch(getCart()) , UPDATECART: (id,count) => dispatch(updateCart(id,count))}
}
export default connect(mapStateToProps, mapDispatchToProps)(Cart)

