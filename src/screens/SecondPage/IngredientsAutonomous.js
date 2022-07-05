import React, { useState, useEffect } from "react";
import { Box, FlatList, Center, NativeBaseProvider, Text } from "native-base";
import axios from 'axios'
import { Button } from 'react-native'

export default function CoffeeAutonomous() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        const resp = await axios.get("https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list");
        const data = await resp.data.drinks;
        console.log(data);
        setData(data);
        setLoading(false);
    };

    // const onIngredientPress = () => {
    //     navigation.navigate('ThridPage')
    // }

    const renderItem = ({ item }) => {
    return (
        <Button 
        title={item.strIngredient1}
        />
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