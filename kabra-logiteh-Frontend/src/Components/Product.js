import React, { Component } from 'react'
import pimage from "../product.jpg";
import "../css/Product.css"
import { connect } from 'react-redux';
import AddProductModal from './AddProductModal';
import {addItem, getProducts} from "../redux/actions/dataActions"
export class Product extends Component {
    constructor(props){
        super(props);
        this.state = {
          showModal: false,
        };
        }
        async componentDidMount() {
            this.props.GETDATA(); 
            
          }
          refresh = () =>{
            this.props.GETDATA(); 
          }
        change = () => {
            this.setState({
              showModal:!this.state.showModal
            })
          }
    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <center><button 
                        onClick={() => this.setState({showModal:true})}
                        className="btn btn-primary"><b>Add Products</b></button></center>
                        <br/>
                        {this.props.PRODUCTS.map( (data,index) => (
                        <div className="col-lg-3">
                            <div class="card" style={{width:"18rem"}}>
                                <img class="card-img-top" src={data.image} width="200" height="100" alt="Card image cap" />
                                    <div class="card-body">
                                        <div className="text-center" style={{paddingLeft:"10px"}}>
                                        <b className="product-name">{data.pname} </b>
                                            <p>
                                            {data.description}
                                              <br/>
                                               <b>Price : {data.price}$</b>
                                            </p> 
                                            <button className="btn btn-success"
                                            onClick={ () => this.props.ADDITEM(data._id,1)}
                                            >
                                                    <b>Add to Cart</b>
                                            </button>
                                        </div>                                                   
                                </div>
                            </div>
                        </div>
                        ))} 
                    </div>
                    <br/>
                </div>
                <AddProductModal 
                    show={this.state.showModal}
                    change={this.change}
                    refresh = {this.refresh}
                />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        PRODUCTS: state.data.products,
    }
   
}
const mapDispatchToProps = dispatch => {
    return { GETDATA: () => dispatch(getProducts()), ADDITEM: (id,count) => dispatch(addItem(id,count))}
}
export default connect(mapStateToProps, mapDispatchToProps)(Product)


