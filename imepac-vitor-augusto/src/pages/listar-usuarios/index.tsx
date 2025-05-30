import React, { useState } from 'react';
import {
  View, Text, FlatList, ActivityIndicator, StyleSheet,
  TouchableOpacity, TextInput
} from 'react-native';
import axios from 'axios';

export default function ListaUsuarios({ navigation }) {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState(null);

  const [filtroNome, setFiltroNome] = useState('');
  const [filtroEmail, setFiltroEmail] = useState('');

  async function buscarUsuarios() {
    setLoading(true);
    setErro(null);
    try {
      const response = await axios.get('http://192.168.1.23:8080/api/usuarios/buscar', {
        params: {
          nome: filtroNome || undefined,
          email: filtroEmail || undefined
        }
      });
      setUsuarios(response.data);
    } catch (err) {

    } finally {
      setLoading(false);
    }
  }

  const limparFiltros = () => {
    setFiltroNome('');
    setFiltroEmail('');
    setUsuarios([]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Usuários</Text>

      <TextInput
        placeholder="Filtrar por nome"
        value={filtroNome}
        onChangeText={setFiltroNome}
        style={styles.input}
      />
      <TextInput
        placeholder="Filtrar por email"
        value={filtroEmail}
        onChangeText={setFiltroEmail}
        style={styles.input}
        keyboardType="email-address"
      />

      <TouchableOpacity onPress={buscarUsuarios} style={styles.buscarBtn}>
        <Text style={{ color: '#fff' }}>Buscar</Text>
      </TouchableOpacity>

      {(filtroNome || filtroEmail) && (
        <TouchableOpacity onPress={limparFiltros} style={styles.clearBtn}>
          <Text style={{ color: '#fff' }}>Limpar Filtros</Text>
        </TouchableOpacity>
      )}

      {loading ? (
        <ActivityIndicator size="large" color="#27698b" style={{ marginTop: 50 }} />
      ) : erro ? (
        <View style={styles.center}>
          <Text style={{ color: 'red' }}>{erro}</Text>
          <TouchableOpacity onPress={buscarUsuarios} style={styles.retryBtn}>
            <Text style={{ color: '#27698b' }}>Tentar Novamente</Text>
          </TouchableOpacity>
        </View>
      ) : (
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
            <Text style={{ color: "#888", alignSelf: 'center', marginTop: 30 }}>
              Nenhum usuário encontrado com esses filtros.
            </Text>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 18, paddingTop: 30 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 18, color: "#27698b" },
  input: {
    backgroundColor: "#f1f1f1",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    borderColor: "#ccc",
    borderWidth: 1
  },
  buscarBtn: {
    backgroundColor: "#27698b",
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10
  },
  clearBtn: {
    backgroundColor: "#888",
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15
  },
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
