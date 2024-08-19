import React from 'react';
import { Text, useWindowDimensions, View } from 'react-native';
import { styles } from '../Theme/appTheme';

export const BodyComponent = (props: any) => {
    //console.log(props);

    // tamaño de la pantalla
    const { height } = useWindowDimensions();
    return (
        <View style={{
            ...styles.contentBody,
            height: height * 0.88
        }}>
            {props.children}
        </View>
    )
}
export default BodyComponent