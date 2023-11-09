import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AddNota from './src/add_nota';
import MostrarNota from './src/mostrar_nota';

export default function App() {

  const [addNota, setAddNota] = useState(false)


  return (
    <View style={styles.container}>

      {addNota ? (
        <View>
          <View style={styles.button_voltar}>
            <TouchableOpacity onPress={() => setAddNota(false)}>
              <Text style={styles.text_voltar}>Voltar</Text>
            </TouchableOpacity>
          </View>
          <AddNota />

        </View>
      ) : (
        <View>
          <View >
            <TouchableOpacity style={styles.button_add_nota} onPress={() => setAddNota(true)}>
              <Text style={styles.text_add_nota}>Adicionar Nota</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.mostrar_nota_view}>
            <MostrarNota />
          </View>
        </View>
      )
      }
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
  mostrar_nota_view:{
    marginTop:"20%",
    alignItems:"center",
    justifyContent:"center",
    width:"80%"
  }

});
