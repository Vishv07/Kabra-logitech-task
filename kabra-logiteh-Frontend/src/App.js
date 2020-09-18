import React from 'react';
import logo from './logo.svg';
import { ShoppingCartOutlined } from '@ant-design/icons';
import './App.css';
import 'antd/dist/antd.css';
import { Provider } from "react-redux"; 
import { NavLink,BrowserRouter } from "react-router-dom";
import store from "./redux/store";
import Product from './Components/Product';
import Cart from './Components/Cart';

class  App extends React.Component {

  constructor(props){
    super(props);
    this.state ={
      showCart:false,
    }
  }
  refresh = () =>{
    this.props.GETDATA(); 
  }
  change = () => {
    this.setState({
      showCart:!this.state.showCart
    })
  }
  render(){
  return (
    <Provider store={store}>

    <div >
     <div>
      <span style={{float:"right" , padding:"30px"}}>
      
        <ShoppingCartOutlined
          onClick={()=>this.setState({showCart:true})}
          style={{fontSize:"50px"}} />

          </span>
          <div style={{padding:"50px"}}>
            <h1> <span class="label label-default">Product List</span> </h1>
          </div>
          <Product />
          <Cart 
           show={this.state.showCart}
           change={this.change}
           refresh = {this.refresh}
          />
     </div>
    </div>
    </Provider>
  );
}
}
export default App;
