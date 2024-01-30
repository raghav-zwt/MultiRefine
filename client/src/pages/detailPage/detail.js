import React, { useEffect, useState } from 'react'
import Layout from "../../layouts/layout.js";
import { Link, useParams } from 'react-router-dom';
import axios from "axios";
import { toast } from 'react-toastify';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ClipboardCopy } from "../../components/ClipboardCopy.js";
import MonacoEditor from '@monaco-editor/react';
import Loader from '../../components/Loader.js';
import CryptoJS from "crypto-js";
import "./detail.css"

const DetailPage = () => {
    const [textareaData, setTextareaData] = useState("");
    const [getFilterCss, setgetFilterCss] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const param = useParams();

    const enconded_user_id = encodeURIComponent(CryptoJS.AES.encrypt(JSON.stringify(getFilterCss.user_id), process.env.REACT_APP_CRYPTOJS).toString());

    const enconded_id = encodeURIComponent(CryptoJS.AES.encrypt(JSON.stringify(getFilterCss.id), process.env.REACT_APP_CRYPTOJS).toString());

    const fetchCss = async () => {
        setIsLoading(true);
        try {
            const data = await axios.get(`${process.env.REACT_APP_API_URL}/api/filter/getFilterCss/${param.id}`);
            setgetFilterCss(data?.data?.data[0]);
            setTextareaData(data?.data?.data[0]?.css);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchCss();
        // eslint-disable-next-line
    }, [])

    const submitCss = async (e) => {
        setIsLoading(true);
        e.preventDefault();
        try {
            if (textareaData === getFilterCss.css) {
                toast.error("Your current css already added, change it.")
            } else {
                const data = await axios.post(`${process.env.REACT_APP_API_URL}/api/filter/filterCss/${param.id}`, {
                    cssData: textareaData
                });
                if (data?.data?.success) {
                    toast.success(data?.data?.message);
                    fetchCss();
                    setIsLoading(false);
                }
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message);
            setIsLoading(false);
        }
    }

    const CssRemoveId = async (id) => {
        setIsLoading(true);
        try {
            const data = await axios.put(
                `${process.env.REACT_APP_API_URL}/api/filter/filterCssRemove/${id}`
            );
            if (data?.data?.success) {
                toast.success(data?.data?.message);
                fetchCss();
                setIsLoading(false);
            }
        } catch (error) {
            toast.error(error?.response?.data?.message);
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return <Loader />;
    }

    return (
        <>
            <Layout title={""} description={""}>
                <div className="page-breadcrumb bg-white">
                    <div className="row align-items-center">
                        <div className="col-lg-3 col-md-4 col-sm-4 col-xs-12">
                            <h4 className="page-title">Filter Embadded Details</h4>
                        </div>
                        <div className="col-lg-9 col-sm-8 col-md-8 col-xs-12">
                            <div className="d-flex gap-3 justify-content-end ms-auto">
                                <Link to={"/site"} className="btn btn-primary fw-normal">Create Filter</Link>
                                <Link to={"/"} className="btn btn-primary fw-normal">Dashboard</Link>
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
                                    <Button variant="primary text-white" onClick={handleShow}>
                                        Embadded Link
                                    </Button>
                                    <Link to={"/list"} className="btn btn-primary text-white" >
                                        Filter List
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-body">
                            <form method='post' onSubmit={submitCss}>
                                {/* <textarea required
                                    className='w-100 p-4'
                                    value={textareaData || ""}
                                    onChange={(e) => { setTextareaData(e.target.value) }}
                                    placeholder='Enter css'
                                    rows={10}></textarea> */}
                                <div className='Css-Editor'>
                                    <MonacoEditor
                                        width="100%"
                                        height="100%"
                                        className='w-100'
                                        onChange={(e) => { setTextareaData(e); }}
                                        defaultLanguage="css"
                                        options={{
                                            selectOnLineNumbers: true,
                                            roundedSelection: false,
                                            readOnly: false,
                                            cursorStyle: 'line',
                                            automaticLayout: true,
                                        }}
                                        theme="vs-dark"
                                        value={textareaData || ""}
                                    />
                                </div>
                                <Button type='submit' className='btn mt-4 btn-danger pull-right waves-effect waves-light text-white'>Add</Button>
                            </form>
                        </div>
                    </div>

                    <div className="card">
                        <div className='card-header gap-4 bg-white pt-4 pb-0 d-flex flex-wrap justify-content-between align-items-center'>
                            <div className="fw-bold fs-4">CSS</div>
                            {getFilterCss.css ? (
                                <button onClick={(el) => {
                                    el.preventDefault();
                                    CssRemoveId(getFilterCss?.id);
                                }} className='btn btn-primary'>Remove CSS</button>
                            ) : ""}
                        </div>
                        <div className="card-body">
                            <ClipboardCopy copyText={getFilterCss.css ? getFilterCss.css : "Css Not found"} />
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
                            <ClipboardCopy copyText={`${process.env.REACT_APP_URL}/embedded_code?user_id=${enconded_user_id}&id=${enconded_id}`} />
                        </div>
                        <h4 className="py-4 page-title mb-0 text-center">- OR -</h4>
                        <div>
                            <h4 className="page-title">Iframe code</h4>
                            <ClipboardCopy copyText={`<iframe src="${process.env.REACT_APP_URL}/embedded_code?user_id=${enconded_user_id}&id=${enconded_id}" width="100%" height="100%" class="Multifilter-${getFilterCss.user_id}${getFilterCss.id}" title="Multifilter-${getFilterCss.user_id}${getFilterCss.id}"></iframe>`} />
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
