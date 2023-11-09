import { useState } from "react"
import { TextInput,Text, View,StyleSheet, TouchableOpacity } from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage';


function AddNota(){

    const [valorInput, setValorInput] = useState("")
    const [title, setTitle] = useState("")

    const Salvar = async () =>{
        try {
            // Obtenha os dados atuais do AsyncStorage
            const dadosAtuais = await AsyncStorage.getItem('Storage');
            let db = dadosAtuais ? JSON.parse(dadosAtuais) : [];
            
            let novoItem = {titulo:title,texto:valorInput}

            if(!Array.isArray(db)){
                db = []
            }

            // Adicione o novo item ao array
            db.push(novoItem);
        
            // Salve o array atualizado de volta no AsyncStorage
            await AsyncStorage.setItem('Storage', JSON.stringify(db));
          } catch (error) {
            console.error('Erro ao salvar no AsyncStorage:', error);
          }



       

    }

    const getStorage = async () =>{
    try {
        const valor = await AsyncStorage.getItem('Storage');
        if (valor !== null) {
          return valor
        }else{
            await AsyncStorage.setItem('Storage', '"db":[]');
            return '"db":[]'
        }
      } catch (e) {
        // error reading value
      }
 }

    const setStorage = async (infos) =>{
        try{
            await AsyncStorage.setItem('Storage', infos);
        }catch (erro){
            console.log("Erro setStorage:"+erro)
        }
    }


return(
    <View style={styles.container}>
        <TouchableOpacity onPress={()=>{Salvar()}} style={styles.button_salvar}>
            <Text style={styles.text_salvar}>Salvar</Text>
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
    )}export default AddNota

    
const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    input:{
        borderColor:"#3E3E3E",
        borderStyle:"solid",
        borderWidth:2,
        borderRadius:20,
        fontSize:16,
        color:"#FFFFFF",
        minWidth:"90%",
        height:"85%",
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
        fontSize:18
    },
    button_salvar:{
        backgroundColor:"#42046F",
        borderRadius:20,
        padding:5,
        position:"absolute",
        top:"-4.5%",
        right:"5%",
        width:"18%",
        justifyContent:"center",
        alignItems:"center"
    },
    text_salvar:{
        fontSize:18,
        color:"#FFFFFF"
    }
  });