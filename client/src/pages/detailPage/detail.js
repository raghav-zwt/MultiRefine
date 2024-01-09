import React, { useEffect, useState } from 'react'
import Layout from "../../layouts/layout.js";
import { Link, useParams } from 'react-router-dom';
import axios from "axios";
import { toast } from 'react-toastify';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ClipboardCopy } from "../../components/ClipboardCopy.js"

const DetailPage = () => {
    const [textareaData, setTextareaData] = useState("");
    const [getFilterCss, setgetFilterCss] = useState("");
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const param = useParams();

    const fetchCss = async () => {
        try {
            const data = await axios.get(`${process.env.REACT_APP_API_URL}/api/filter/getFilterCss/${param.id}`);
            setgetFilterCss(data?.data?.data[0]);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchCss();
        // eslint-disable-next-line
    }, [])

    const submitCss = async (e) => {
        e.preventDefault();
        try {
            const data = await axios.post(`${process.env.REACT_APP_API_URL}/api/filter/filterCss/${param.id}`, {
                cssData: textareaData
            });
            if (data?.data?.success) {
                toast.success(data?.data?.message)
                fetchCss();
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Layout>
                <div className="page-breadcrumb bg-white">
                    <div className="row align-items-center">
                        <div className="col-lg-3 col-md-4 col-sm-4 col-xs-12">
                            <h4 className="page-title">Filter Details</h4>
                        </div>
                        <div className="col-lg-9 col-sm-8 col-md-8 col-xs-12">
                            <div className="d-md-flex">
                                <ol className="breadcrumb ms-auto">
                                    <li><Link to={"/"} className="fw-normal">Dashboard</Link></li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <div className="col-lg-4 col-xlg-3 col-md-12">
                            <div className="white-box">
                                <div className="user-bg">
                                    <div className="overlay-box">
                                        <div className="p-4 text-start">
                                            <h4 className="text-white mt-2">{getFilterCss.name}</h4>
                                            <h5 className="text-white mt-2">{getFilterCss.type}</h5>
                                            <h5 className="text-white mt-2">{getFilterCss.layout}</h5>
                                        </div>
                                    </div>
                                </div>
                                <div className="user-btm-box mt-5 justify-content-center align-items-center flex-wrap gap-2 d-md-flex">
                                    <Button variant="danger text-white" onClick={handleShow}>
                                        Embadded Link
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-body">
                            <form method='post' onSubmit={submitCss}>
                                <textarea required
                                    className='w-100 p-4'
                                    // value={getFilterCss.css}
                                    onChange={(e) => { setTextareaData(e.target.value) }}
                                    placeholder='Enter css'
                                    rows={10}></textarea>
                                <Button type='submit' className='btn btn-danger pull-right waves-effect waves-light text-white'>Add</Button>
                            </form>
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-header">CSS</div>
                        <div className="card-body">
                            {getFilterCss.css}
                        </div>
                    </div>
                </div>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Filter Links</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <h4 className="page-title">Shareable link</h4>
                            <ClipboardCopy copyText={`${process.env.REACT_APP_URL}/embedded_code/user_id=${getFilterCss.user_id}&id=${getFilterCss.id}`} />
                        </div>
                        <h4 className="py-4 page-title mb-0 text-center">- OR -</h4>
                        <div>
                            <h4 className="page-title">Iframe code</h4>
                            <ClipboardCopy copyText={`<iframe src="${process.env.REACT_APP_URL}/embedded_code/user_id=${getFilterCss.user_id}&id=${getFilterCss.id}" title="Multifilter-${getFilterCss.user_id}${getFilterCss.id}"></iframe>`} />
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger text-white" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Layout>
        </>
    )
}

export default DetailPage
