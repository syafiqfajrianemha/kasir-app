import React, { Component } from "react";
import { Col } from "react-bootstrap";
import axios from "axios";
import { API_URL } from "../utils/constants";
import ListGroup from "react-bootstrap/ListGroup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUtensils,
  faCoffee,
  faCheese,
} from "@fortawesome/free-solid-svg-icons";

const Icon = ({ nama }) => {
  if (nama === "Makanan")
    return <FontAwesomeIcon icon={faUtensils} className="me-2" />;
  if (nama === "Minuman")
    return <FontAwesomeIcon icon={faCoffee} className="me-1" />;
  if (nama === "Cemilan")
    return <FontAwesomeIcon icon={faCheese} className="me-2" />;
};

export default class ListCategory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
    };
  }

  componentDidMount() {
    axios
      .get(API_URL + "categories")
      .then((res) => {
        const categories = res.data;
        this.setState({ categories });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { categories } = this.state;
    const { changeCategory, kategoriYangDiPilih } = this.props;
    return (
      <Col lg={2} className="mb-4">
        <h6 className="fw-bold">Daftar Kategori</h6>
        <hr />
        <ListGroup className="shadow-sm">
          {categories &&
            categories.map((category) => (
              <ListGroup.Item
                style={{ cursor: "pointer" }}
                variant={kategoriYangDiPilih === category.nama && "dark"}
                key={category.id}
                onClick={() => changeCategory(category.nama)}
              >
                <Icon nama={category.nama} /> {category.nama}
              </ListGroup.Item>
            ))}
        </ListGroup>
      </Col>
    );
  }
}
