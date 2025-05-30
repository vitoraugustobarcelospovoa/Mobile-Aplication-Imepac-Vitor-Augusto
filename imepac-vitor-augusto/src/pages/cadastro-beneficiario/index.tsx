import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, Alert, ScrollView, ActivityIndicator, Switch } from 'react-native';
import axios from 'axios';
import { TextInputMask } from 'react-native-masked-text';

export default function CadastroBeneficiario() {
  const [isPJ, setIsPJ] = useState(true); // true = CNPJ/PJ, false = CPF/PF
  const [cnpjCpf, setCnpjCpf] = useState('');
  const [razaoSocial, setRazaoSocial] = useState('');
  const [nomeFantasia, setNomeFantasia] = useState('');
  const [endereco, setEndereco] = useState('');
  const [cep, setCep] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [uf, setUf] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [observacoes, setObservacoes] = useState('');
  const [carregando, setCarregando] = useState(false);

  const buscarCNPJ = async () => {
    if (!isPJ) return;
    const cnpjLimpo = cnpjCpf.replace(/\D/g, '');
    if (cnpjLimpo.length !== 14) {
      Alert.alert('CNPJ inválido', 'Digite um CNPJ válido com 14 dígitos.');
      return;
    }

    try {
      setCarregando(true);
      const response = await axios.get(`https://www.receitaws.com.br/v1/cnpj/${cnpjLimpo}`);
      const data = response.data;

      if (data.status === 'ERROR') {
        Alert.alert('Erro', data.message || 'Erro ao consultar CNPJ.');
      } else {
        setRazaoSocial(data.nome || '');
        setNomeFantasia(data.fantasia || '');
        setEndereco(data.logradouro || '');
        setCep(data.cep || '');
        setBairro(data.bairro || '');
        setCidade(data.municipio || '');
        setUf(data.uf || '');
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível buscar os dados do CNPJ.');
    } finally {
      setCarregando(false);
    }
  };

  const salvar = async () => {
    const docLimpo = cnpjCpf.replace(/\D/g, '');
    if (isPJ && docLimpo.length !== 14) {
      return Alert.alert('CNPJ inválido', 'Digite um CNPJ válido.');
    }
    if (!isPJ && docLimpo.length !== 11) {
      return Alert.alert('CPF inválido', 'Digite um CPF válido.');
    }

    try {
      await axios.post('http://192.168.1.23:8080/api/beneficiarios', {
        cnpjCpf: cnpjCpf.replace(/\D/g, ''), 
        nomeRazaoSocial: razaoSocial,
        nomeFantasia,
        PF_PJ: isPJ,
        endereco,
        cep,
        bairro,
        cidade,
        uf,
        telefone,
        email,
        observacoes,
      });

      Alert.alert('Sucesso', 'Beneficiário cadastrado!');
      // Limpar formulário se quiser:
      // setCnpjCpf(''); setRazaoSocial(''); ... etc
    } catch (error) {
      let errorMsg = 'Erro desconhecido';
      const data = error.response?.data;
      if (typeof data === 'string') {
        errorMsg = data;
      } else if (data && typeof data === 'object' && data.message) {
        errorMsg = data.message;
      } else if (data && typeof data === 'object') {
        errorMsg = JSON.stringify(data);
      }
      Alert.alert('Erro ao salvar', errorMsg);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>Pessoa Jurídica (CNPJ)</Text>
<Switch
  value={isPJ}
  onValueChange={(value) => {
    setIsPJ(value);
    setCnpjCpf(''); // Limpa o campo ao alternar tipo
  }}
/>        <Text style={styles.switchLabel}>Pessoa Física (CPF)</Text>
      </View>

      <Text style={styles.label}>{isPJ ? 'CNPJ' : 'CPF'}</Text>
      <TextInputMask
        type={isPJ ? 'cnpj' : 'cpf'}
        value={cnpjCpf}
        onChangeText={setCnpjCpf}
        style={styles.input}
        onBlur={isPJ ? buscarCNPJ : undefined}
        placeholder={isPJ ? '00.000.000/0000-00' : '000.000.000-00'}
        keyboardType="numeric"
      />

      {carregando && <ActivityIndicator size="small" color="#0000ff" />}

      <Text style={styles.label}>{isPJ ? 'Razão Social' : 'Nome Completo'}</Text>
      <TextInput value={razaoSocial} onChangeText={setRazaoSocial} style={styles.input} />

      {isPJ && (
        <>
          <Text style={styles.label}>Nome Fantasia</Text>
          <TextInput value={nomeFantasia} onChangeText={setNomeFantasia} style={styles.input} />
        </>
      )}

      <Text style={styles.label}>Endereço</Text>
      <TextInput value={endereco} onChangeText={setEndereco} style={styles.input} />

      <Text style={styles.label}>CEP</Text>
      <TextInputMask
        type={'zip-code'}
        value={cep}
        onChangeText={setCep}
        style={styles.input}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Bairro</Text>
      <TextInput value={bairro} onChangeText={setBairro} style={styles.input} />

      <Text style={styles.label}>Cidade</Text>
      <TextInput value={cidade} onChangeText={setCidade} style={styles.input} />

      <Text style={styles.label}>UF</Text>
      <TextInput value={uf} onChangeText={setUf} style={styles.input} maxLength={2} />

      <Text style={styles.label}>Telefone</Text>
      <TextInput value={telefone} onChangeText={setTelefone} style={styles.input} keyboardType="phone-pad" />

      <Text style={styles.label}>Email</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text style={styles.label}>Observações</Text>
      <TextInput
        value={observacoes}
        onChangeText={setObservacoes}
        style={[styles.input, { height: 80 }]}
        multiline
      />

      <Button title="Salvar" onPress={salvar} color="#4CAF50" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    justifyContent: 'center',
  },
  switchLabel: {
    fontSize: 14,
    marginHorizontal: 5,
    color: '#333',
  },
  label: {
    marginTop: 15,
    marginBottom: 5,
    fontWeight: 'bold',
    fontSize: 16,
  },
  input: {
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
});