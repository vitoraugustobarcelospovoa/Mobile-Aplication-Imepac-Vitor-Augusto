import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';

export default function ListaUsuarios({ navigation }) {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    buscarUsuarios();
  }, []);

  async function buscarUsuarios() {
    try {
      const response = await axios.get('http://192.168.195.71:8080/api/usuarios'); // Troque pelo seu endpoint real!
      setUsuarios(response.data);
    } catch (err) {
      setErro('Erro ao buscar usuários');
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <ActivityIndicator size="large" color="#27698b" style={{ marginTop: 50 }} />;
  }

  if (erro) {
    return (
      <View style={styles.center}>
        <Text style={{ color: 'red' }}>{erro}</Text>
        <TouchableOpacity onPress={buscarUsuarios} style={styles.retryBtn}>
          <Text style={{ color: '#27698b' }}>Tentar Novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Usuários</Text>
      <FlatList
        data={usuarios}
        keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.nome}>{item.nome}</Text>
            <Text style={styles.email}>E-mail: {item.email}</Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={{ color: "#888", alignSelf: 'center', marginTop: 30 }}>Nenhum usuário cadastrado.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 18, paddingTop: 30 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 18, color: "#27698b" },
  card: {
    backgroundColor: "#f7fafc",
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  nome: { fontWeight: 'bold', fontSize: 18, color: '#333' },
  email: { color: "#666", marginTop: 3 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  retryBtn: { marginTop: 20, padding: 10 }
});