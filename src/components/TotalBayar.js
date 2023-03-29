import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { Component } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { numberWithCommas } from "../utils/numberWithCommas";
import { API_URL } from "../utils/constants";

export default class TotalBayar extends Component {
  submitTotalBayar = (totalBayar) => {
    const pesanan = {
      total_bayar: totalBayar,
      menus: this.props.keranjangs,
    };

    axios
      .post(API_URL + "pesanans", pesanan)
      .then((res) => {
        window.location = "/sukses";
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const totalBayar = this.props.keranjangs?.reduce(
      (result, item) => result + item.total_harga,
      0
    );

    return (
      <div className="fixed-bottom">
        <Row>
          <Col md={{ span: 3, offset: 9 }} className="mb-2 pe-4">
            <h5>
              Total Bayar :{" "}
              <strong className="float-end">
                Rp. {numberWithCommas(totalBayar)}
              </strong>
            </h5>
            <div className="d-grid">
              <Button
                variant="primary"
                onClick={() => this.submitTotalBayar(totalBayar)}
              >
                <FontAwesomeIcon icon={faShoppingCart} /> <strong>BAYAR</strong>
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}
