import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    formContainer: {
        flexDirection: 'row',
        height: 80,
        marginTop: 40,
        marginBottom: 20,
        flex: 1,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 30,
        paddingRight: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },

    fab: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: 'blue',
        position: 'absolute',
        bottom: 10,
        right: 10
    },
    items: {
        backgroundColor: '#6ab3c7',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        height: 130,
        borderRadius: 5,
        alignItems: 'center',
        shadow: true,
        fontFamily: 'Finlandica',
    },
    itemz: {
        width:200,
        height:240
    }

})