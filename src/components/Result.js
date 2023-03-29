import axios from "axios";
import React, { Component } from "react";
import { Badge, Card, Col, Row } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import Swal from "sweetalert2";
import { numberWithCommas } from "../utils/numberWithCommas";
import ModalKeranjang from "./ModalKeranjang";
import TotalBayar from "./TotalBayar";
import { API_URL } from "../utils/constants";

export default class Result extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      keranjangDetail: false,
      jumlah: 0,
      keterangan: "",
      totalHarga: 0,
    };
  }

  handleShow = (menuKeranjang) => {
    this.setState({
      showModal: true,
      keranjangDetail: menuKeranjang,
      jumlah: menuKeranjang.jumlah,
      keterangan: menuKeranjang.keterangan,
      totalHarga: menuKeranjang.total_harga,
    });
  };

  handleClose = () => {
    this.setState({
      showModal: false,
    });
  };

  tambah = () => {
    this.setState({
      jumlah: this.state.jumlah + 1,
      totalHarga:
        this.state.keranjangDetail.product.harga * (this.state.jumlah + 1),
    });
  };

  kurang = () => {
    if (this.state.jumlah !== 1) {
      this.setState({
        jumlah: this.state.jumlah - 1,
        totalHarga:
          this.state.keranjangDetail.product.harga * (this.state.jumlah - 1),
      });
    }
  };

  changeHandler = (e) => {
    this.setState({
      keterangan: e.target.value,
    });
  };

  hanldeSumbit = (e) => {
    e.preventDefault();

    this.handleClose();

    const data = {
      jumlah: this.state.jumlah,
      total_harga: this.state.totalHarga,
      product: this.state.keranjangDetail.product,
      keterangan: this.state.keterangan,
    };

    axios
      .put(API_URL + "keranjangs/" + this.state.keranjangDetail.id, data)
      .then((res) => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: data.product.nama + " Berhasil di Ubah",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  hapusPesanan = (id) => {
    this.handleClose();

    axios
      .delete(API_URL + "keranjangs/" + id)
      .then((res) => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title:
            "Pesanan " +
            this.state.keranjangDetail.product.nama +
            " Berhasil di Hapus",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const { keranjangs } = this.props;
    return (
      <Col lg={3}>
        <h6 className="fw-bold">Hasil</h6>
        <hr />
        {keranjangs?.length === 0 ? (
          <ListGroup variant="flush">
            <ListGroup.Item>Keranjang Kosong</ListGroup.Item>
          </ListGroup>
        ) : (
          <Card className="overflow-auto hasil">
            <ListGroup variant="flush">
              {keranjangs?.map((menuKeranjang) => (
                <ListGroup.Item
                  key={menuKeranjang.id}
                  onClick={() => this.handleShow(menuKeranjang)}
                >
                  <Row>
                    <Col xs={2}>
                      <Badge pill bg="success">
                        {menuKeranjang.jumlah}
                      </Badge>
                    </Col>
                    <Col>
                      <p className="mb-0">{menuKeranjang.product.nama}</p>
                      <span className="text-muted" style={{ fontSize: "13px" }}>
                        Rp. {numberWithCommas(menuKeranjang.product.harga)}
                      </span>
                    </Col>
                    <Col>
                      <span className="float-end fw-bold">
                        Rp. {numberWithCommas(menuKeranjang.total_harga)}
                      </span>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}

              <ModalKeranjang
                {...this.state}
                handleClose={this.handleClose}
                tambah={this.tambah}
                kurang={this.kurang}
                changeHandler={this.changeHandler}
                hanldeSumbit={this.hanldeSumbit}
                hapusPesanan={this.hapusPesanan}
              />
            </ListGroup>
          </Card>
        )}
        <TotalBayar keranjangs={keranjangs} />
      </Col>
    );
  }
}
