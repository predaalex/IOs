import React, { useState, useEffect } from "react";
import { Box, FlatList, Center, NativeBaseProvider, Text } from "native-base";
import { Image, TextInput, TouchableOpacity, View } from 'react-native'
import axios from 'axios'
import { Button } from 'react-native'
import styles from './styles';

export default function FourthPage({navigation}) {

    const id = localStorage.getItem("id");
    console.log("Id-ul bauturii este: " + id);
    
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        const resp = await axios.get("https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + id);
        const data = await resp.data.drinks;
        setData(data);
        setLoading(false);
    }

    // const ingredients = (item) => {
    //     for(let i = 1; i <= 15; i++) {
    //         str = "strIngredient" + i.toString();
    //         if(item.str != null)
    //             console.log(item.str)

    // }

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity
                style={styles.items}>
                <Text>{item.strDrink}</Text>
                <Text>{item.strCategory}</Text>
                <Text>{item.strAlcoholic}</Text>
                <Text>{item.strInstructions}</Text>
                <View>
                    <Image
                        style={styles.tinyLogo}
                        source={{
                            uri: item.strDrinkThumb,
                        }}/>
                </View>
                <Text>{item.strIngredient1}</Text>
            </TouchableOpacity>
        )
    }

    useEffect(() => {
        fetchData();
    }, []);


    return (
        <NativeBaseProvider>
            <Center flex={1}>
                <Box> Fetch drink API</Box>
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