import React, { useState } from 'react';
import { Image, Text, View, TouchableOpacity } from 'react-native';
import { Product } from '../HomeScreen';
import { styles } from '../../../Theme/appTheme';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { PRIMARY_COLOR } from '../../../commons/constants';
import { ModalProduct } from './ModalProduct';

interface Props {
    product: Product;
    onAddProduct: (idProduct: number, quantity: number) => void;
}

export const CardProduct = ({ product, onAddProduct }: Props) => {
    const [showModal, setShowModal] = useState<boolean>(false);

    return (
        <View style={styles.contentCard}>
            <Image source={{ uri: product.pathImage }} style={styles.imageCard} />
            <View style={{ flex: 1 }}>
                <Text style={styles.titleCard}>{product.name}</Text>
                {product.description && <Text style={styles.descriptionCard}>{product.description}</Text>}
                <Text style={styles.priceCard}>${product.price.toFixed(2)}</Text>
            </View>
            <TouchableOpacity
                style={styles.iconCard}
                onPress={() => setShowModal(true)}
            >
                <Icon name='add-shopping-cart' size={33} color={PRIMARY_COLOR} />
            </TouchableOpacity>
            <ModalProduct
                isVisible={showModal}
                setShowModal={() => setShowModal(false)}
                product={product}
                onAddProduct={onAddProduct}
            />
        </View>
    );
}
