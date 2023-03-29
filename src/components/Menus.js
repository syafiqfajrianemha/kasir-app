import React from "react";
import { Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { numberWithCommas } from "../utils/numberWithCommas";

const Menus = ({ menu, masukKeranjang }) => {
  return (
    <Col lg={4} xs={6} className="mb-4">
      <Card className="shadow" onClick={() => masukKeranjang(menu)}>
        <Card.Img variant="top" src={"images/" + menu.gambar} />
        <Card.Body>
          <Card.Title>{menu.nama}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{menu.kode}</Card.Subtitle>
          <Card.Text>Rp. {numberWithCommas(menu.harga)}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Menus;
