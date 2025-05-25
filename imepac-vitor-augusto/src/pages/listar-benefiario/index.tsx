import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';

export default function ListaBeneficiarios({ navigation }) {
  const [beneficiarios, setBeneficiarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    buscarBeneficiarios();
  }, []);

  async function buscarBeneficiarios() {
    try {
      const response = await axios.get('http://192.168.195.71:8080/api/beneficiarios'); // Troque pelo seu IP/endpoint real
      setBeneficiarios(response.data);
    } catch (err) {
      setErro('Erro ao buscar beneficiários');
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
        <TouchableOpacity onPress={buscarBeneficiarios} style={styles.retryBtn}>
          <Text style={{ color: '#27698b' }}>Tentar Novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Beneficiários</Text>
      <FlatList
        data={beneficiarios}
        keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.nome}>{item.nomeFantasia || item.nomeRazaoSocial || item.nome}</Text>
            <Text style={styles.cnpj}>CNPJ/CPF: {item.cnpjCpf}</Text>
            <Text style={styles.cnpj}>{[item.endereco, item.bairro, item.cidade].filter(Boolean).join(', ') + (item.uf ? ' - ' + item.uf : '') + (item.cep ? ' - CEP: ' + item.cep : '')}
</Text>
            {/* Adicione mais campos se quiser */}
          </View>
        )}
        ListEmptyComponent={
          <Text style={{ color: "#888", alignSelf: 'center', marginTop: 30 }}>Nenhum beneficiário cadastrado.</Text>
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
  cnpj: { color: "#666", marginTop: 3 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  retryBtn: { marginTop: 20, padding: 10 }
});