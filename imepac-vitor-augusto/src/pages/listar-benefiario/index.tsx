import React, { useState, useEffect } from 'react';
import {
  View, Text, FlatList, ActivityIndicator, StyleSheet,
  TouchableOpacity, TextInput
} from 'react-native';
import axios from 'axios';

export default function ListaBeneficiarios({ navigation }) {
  const [beneficiarios, setBeneficiarios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState(null);

  const [filtroNome, setFiltroNome] = useState('');
  const [filtroCnpj, setFiltroCnpj] = useState('');

  async function buscarBeneficiarios() {
    setLoading(true);
    setErro(null);
    try {
      const response = await axios.get('http://192.168.1.23:8080/api/beneficiarios/buscar', {
        params: {
          nome: filtroNome || undefined,
          cnpjCpf: filtroCnpj || undefined
        }
      });
      setBeneficiarios(response.data);
    } catch (err) {
      setErro('Erro ao buscar beneficiários');
    } finally {
      setLoading(false);
    }
  }

  const limparFiltros = () => {
    setFiltroNome('');
    setFiltroCnpj('');
    setBeneficiarios([]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Beneficiários</Text>

      <TextInput
        placeholder="Filtrar por nome"
        value={filtroNome}
        onChangeText={setFiltroNome}
        style={styles.input}
      />
      <TextInput
        placeholder="Filtrar por CNPJ/CPF"
        value={filtroCnpj}
        onChangeText={setFiltroCnpj}
        style={styles.input}
        keyboardType="numeric"
      />

      <TouchableOpacity onPress={buscarBeneficiarios} style={styles.buscarBtn}>
        <Text style={{ color: '#fff' }}>Buscar</Text>
      </TouchableOpacity>

      {(filtroNome || filtroCnpj) && (
        <TouchableOpacity onPress={limparFiltros} style={styles.clearBtn}>
          <Text style={{ color: '#fff' }}>Limpar Filtros</Text>
        </TouchableOpacity>
      )}

      {loading ? (
        <ActivityIndicator size="large" color="#27698b" style={{ marginTop: 50 }} />
      ) : erro ? (
        <View style={styles.center}>
          <Text style={{ color: 'red' }}>{erro}</Text>
          <TouchableOpacity onPress={buscarBeneficiarios} style={styles.retryBtn}>
            <Text style={{ color: '#27698b' }}>Tentar Novamente</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={beneficiarios}
          keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.nome}>{item.nomeFantasia || item.nomeRazaoSocial || item.nome}</Text>
              <Text style={styles.cnpj}>CNPJ/CPF: {item.cnpjCpf}</Text>
              <Text style={styles.cnpj}>
                {[item.endereco, item.bairro, item.cidade].filter(Boolean).join(', ')
                  + (item.uf ? ' - ' + item.uf : '')
                  + (item.cep ? ' - CEP: ' + item.cep : '')}
              </Text>
            </View>
          )}
          ListEmptyComponent={
            <Text style={{ color: "#888", alignSelf: 'center', marginTop: 30 }}>
              Nenhum beneficiário encontrado com esses filtros.
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
  cnpj: { color: "#666", marginTop: 3 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  retryBtn: { marginTop: 20, padding: 10 }
});
 