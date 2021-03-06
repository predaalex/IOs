import React, { useState, useEffect } from "react";
import { Box, FlatList, Center, NativeBaseProvider, Text } from "native-base";
import { Image, TextInput, TouchableOpacity, View } from 'react-native'
import { Table, Row, Rows } from 'react-native-table-component';
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


    const renderItem = ({ item }) => {
        return (
            <>
           <TouchableOpacity
                style={styles.items}>
                <Text style={styles.title}>{item.strDrink}</Text>
                <View>
                    <Image
                        style={styles.tinyLogo}
                        source={{
                            uri: item.strDrinkThumb,
                        }}/>
                </View>
                <Text>{item.strCategory}</Text>
                <Text>{item.strAlcoholic}</Text>
                <Text>{'Instructions:'} {item.strInstructions}</Text>
                <Text>{'Ingredient list:'}</Text>
                <Text>{item.strIngredient1}  {item.strMeasure1}</Text>
                <Text>{item.strIngredient2}  {item.strMeasure2}</Text>
                <Text>{item.strIngredient3}  {item.strMeasure3}</Text>
                <Text>{item.strIngredient4}  {item.strMeasure4}</Text>
                <Text>{item.strIngredient5}  {item.strMeasure5}</Text>
                <Text>{item.strIngredient6}  {item.strMeasure6}</Text>
                <Text>{item.strIngredient7}  {item.strMeasure7}</Text>
                <Text>{item.strIngredient8}  {item.strMeasure8}</Text>
                <Text>{item.strIngredient9}  {item.strMeasure9}</Text>
                <Text>{item.strIngredient10}  {item.strMeasure10}</Text>
                <Text>{item.strIngredient11}  {item.strMeasure11}</Text>
                <Text>{item.strIngredient12}  {item.strMeasure12}</Text>
                <Text>{item.strIngredient13}  {item.strMeasure13}</Text>
                <Text>{item.strIngredient14}  {item.strMeasure14}</Text>
                <Text>{item.strIngredient15}  {item.strMeasure15}</Text>
            </TouchableOpacity>

            </>
        )
    }

    useEffect(() => {
        fetchData();
    }, []);


    return (
        <NativeBaseProvider>
            <Center flex={1} style={styles.tot}>
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