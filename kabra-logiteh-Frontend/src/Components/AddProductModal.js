import React, { Component } from 'react'
import {Modal,Spin,Form,Input,Typography, InputNumber ,Button} from "antd";
import {LoadingOutlined} from '@ant-design/icons';
import axios from "../Services/axios"
import { storage } from "../firebase";
const antIcon = <LoadingOutlined style={{ fontSize: 24 , color:"black" }} spin />;

export class AddProductModal extends Component {
    constructor(props){
        super(props);
        this.state ={
            loading:false,
            Productname:undefined,
            price:undefined,
            ProductDesc:undefined,
            image: null,
            demo: "",
            disableCreateAShowButton: true,
        }
    }
    handleChange = (e) => {
        if (e.target.files[0]) {
            const image = e.target.files[0];
            this.setState(() => ({ image }), () => this.setState({ disableCreateAShowButton: !this.areAllRequiredFieldsFilled()}));

        }
    };
    HandleSubmit = () => {
        let image = this.state.image;
        this.setState({ loading: true });
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                // progrss function ....
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                this.setState({ progress });
            },
            (error) => {
                // error function ....
                console.log(error);
            },
            () => {
                // complete function ....
                storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then((url) => {
                        console.log(url);
                        this.SaveProduct(url);
                        this.setState({ demo: url })
                    });
            }
        );
    }
    SaveProduct =  async (ImageUrl) => {
       await axios.post(`/newProduct`, {
            pname: this.state.Productname,
            image: ImageUrl,
            description: this.state.ProductDesc,
            quantity: this.state.Quantity,
            price: this.state.price
        })
            .then(response => {
                console.log(response);
                this.setState({ loading: false });
                this.props.change();
                this.props.refresh();
            })
            .catch(error => {
                console.log(error);
            })

    }

    areAllRequiredFieldsFilled() {
        return !!(this.state.Productname && this.state.ProductDesc && this.state.price && this.state.image && this.isUploadedImageValid() && this.state.Quantity);
    }

    isUploadedImageValid() {
        const validImageFileExtensions = [".jpg", ".jpeg", ".png", ".gif"];
        return validImageFileExtensions.some(fileExtension => this.state.image.name.endsWith(fileExtension));
    }
    render() {
        return (
            <div>
                  <Modal
                    title="Add new Product"
                    centered
                    visible={this.props.show}
                    onOk={() => this.props.change()}
                    onCancel={() => this.props.change()}>
                    <Spin indicator={antIcon} size="large" spinning={this.state.loading}>
                        <Form
                            layout="vertical"
                            name="basic"
                            size={"default"}
                            initialValues={{ remember: true }}
                            // onFinish={this.onFinish}
                            // onFinishFailed={this.onFinishFailed}
                            onFinish={this.HandleSubmit}
                        >
                            <Form.Item label="Product Name" name="Product Name" rules={[{ required: true, message: 'Please input your username!' }]}>
                                <Input
                                    placeholder="Enter Product Name"
                                    value={this.state.Productname}
                                    onChange={(e) => { this.setState({ Productname: e.target.value }, () => this.setState({ disableCreateAProductButton: !this.areAllRequiredFieldsFilled()})) }}
                                />
                            </Form.Item>
                            
                            <Form.Item label="Pick an Image" name="Pick an Image" >
                                <input
                                    type="file"
                                    onChange={this.handleChange}
                                />
                                { this.state.image && !this.isUploadedImageValid() && <Typography.Text type="danger">We only support JPG, PNG and GIF image formats. Please upload a valid image type.</Typography.Text>}
                            </Form.Item>

                            <Form.Item label="Product Description" name="Product Description"  rules={[{ required: true, message: 'Please Enter Description' }]}>
                                <Input
                                    placeholder="Enter Product Description"
                                    value={this.state.ProductDesc}
                                    onChange={(e) => { this.setState({ ProductDesc: e.target.value }, () => this.setState({ disableCreateAProductButton: !this.areAllRequiredFieldsFilled()})) }}
                                />
                            </Form.Item>

                            <Form.Item label="Price" name="Price" rules={[{ required: true, message: 'Please Enter a Price' }]}>
                               
                                <Input
                                    type="number"
                                    placeholder="Product Price"
                                    value={this.state.price}
                                    onChange={(e) => { this.setState({ price: e.target.value }, () => this.setState({ disableCreateAProductButton: !this.areAllRequiredFieldsFilled()})) }}
                                />
                            </Form.Item>

                            <Form.Item label="Quantity" name="Quantity" rules={[{ required: true, message: 'Please Enter a Quantity' }]}>
                                <Input
                                    type="number"
                                    placeholder="Product Price"
                                    value={this.state.Quantity}
                                    onChange={(e) => { this.setState({ Quantity: e.target.value }, () => this.setState({ disableCreateAProductButton: !this.areAllRequiredFieldsFilled()})) }}
                                />
                            </Form.Item>

                            <Form.Item >
                            <button
                                disabled={this.state.image==null?(true):(false)}
                                style={{ margin: "0px auto" }}
                                type="submit"
                                // onClick={this.HandleSubmit}
                                className="btn btn-primary">
                                Create a Show
                             </button>
                            </Form.Item>
                        </Form>
                    </Spin>

                </Modal>
            </div>
        )
    }
}

export default AddProductModal
