import React from 'react';
import { FlatList, Modal, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { Car } from '../HomeScreen';
import { styles } from '../../../Theme/appTheme';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { PRIMARY_COLOR } from '../../../commons/constants';

// porcentaje de descuento
const DISCOUNT_PERCENTAGE = 0.15;



//interface - props
interface Props {
    isVisible: boolean;
    setShowModal: () => void;
    car: Car[];  
}

export const ModalCar = ({ isVisible, car, setShowModal }: Props) => {
    const { width } = useWindowDimensions();


    const totalPay = (): number => {
        let total: number = 0;
        car.forEach(product => {
            total += product.price * product.totalQuantity;
        });
        return total;
    }

    // calcula la cantidad total de productos que agregue
    const totalQuantity = (): number => {
        let quantity: number = 0;
        car.forEach(product => {
            quantity += product.totalQuantity;
        });
        return quantity;
    }

    // calcular el descuento
    const calculateDiscount = (): number => {
        const quantity = totalQuantity();
        if (quantity >= 7) {
            return totalPay() * DISCOUNT_PERCENTAGE;
        }
        return 0;
    }

    //calcular el total a pagar despues del descuento
    const finalTotalPay = (): number => {
        return totalPay() - calculateDiscount();
    }

    const handleSendInfo = () => {
        setShowModal();
    }

    return (
        <Modal visible={isVisible} animationType='fade' transparent={true}>
            <View style={styles.contentPrincipal}>
                <View style={{
                    ...styles.contentModal,
                    width: width * 0.80
                }}>
                    <View style={styles.headModal}>
                        <Text style={styles.titleModal}>Mis Productos</Text>
                        <View style={styles.iconCard}>
                            <Icon
                                name='cancel'
                                size={27}
                                color={PRIMARY_COLOR}
                                onPress={setShowModal} />
                        </View>
                    </View>
                    <View style={styles.headerTable}>
                        <Text style={styles.textInformation}>Producto</Text>
                        <View style={styles.headerInformation}>
                            <Text style={{
                                ...styles.textInformation,
                                marginHorizontal: 10
                            }}>Prec.</Text>
                            <Text style={{
                                ...styles.textInformation,
                                marginHorizontal: 10
                            }}>Cant.</Text>
                            <Text style={{
                                ...styles.textInformation,
                                marginHorizontal: 10
                            }}>Total</Text>
                        </View>
                    </View>

                    <FlatList
                        data={car}
                        renderItem={({ item }) =>
                            <View style={styles.headerTable}>
                                <Text>{item.name}</Text>
                                <View style={styles.headerInformation}>
                                    <Text style={{ marginHorizontal: 10 }}>
                                        {item.price.toFixed(2)}
                                    </Text>
                                    <Text style={{ marginHorizontal: 27 }}>
                                        {item.totalQuantity}
                                    </Text>
                                    <Text style={{ marginHorizontal: 10 }}>
                                        {(item.price * item.totalQuantity).toFixed(2)}
                                    </Text>
                                </View>
                            </View>
                        }
                        keyExtractor={item => item.id.toString()} />
                    
                    
                    {calculateDiscount() > 0 && (
                        <View style={{ alignItems: 'flex-end' }}>
                            <Text style={styles.textTotalPay}>
                                Descuento del 15%: -${calculateDiscount().toFixed(2)}
                            </Text>
                        </View>
                    )}
                    
                    <View style={{ alignItems: 'flex-end' }}>
                        <Text style={styles.textTotalPay}>
                            Total pagar: ${finalTotalPay().toFixed(2)}
                        </Text>
                    </View>
                    
                    <TouchableOpacity
                        onPress={handleSendInfo}
                        style={styles.buttonAddCar}>
                        <Text style={styles.textButtonAddCar}>Comprar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}
