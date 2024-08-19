import React, { useState } from 'react';
import { Image, Modal, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import { styles } from '../../../Theme/appTheme';
import { Product } from '../HomeScreen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { PRIMARY_COLOR } from '../../../commons/constants';

interface Props {
    product: Product;
    isVisible: boolean;
    setShowModal: () => void;
    onAddProduct: (idProduct: number, quantity: number) => void;
}

export const ModalProduct = ({ isVisible, setShowModal, product, onAddProduct }: Props) => {
    const { width } = useWindowDimensions();
    const [quantity, setQuantity] = useState<number>(1);

    const handleChangeQuantity = (value: number) => {
        setQuantity(prevQuantity => {
            const newQuantity = prevQuantity + value;
            return Math.max(1, Math.min(newQuantity, product.stock));
        });
    }

    const handleAddProduct = () => {
        if (quantity > 0 && quantity <= product.stock) {
            onAddProduct(product.id, quantity);
            setQuantity(1);
            setShowModal();
        } else {
            alert('Cantidad no válida');
        }
    }

    return (
        <Modal visible={isVisible} animationType='fade' transparent={true}>
            <View style={styles.contentPrincipal}>
                <View style={{ ...styles.contentModal, width: width * 0.80 }}>
                    <View style={styles.headModal}>
                        <Text style={styles.titleModal}>{product.name} - ${product.price.toFixed(2)}</Text>
                        <TouchableOpacity onPress={setShowModal}>
                            <Icon name='cancel' size={27} color={PRIMARY_COLOR} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <Image source={{ uri: product.pathImage }} style={styles.imageModal} />
                    </View>
                    {product.stock === 0 ? (
                        <Text style={styles.messageStock}>¡Producto Agotado!</Text>
                    ) : (
                        <View>
                            <View style={styles.contentQuantity}>
                                <TouchableOpacity
                                    onPress={() => handleChangeQuantity(1)}
                                    disabled={quantity === product.stock}
                                    style={styles.buttonQuantity}
                                >
                                    <Text style={styles.textButtonQuantity}>+</Text>
                                </TouchableOpacity>
                                <Text style={styles.textQuantity}>{quantity}</Text>
                                <TouchableOpacity
                                    onPress={() => handleChangeQuantity(-1)}
                                    disabled={quantity === 1}
                                    style={styles.buttonQuantity}
                                >
                                    <Text style={styles.textButtonQuantity}>-</Text>
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.textQuantity}>Total: ${(product.price * quantity).toFixed(2)}</Text>
                            <TouchableOpacity
                                onPress={handleAddProduct}
                                style={styles.buttonAddCar}
                            >
                                <Text style={styles.textButtonAddCar}>Agregar al Carrito</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </View>
        </Modal>
    );
}
