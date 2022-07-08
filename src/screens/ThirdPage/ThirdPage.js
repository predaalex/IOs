import React, { useState, useEffect } from "react";
import { Box, FlatList, Center, NativeBaseProvider, Text } from "native-base";
import {  TouchableOpacity  } from 'react-native'
import { Card, TouchableRipple  } from 'react-native-paper'
import axios from 'axios'
import { Button } from 'react-native'
import styles from './styles';
import 'localstorage-polyfill'

import * as SQLite from 'expo-sqlite'

const db = SQLite.openDatabase('db.textDb')

export default function ThirdPage({navigation}) {

    const ingredient = localStorage.getItem("ingredient")
    const userName = localStorage.getItem("userName");
    const userEmail = localStorage.getItem("userEmail");


    console.log("ingredientul jmk este: " + ingredient);
    
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        const resp = await axios.get("https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + ingredient);
        const data = await resp.data.drinks;
        setData(data);
        setLoading(false);
    }

    const addCategory = (idDrink) => {
        console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!" + idDrink)
        db.transaction(txn => {
          txn.executeSql(
            `INSERT INTO categories VALUES (${idDrink},"${userName}","${userEmail}")`,
            [],
            (sqlTxn, res) => {
                console.log(`${userName} category added successfully`);
            },
            error => {
                console.log("error on adding category " + error.message);
            },
          );
        })
      };

    const onItemPress = async ( idDrink ) => {

        await addCategory(idDrink);

        console.log(idDrink);
        localStorage.setItem("id", idDrink);
        navigation.navigate('Fourth')
    }

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity>
                <Card onPress={() => onItemPress(item.idDrink) }
                style={styles.card}>
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
