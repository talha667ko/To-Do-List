import React from "react";
import { View,Text,StyleSheet, TouchableOpacity } from "react-native";


const Task = (props) => {

    const Clr = props.done ? 'lightgreen' : 'lightblue';

    return(
        <View style={styles.item}>
            <View style={styles.itemleft}>
                <TouchableOpacity style={[styles.square, {backgroundColor: Clr}]}></TouchableOpacity>
                <Text>{props.text}</Text>
            </View>
            <View style={[styles.circular, {borderColor: Clr}]} ></View>
        </View>
    );
}

const styles = StyleSheet.create({

    item : {
        backgroundColor: "white",
        padding: 15,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems:'center',
        justifyContent: 'space-between',
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#C0C0C0',
    },
    itemleft : {
        flexDirection: "row",
        alignItems: 'center',
        flexWrap: 'wrap',

    },
    square : {
        width: 24,
        height: 24,
        opacity: 0.9,
        borderRadius: 5,
        marginRight: 15,
    },
    text : {
        maxWidth: "80%",
    },
    circular : {
        width:12,
        height:12,
        borderWidth:2,
        borderRadius:5,
    },

});

export default Task