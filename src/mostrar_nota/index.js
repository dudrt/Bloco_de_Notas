import { useEffect, useState } from 'react';
import { Text, View, StyleSheet, ScrollView, TouchableOpacity } from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage';
import Checkbox from 'expo-checkbox';


function MostrarNota({ Tela, ModState, SetNotaMod }) {

    global.infos

    const [view, setView] = useState()
    console.log(Tela)
    useEffect(() => {
        Start()
    }, []);

    const Start = async () => {
        console.log("rodou")
        setView()
        var array = []

        try {
            // Obtenha os dados atuais do AsyncStorage
            const dadosAtuais = await AsyncStorage.getItem('Storage');
            // const db = dadosAtuais ? JSON.parse(dadosAtuais) : [];

            if (dadosAtuais === "" || dadosAtuais === null) {
                array.push(<View>
                    <Text>Suas anotações aparecerão aqui.</Text>
                </View>)
                setView(array)
            } else {
                const infos = JSON.parse(dadosAtuais)
                global.infos = infos
                console.log(infos)
                for (var i = 0; i < infos.length; i++) {
                    array.push(
                        <View style={styles.view_notas}>
                            <Text style={styles.text_view_notas} numberOfLines={1}>{infos[i].titulo}</Text>
                        </View>


                    )
                }
                setView(array)
            }


        } catch (error) {
            console.error('Erro ao obter do AsyncStorage:', error);
        }



    }




    const Checado = async (posicao) => {
        const dadosAtuais = await AsyncStorage.getItem('Storage');
        let infos = JSON.parse(dadosAtuais)

        infos[posicao].checked = !infos[posicao].checked

        return true


    }


    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button_add_nota} onPress={() => ModState("ADD_NOTA")}>
                <Text style={styles.text_add_nota}>Adicionar Nota</Text>
            </TouchableOpacity>

            {view && view.length > 0 ? (
                <ScrollView style={{ width: "110%", height: "100%" }}>
                    <View>
                        {view.map((component, index) => (
                            <View style={styles.display_views} key={index}>
                                <TouchableOpacity 
                                    onPress={() => {
                                        ModState("MOD_TELA"),
                                            SetNotaMod(index)
                                    }} >

                                    {component}
                                </TouchableOpacity>
                                <Checkbox
                                    style={styles.checkbox}
                                    color={true ? '#4630EB' : undefined}
                                    value={infos[index].checked}
                                // onValueChange={Checado(i)}
                                />
                                <TouchableOpacity style={styles.delete_view}>
                                    <Text>DEL</Text>
                                </TouchableOpacity>
                            </View>
                        ))}
                            </View>
                </ScrollView>
            ) : (
                <View>
                    <Text style={styles.text}>Suas anotações aparecerão aqui.</Text>
                </View>
            )}
        </View>
    )

} export default MostrarNota


const styles = StyleSheet.create({
    container: {
        width: "90%",
        // backgroundColor:"#FFFFFF"
    },
    button_add_nota: {
        width: "25%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#42046F",
        padding: 3,
        marginTop: "5%",
        marginLeft: "5%",
        borderRadius: 50
    },
    text_add_nota: {
        color: "#FFF",
        fontSize: 16
    },
    text: {
        color: "#FFFFFF"
    },
    view_notas: {
        
        flexDirection: "row"

    },
    text_view_notas: {
        width: "85%",
        height: 40,
        borderColor: "#3E3E3E",
        borderStyle: "solid",
        borderWidth: 2,
        borderRadius: 20,
        padding: 10,
        justifyContent: "center",
        color: "#FFFFFF",
        marginStart: "3%"

    },
    display_views:{
        flexDirection:"row",
        alignItems:"center",
        marginTop:"3%"
    },
    checkbox:{
        marginLeft:"-8%"
    },
    delete_view:{
        width:"10%",
        height:40,
        backgroundColor:"#FFF",
        marginStart:"4%"
    }
})