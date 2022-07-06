import React, { useState, useEffect } from "react";
import { Box, FlatList, Center, NativeBaseProvider, Text } from "native-base";
import {  TouchableOpacity  } from 'react-native'
import { Card, TouchableRipple  } from 'react-native-paper'
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
            <TouchableOpacity>
                <Card onPress={() => onItemPress(item.idDrink) }>
                    <Card.Cover source={{
                        uri: item.strDrinkThumb
                        }} />
                    <Card.Title
                    title={item.strDrink}/>
                </Card>
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
