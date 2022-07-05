import React, { useState, useEffect } from "react";
import { Box, FlatList, Center, NativeBaseProvider, Text } from "native-base";
import { Image, TextInput, TouchableOpacity, View } from 'react-native'
import axios from 'axios'
import { Button } from 'react-native'
import styles from './styles';

export default function ThirdPage({navigation}) {

    const ingredient = localStorage.getItem("ingredient")
    console.log("ingredientul jmk este: " + ingredient);
    
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        const resp = await axios.get("https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + ingredient);
        const data = await resp.data.drinks;
        setData(data);
        setLoading(false);
    }

    const onItemPress = ( item ) => {
        console.log(item);
        localStorage.setItem("id", item);
        navigation.navigate('Fourth')
    }

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity 
                style={styles.items} 
                onPress={() => onItemPress(item.idDrink) }>
                <Text>{item.strDrink}</Text>
                <View>
                    <Image
                        style={styles.tinyLogo}
                        source={{
                            uri: item.strDrinkThumb,
                        }}/>
                </View>
            </TouchableOpacity>
        );
    };

    useEffect(() => {
        fetchData();
    }, []);

    

    return (
        <NativeBaseProvider>
            <Center flex={1}>
                <Box> Fetch drinks API</Box>
                {loading && <Box>Loading..</Box>}
                {data && (
                    <FlatList
                        data={data}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.idDrink} 
                    />
                )}
            </Center>
        </NativeBaseProvider>
    )
} 
