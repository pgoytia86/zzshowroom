import React, { Component } from 'react'
import formatCurrency from "../util";   
import Fade from 'react-reveal/Fade';
import  Modal from "react-modal";
import Zoom from "react-reveal/Zoom";
import {connect} from "react-redux";
import {fetchProducts} from "../actions/productActions";
import {addToCart} from  "../actions/cartActions";

 class Products extends Component {

    //modal
    constructor(props){
        super(props);
        this.state= {
            product:null,
        };
    }

    componentDidMount(){
      this.props.fetchProducts();
    }
            //seteo de producto en el modal evento onclick
        openModal = (product) => {
            this.setState({product});
        };

        closeModal =() =>{
            this.setState({product:null});
        };




    render() {
        const {product } = this.state;
        return (
            <div>
                <Fade bottom cascade  >     {/*animación Cascada desde abajo */}
                {
                  !this.props.products ? (
                     <div> Cargando... </div> 
                  ):(
                  <ul className="products">
                  {this.props.products.map((product) => (
                      <li key={product._id}>
                          <div className="product">
                              <a href={"#" + product._id} onClick={()=>this.openModal(product)}
                              
                              >
                                  <img src={product.image} alt ={product.title} title="Click para más información"></img>
                                  <p>
                                      {product.title}
                                  </p>
                              </a>
                              <div className="product-price">
                               <div>{formatCurrency(product.precio)}MXN</div> 
                                
                                  <button  onClick={()=>this.props.addToCart(product)} 
                                  className="button primary">
                                      Agregar Pedido
                                  </button>
                              </div>
                          </div>
                      </li>
                  ))}

              </ul>

                  )}
               
                </Fade>

                {/** rendering condicional modal - si el producto existe , muestra el modal*/}

                {product && (
          <Modal isOpen={true} onRequestClose={this.closeModal}>
            <Zoom>
              <button className="close-modal" onClick={this.closeModal}>
                x
              </button>
              <div className="product-details">
                <img src={product.image} alt={product.title}></img>
                <div className="product-details-description">
                  <p>
                    <strong>{product.title}</strong>
                  </p>
                  <p>{product.descripcion}</p>
                  <p>
                    Tallas Disponibles:{" "}
                    {product.availableSizes.map((x) => (
                      <span>
                        {" "}
                        <button className="button">{x}</button>
                      </span>
                    ))}
                  </p>
                  <div className="product-price">
                    <div>Precio:{" "}{formatCurrency(product.precio)}</div>
                    <button
                      className="button primary"
                      onClick={() => {
                        this.props.addToCart(product);
                        this.closeModal();
                      }}
                    >
                      Añadir Pedido
                    </button>
                  </div>
                </div>
              </div>
            </Zoom>
          </Modal>
        )}
      </div>
    );
  }
}
 export default connect(
  (state) => ({ products: state.products.filteredItems }),
  {
    fetchProducts,
    addToCart,
  }
)(Products);