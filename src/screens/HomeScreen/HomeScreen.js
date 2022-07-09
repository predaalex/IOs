import React, { useEffect, useState } from 'react'
import { TextInput, View, StatusBar, Button, TouchableOpacity, Image,StyleSheet } from 'react-native'
import { Box, FlatList, Center, NativeBaseProvider, Text } from "native-base";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import { firebase } from '../../firebase/config'
import { FAB, Card } from 'react-native-paper';
import 'react-native-vector-icons';
import * as SQLite from 'expo-sqlite';
import axios from 'axios'

const db = SQLite.openDatabase('db.textDb')

export default function HomeScreen({navigation}) {
    const userName = localStorage.getItem("userName");
    const userEmail = localStorage.getItem("userEmail");
    console.log(userEmail + " " + userName)
    const idDrink = 11007
    console.log("_____________________________");

    const onFABPress = () => {
        navigation.navigate('Second')
    }

    const [category, setCategory] = useState("");
    const [categories, setCategories] = useState([]);

    const deleteTable = () => {
        db.transaction(txn => {txn.executeSql(
            'DROP TABLE categories;',
            [],
            (sqlTxn, res) => {
                console.log("table deleted");
            },
            error => {
                console.log("tableul nu a fost sters" + error.message);
            })
        })
    }

  const createTables = () => {
    db.transaction(txn => {
      txn.executeSql(
        'CREATE TABLE categories (idDrink INTEGER PRIMARY KEY , email VARCHAR(50), name VARCHAR(50))',
        [],
        (sqlTxn, res) => {
          console.log("table created successfully");
        },
        error => {
          console.log("error on creating table " + error.message);
        },
      );
    });
  };

  const addCategory = () => {
    db.transaction(txn => {
      txn.executeSql(
        `INSERT INTO categories VALUES (${idDrink},"${userName}","${userEmail}")`,
        [],
        // [userName, userEmail],
        (sqlTxn, res) => {
            console.log(`${userName} category added successfully`);
            getCategories();
            setCategory("");
        },
        error => {
            console.log("error on adding category " + error.message);
        },
      );
    })
  };

  const getCategories = () => {
    db.transaction(txn => {
      txn.executeSql(
        `SELECT * FROM categories WHERE email = "${userEmail}";`,
        [],
        (sqlTxn, res) => {
          console.log("categories retrieved successfully");
          let len = res.rows.length;
          if (len > 0) {
            let results = [];
            for (let i = 0; i < len; i++) {
              let item = res.rows.item(i);
              results.push({ idDrink: item.idDrink, name: item.name, email: item.email});
            }

            setCategories(results);
          }
        },
        error => {
          console.log("error on getting categories " + error.message);
        },
      );
    });
  };

  const renderCategory = ({ item }) => {
    
    return (
      <View style={{
        flexDirection: "row",
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderColor: "#ddd",
      }}>
        <Text style={{ marginRight: 9 }}>{item.id}</Text>
        <Text>{item.name} si {item.email}</Text>
      </View>
    );
  };

  useEffect( async () => {
    await createTables();
    await getCategories();
  }, []);

  /// API

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        console.log(categories)
        console.log("FASfFDSAFASDFASDFASDFSADFSDFADSFAFDS")
        let dataArray = []
        for (let index = 0; index < categories.length; index++) {

            console.log(categories[index].idDrink)
            let resp = await axios.get("https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + categories[index].idDrink);
            dataArray.push(resp.data.drinks[0]);
        }
        setData(dataArray)
        setLoading(false);
    }

    const onItemPress = ( item ) => {
        console.log(item);
        localStorage.setItem("id", item);
        navigation.navigate('Fourth')
    }

    const renderItem = ({ item }) => {
        console.log(item.strDrink)

        return (
            <>
            <TouchableOpacity style={styles.itemz}>
                <Card onPress={() => onItemPress(item.idDrink) }>
                <Card.Cover source={{
                    uri: item.strDrinkThumb
                    }} />
                <Card.Title
                title={item.strDrink}/>
            </Card>

            </TouchableOpacity>

            </>
        )
    }

    useEffect(() => {
      fetchData();
    }, [categories]);

  return (
    <>
    <NativeBaseProvider>
    <View >
      <StatusBar backgroundColor="#222" />

      <Button title="Delete" onPress={deleteTable} />
      <Button title="Create" onPress={createTables} />
      <Button title="Update" onPress={getCategories} />

    </View>
    <View style={{
        borderBottomColor: 'black',
        borderBottomWidth: StyleSheet.hairlineWidth,
    }}
    />
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

    <FAB title="New cocktail"
    style={styles.fab}
    icon = "plus"
    onPress={onFABPress}
    />

    </NativeBaseProvider>
    </>
  );

}