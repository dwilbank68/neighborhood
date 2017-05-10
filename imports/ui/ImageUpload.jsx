import React from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import _ from 'lodash';
//import './App.css';
const CLOUD_NAME = 'dmij4pdz5';
const CLOUDINARY_UPLOAD_PRESET = 'ycojilpu';
const CLOUDINARY_UPLOAD_URL= `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`;

export default class ImageUpload extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            uploadedFile: null,
            uploadedFileCloudinaryUrl: ''
        };
        this.handleImageUpload = this.handleImageUpload.bind(this);
    }

    onImageDrop(files) {
        // const fileType = files[0].type;
        // const imageTypes = ['image/bmp', 'image/gif',
        //                     'image/jpg', 'image/jpg', 'image/png']
        // if (_.includes(imageTypes,fileType)) {
        //     alert("can't upload that file type");
        //     this.state = {
        //         uploadedFile: null,
        //         uploadedFileCloudinaryUrl: ''
        //     };
        //     return;
        // }
        this.setState({
            uploadedFile: files[0]
        });
        this.handleImageUpload(files[0]);
    }

    handleImageUpload(file) {

        var formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

        axios({
            url: CLOUDINARY_UPLOAD_URL,
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: formData
        })
        .then((res) => {
            if (res.data.secure_url !== '') {
                this.setState({
                    uploadedFileCloudinaryUrl: res.data.secure_url
                });
                this.props.avatarChange(res.data.secure_url);
            }
        })
        .catch((err) => {
            console.log('error in axios catch block',err);
        })

    }

    render() {

        const style = {
            width: '100px',
            height: '100px',
            border: '1px solid black'
        }

        return (
            <form>
                <div className="FileUpload">
                    <Dropzone   accept="image/*"
                                multiple={false}
                                onDrop={this.onImageDrop.bind(this)}
                                style={style}>
                        <div>Drop an image or click to select a file to upload.</div>
                    </Dropzone>
                </div>

                <div>
                    {this.state.uploadedFileCloudinaryUrl === '' ? null :
                        <div>
                            <p>{this.state.uploadedFile.name}</p>
                            <img src={this.state.uploadedFileCloudinaryUrl} />
                        </div>}
                </div>
            </form>
        )
    }
}

// c_pad,g_center,h_200,w_200