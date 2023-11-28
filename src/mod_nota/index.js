import { useState,useEffect } from 'react';
import { StyleSheet,TextInput, Text, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ModificarNota({NotaPosi,ModState}) {

  useEffect(() => {
    Start()
    console.log(NotaPosi)
}, []);

  const [valorInput, setValorInput] = useState("")
  const [title, setTitle] = useState("")


  const Start = async () =>{

    const dadosAtuais = await AsyncStorage.getItem('Storage');
    const infos = JSON.parse(dadosAtuais)

    setTitle(infos[NotaPosi].titulo)
    setValorInput(infos[NotaPosi].texto)

  }

  const Salvar = async () =>{
    infos[NotaPosi].titulo = title
    infos[NotaPosi].texto = valorInput

    await AsyncStorage.setItem('Storage', JSON.stringify(infos));

  }
  return (
    <View style={styles.container}>
        <TouchableOpacity onPress={()=>{Salvar(), ModState("SHOW_NOTA")}} style={styles.button_salvar}>
            <Text style={styles.text_salvar}>Salvar e Sair</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{ModState("SHOW_NOTA")}} style={styles.button_cancelar}>
          <Text style={styles.text_salvar}>Cancelar</Text>
        </TouchableOpacity>
        <TextInput
        editable
        multiline
        style={styles.title}
        numberOfLines={1}
        maxLength={35}
        value={title}
        placeholder="Titulo"
        placeholderTextColor={'rgb(148, 148, 148)'}
        onChangeText={text => setTitle(text)}/>
         
        <TextInput
        editable
        multiline
        numberOfLines={8}
        maxLength={20000}
        placeholder="Seu Texto..."
        placeholderTextColor={'rgb(148, 148, 148)'}
        value={valorInput}
        onChangeText={text => setValorInput(text)}
        style={styles.input}
        
        />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:"10%"
  },
  input:{
      borderColor:"#3E3E3E",
      borderStyle:"solid",
      borderWidth:2,
      borderRadius:20,
      fontSize:16,
      color:"#FFFFFF",
      minWidth:"90%",
      height:"80%",
      maxWidth:"90%",
      padding:12,
      textAlignVertical: 'top',
  },
  title:{
      borderColor:"#3E3E3E",
      borderStyle:"solid",
      borderWidth:2,
      paddingEnd:10,
      paddingStart:10,
      borderRadius:20,
      color:"#FFFFFF",
      minWidth:"60%",
      maxWidth:"60%",
      marginBottom:"4%",
      fontSize:18,
      marginTop:"10%"
  },
  button_salvar:{
      backgroundColor:"#42046F",
      borderRadius:20,
      padding:5,
      position:"absolute",
      top:"-4.5%",
      right:"5%",
      width:"30%",
      justifyContent:"center",
      alignItems:"center"
  },
  text_salvar:{
      fontSize:18,
      color:"#FFFFFF"
  },
  button_cancelar:{
    backgroundColor:"#42046F",
      borderRadius:20,
      padding:5,
      position:"absolute",
      top:"-4.5%",
      left:"5%",
      width:"20%",
      justifyContent:"center",
      alignItems:"center"
  }
})

