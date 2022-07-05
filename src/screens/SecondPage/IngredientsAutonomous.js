import React, { useState, useEffect } from "react";
import { Box, FlatList, Center, NativeBaseProvider, Text } from "native-base";
import { Image, TextInput, TouchableOpacity, View } from 'react-native'
import axios from 'axios'
import { Button } from 'react-native'

export default function IngredientAutonomous({navigation}) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        const resp = await axios.get("https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list");
        const data = await resp.data.drinks;
        setData(data);
        setLoading(false);
    };

    const onIngredientPress = ( item ) => {
        console.log(item);
        localStorage.setItem("ingredient", item);
        navigation.navigate('Third')
    }

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity
                onPress={() => onIngredientPress(item.strIngredient1)}>
                <Text>{item.strIngredient1}</Text>
            </TouchableOpacity>
        );
    };

    useEffect(() => {
        fetchData();
    }, []);
        
    return (
        <NativeBaseProvider>
            <Center flex={1}>
                <Box> Fetch API</Box>
                {loading && <Box>Loading..</Box>}
                {data && (
                    <FlatList
                        data={data}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.strIngredient1}
                    />
                )}
            </Center>
        </NativeBaseProvider>
    );
}