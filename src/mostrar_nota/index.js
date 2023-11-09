import {useEffect,useState} from 'react';
import { Text, View,StyleSheet } from "react-native"

import AsyncStorage from '@react-native-async-storage/async-storage';


function MostrarNota(){

    const [view,setView] = useState()

    useEffect(() => {
        Start()
    }, []); 

    const Start = async () =>{
        console.log("rodou")
        setView()
        var array =[]

        try {
            // Obtenha os dados atuais do AsyncStorage
            const dadosAtuais = await AsyncStorage.getItem('Storage');
            // const db = dadosAtuais ? JSON.parse(dadosAtuais) : [];
            console.log(dadosAtuais+dadosAtuais.length)
            
            if(dadosAtuais === "" || dadosAtuais === null){
                array.push(<View>
                    <Text>Suas anotações aparecerão aqui.</Text>
                </View>)
                setView(array)
            }else{
                const infos = JSON.parse(dadosAtuais)
                console.log(infos.length)
            for(var i=0;i<infos.length;i++){
                console.log("rodou"+infos[i].titulo)
                array.push(
                    <View style={{flex:1,backgroundColor:"#FFFFFF",justifyContent:"center",alignItems:"center",margin:120}}>
                        <Text style={{color:"red"}}>{infos[i].titulo}</Text>
                        <Text>{infos[i].texto}</Text>
                    </View>
                )
            }
        
            setView(array)
            }
        
        
        
        } catch (error) {
            console.error('Erro ao obter do AsyncStorage:', error);
          }









        

    }

    




 const getStorage = async () =>{
    try {
        const valor = await AsyncStorage.getItem('Storage');
        if (valor !== null) {
          return valor
        }else{
            await AsyncStorage.setItem('Storage', "");
            return ""
        }
      } catch (e) {
        // error reading value
      }
 }


return(
    <View style={styles.container}>
        {/* <Text>aaaaaaaaa</Text> */}
       {view && view.length > 0 ?(
        <View>
            {view.map((component, index)=>(
            <View key={index}>
                <Text>{component}</Text>
            </View>
        ))}
        </View>
       ):(
        <View>
            <Text style={styles.text}>Suas anotações aparecerão aqui.</Text>
        </View>
       )}
    </View>
)

}export default MostrarNota


const styles = StyleSheet.create({
    container:{
        width:"80%",
        // backgroundColor:"#FFFFFF"
    },
    text:{
        color:"#FFFFFF"
    }
})