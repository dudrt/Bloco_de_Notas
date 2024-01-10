import { useEffect, useState } from 'react';
import { Text, View, StyleSheet, ScrollView, TouchableOpacity, ImageBackground, Image } from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from "react-native-modal";


function MostrarNota({ Tela, ModState, SetNotaMod, setAtualizarView, AtualizarView }) {
    
    global.infos

    const [view, setView] = useState()
    const [modalVisible, setVisibiliy] = useState(false)
    const [posicaoNotaDel, setPosicaoNotaDel] = useState()

    useEffect(() => {
        if (AtualizarView) {
            Start()
            setAtualizarView(false)
        }
    }, [AtualizarView]);

    const Start = async () => {
        setView()

        try {
            var array = []
            const dadosAtuais = await AsyncStorage.getItem('Storage');

            if (dadosAtuais === "" || dadosAtuais === null || dadosAtuais === undefined) {

                setView("")
                console.log("rodou")

            } else {
                const infos = JSON.parse(dadosAtuais)
                global.infos = infos
                for (var i = 0; i < infos.length; i++) {
                    array.push(
                        <View style={styles.view_notas}>
                            <Text style={[styles.text_view_notas, global.infos[i].checked ? { textDecorationLine: 'line-through', } : { textDecorationLine: "none" }]} numberOfLines={1} ellipsizeMode="tail">{infos[i].titulo}</Text>
                        </View>
                    )
                }
                setView(array)
            }
        } catch (error) {
            array.push(<View>
                <Text>Suas anotações aparecerão aqui.</Text>
            </View>)
            setView(array)
            console.error('Erro ao obter do AsyncStorage:', error);
        }
    }

    const Checado = async (posicao) => {
        const dadosAtuais = await AsyncStorage.getItem('Storage');
        let infos = JSON.parse(dadosAtuais)

        infos[posicao].checked = !infos[posicao].checked

        await AsyncStorage.setItem('Storage', JSON.stringify(infos));
        Start()
    }
    const DeleteNota = async (posicao) => {
        const dadosAtuais = await AsyncStorage.getItem('Storage');
        let infos = JSON.parse(dadosAtuais)
        infos.splice(posicao, 1)
        await AsyncStorage.setItem('Storage', JSON.stringify(infos));
        setVisibiliy(false)
        Start()
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button_add_nota} onPress={() => ModState("ADD_NOTA")}>
                <Text style={styles.text_add_nota}>Adicionar Nota</Text>
            </TouchableOpacity>
            {view && view.length > 0 ? (
                <ScrollView style={{ width: "110%", height: "100%" }}>
                    {view.map((component, index) => (
                        <View style={styles.display_views} key={index}>
                            <TouchableOpacity
                                onPress={() => {
                                    ModState("MOD_TELA"),
                                        SetNotaMod(index)
                                }} >
                                {component}
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => Checado(index)}
                                style={styles.checkboxContainer}
                            >
                                <View style={styles.checkboxOverlay}>
                                    {global.infos[index].checked ? (
                                        <Text style={styles.text_check}>✔</Text>) : (
                                        <Text></Text>
                                    )}
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.delete_view}
                                onPress={() => { setVisibiliy(true), setPosicaoNotaDel(index) }}>
                                <Text style={{ fontSize: 30 }}>🗑️</Text>
                            </TouchableOpacity>
                        </View>
                    ))}

                </ScrollView>
            ) : (
                <View style={styles.view_notas_false}>
                    <Text style={styles.text_notas_false}>Suas notas aparecerão aqui!</Text>
                </View>
            )}

            <Modal isVisible={modalVisible} style={styles.modal}>{modalVisible ? (
                <View style={styles.modal_view}>
                    <Text style={{ color: "#FFF" }}>
                        Você deseja excluir <Text style={{ color: "#f9ff4d" }}>{infos[posicaoNotaDel].titulo}</Text> ?
                    </Text>
                    <TouchableOpacity style={styles.modal_btn} onPress={() => { DeleteNota(posicaoNotaDel) }}>
                        <Text style={styles.text_modal}>Confirmar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.modal_btn} onPress={() => { setVisibiliy(false) }}>
                        <Text style={styles.text_modal}>Voltar</Text>
                    </TouchableOpacity>
                </View>
            ) : (<></>)}</Modal>
        </View>
    )

} export default MostrarNota


const styles = StyleSheet.create({
    container: {
        width: "90%",
    },
    button_add_nota: {
        width: "40%",
        height: "50",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#42046F",
        padding: 4,
        marginTop: "5%",
        marginLeft: "5%",
        borderRadius: 50
    },
    text_add_nota: {
        color: "#FFF",
        fontSize: 18
    },
    text: {
        color: "#FFFFFF"
    },
    view_notas: {
        flexDirection: "row",
    },
    text_view_notas: {

        width: "80%",
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
    display_views: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: "3%"
    },
    checkbox: {

        backgroundColor: "#FFF"
    },
    delete_view: {
        marginStart: "4%"
    },
    modal: {
        marginTop: "60%",
        flex: 0.4,
        backgroundColor: "#101000",
        borderRadius: 40,
        padding: "4%"
    },
    modal_btn: {
        marginTop: "5%",
        width: "40%",
        borderRadius: 20,
        padding: 10,
        alignItems: "center",
        justifyContent: "center",
        color: "#FFFFFF",
        backgroundColor: "#42046F",
    },
    text_modal: {
        color: "#FFF",
        fontSize: 18
    },
    modal_view: {
        justifyContent: "center",
        alignItems: "center",
    },
    checkboxContainer: {
        marginStart: "-8%",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: "8%",
        height: "80%",
        borderColor: "#3E3E3E",
        borderStyle: "solid",
        borderWidth: 2,
    },
    text_check: {
        fontSize: 22,
        color: "#FFF"
    },
    view_notas_false:{
        marginTop:40,
        justifyContent:"center",
        alignItems:"center"
    },
    text_notas_false:{
        fontSize:20,
        color:"#FFF"
    }
})