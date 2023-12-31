import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AddNota from './src/add_nota';
import MostrarNota from './src/mostrar_nota';
import ModificarNota from './src/mod_nota';

export default function App() {

  const [Tela, setTela] = useState("SHOW_NOTA")
  const [NotaPosi, setNotaPosi] = useState(0)

  const ModState = async (valor) =>{
    setTela(valor)
  }
  const SetNotaMod = async (valor) =>{
    setNotaPosi(valor)
  }

  return (
    <View style={styles.container}>
      
      {Tela === "ADD_NOTA" ? (
        <View>
          <AddNota ModState={ModState}/>
        </View>
      ): Tela === "SHOW_NOTA" ? (
        <View>
            <MostrarNota Tela={Tela} ModState={ModState} SetNotaMod={SetNotaMod}/>
        </View>
      ):(
        <ModificarNota NotaPosi={NotaPosi} ModState={ModState}/>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: "5%",
    flex: 1,
    backgroundColor: '#101010',
  },
  button_add_nota: {
    width: "25%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1D0032",
    padding: 3,
    marginTop: "5%",
    position: "absolute",
    marginLeft: "5%",
    borderRadius: 50
  },
  text_add_nota: {
    color: "#FFF",
    fontSize: 16
  },
  button_voltar: {
    justifyContent: "center",
    alignItems: "center",
    width: "18%",
    backgroundColor: "#1D0032",
    padding: 3,
    marginTop: "5%",
    marginLeft: "5%",
    borderRadius: 50
  },
  text_voltar: {
    color: "#FFF",
    fontSize: 20
  },
  mostrar_nota_view: {
    marginTop: "20%",
    alignItems: "center",
    justifyContent: "center",
    width: "80%"
  }
});
