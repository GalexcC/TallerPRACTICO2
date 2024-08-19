import React from 'react';
import { Text, useWindowDimensions, View } from 'react-native';
import { styles } from '../Theme/appTheme';

//interface - props
interface Props {
    title: string;
}

export const TitleComponent = ({ title }: Props) => {
    const { height } = useWindowDimensions();
    return (
        <View style={{ height: height * 0.12 }}>
            <Text style={styles.globalTitle}>{title}</Text>
        </View>
    )
}
