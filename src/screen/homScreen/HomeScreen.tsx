import React, { useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { TitleComponent } from '../../components/TitleComponent';
import { CardProduct } from './components/CardProduct';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { PRIMARY_COLOR, SECUNDARY_COLOR } from '../../commons/constants';
import { styles } from '../../Theme/appTheme';
import { ModalCar } from './components/ModalCar';

export interface Product {
    id: number;
    name: string;
    description?: string;
    price: number;
    stock: number;
    pathImage: string;
}

export interface Car {
    id: number;
    name: string;
    price: number;
    totalQuantity: number;
}

export const HomeScreen = () => {
    const products: Product[] = [
        { id: 1, name: 'Pink Floyd', description: 'The Dark Side of the Moon', price: 25.80, stock: 10, pathImage: 'https://cdn.houstonpublicmedia.org/wp-content/uploads/2023/03/09112539/The-Dark-Side-of-the-Moon-Album-Cover.png' },
        { id: 2, name: 'Nas', description: 'Ilmatic', price: 30.30, stock: 5, pathImage: 'https://www.therecordhub.com/cdn/shop/products/NASILLMATIC_2019-11-06_13-19-30_5hfSimvEqk_2048x.png?v=1595512260' },
        { id: 3, name: 'Beasty Boys', price: 20.17, description: 'Check Your Head', stock: 6, pathImage: 'https://shopus.beastieboys.com/cdn/shop/files/CYH2LP.png?v=1710182164' },
        { id: 4, name: 'Michael Jackson', description: 'Bad', price: 40.80, stock: 10, pathImage: 'https://www.theaudiodb.com/images/media/album/3dface/unjq7f1611038408.png' },
        { id: 5, name: 'Michael Jackson', description: 'Invincible', price: 25.30, stock: 3, pathImage: 'https://static.musictoday.com/store/bands/4771/product_600/Y4CDMJ005.png' },
        { id: 6, name: 'Charles Mingus', description: 'In Carnations', price: 20.00, stock: 15, pathImage: 'https://static.musictoday.com/store/bands/6282/product_large/XTCDCA037.png' },
        { id: 7, name: 'Yellowman', description: 'Reggae Freedom', price: 10.00, stock: 7, pathImage: 'https://cleorecs.com/cdn/shop/files/CLO2006LP-01.png?v=1712984249' },
        { id: 8, name: 'Guns N Roses', description: 'Appetite Of Destruction', price: 45.00, stock: 3, pathImage: 'https://gnrmerch.com/cdn/shop/files/AFDCd.png?v=1699299793&width=1000' },
    ];

    const [productsState, setProductsState] = useState(products);
    const [car, setCar] = useState<Car[]>([]);
    const [showModal, setShowModal] = useState<boolean>(false);

    const changeStockProduct = (idProduct: number, quantity: number) => {
        const updateStock = productsState.map(product =>
            product.id === idProduct
                ? { ...product, stock: product.stock - quantity }
                : product
        );
        setProductsState(updateStock);
        addProduct(idProduct, quantity);
    }

    const addProduct = (idProduct: number, quantity: number) => {
        const product = productsState.find(product => product.id === idProduct);
        if (!product) return;

        setCar(prevCar => {
            const productInCart = prevCar.find(item => item.id === idProduct);
            if (productInCart) {
                // Si el producto ya está en el carrito, actualizar la cantidad
                return prevCar.map(item =>
                    item.id === idProduct
                        ? { ...item, totalQuantity: item.totalQuantity + quantity }
                        : item
                );
            } else {
                // Si el producto no está en el carrito, agregarlo
                return [...prevCar, {
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    totalQuantity: quantity
                }];
            }
        });
    }

    const emptyCart = () => {

        setCar([]);
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.contentHeaderHome}>
                <TitleComponent title='Productos' />
                <View style={styles.iconCardHome}>
                    <Text style={styles.textIconCard}>{car.length}</Text>
                    <TouchableOpacity
                        onPress={() => {
                            if (car.length > 0) {
                                setShowModal(!showModal);
                            }
                        }}
                        disabled={car.length === 0}
                        style={[
                            styles.iconButton, 
                            { opacity: car.length === 0 ? 0.5 : 1 }
                        ]}
                    >
                        <Icon
                            name='shopping-cart'
                            size={33}
                            color={car.length === 0 ? '#ccc' : SECUNDARY_COLOR}
                        />
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView>
                {productsState.map(product => (
                    <CardProduct
                        key={product.id}
                        product={product}
                        onAddProduct={changeStockProduct}
                    />
                ))}
            </ScrollView>

            <ModalCar
                isVisible={showModal}
                car={car}
                setShowModal={() => {
                    setShowModal(!showModal);
                    if (car.length > 0) {
                        emptyCart();
                    }
                }}
            />
        </View>
    );
}
