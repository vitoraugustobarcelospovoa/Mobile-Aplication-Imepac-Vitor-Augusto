import React, { useState } from 'react';
import {
  View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Modal, Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Importe as imagens diretamente
import registro from "../../assets/registro-de-usuario.png";
import listaBeneficiario from "../../assets/lista-beneficiario.png";
import cadastroBeneficiario from "../../assets/beneficiario.png";
import listaUsuarios from "../../assets/user-img.png"; 

export default function HomePage({ usuario, onLogout }) {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const navigation = useNavigation();

  const cards = [
    { label: "Usuários", img: listaUsuarios, nav: 'Cadastro' },
    { label: "Lista de Usuários", img: registro, nav: 'Usuarios' }, // <-- NOVO CARD
    { label: "Beneficiários", img: listaBeneficiario, nav: 'Beneficiarios' },
    { label: "Cadastro de Beneficiário", img: cadastroBeneficiario, nav: 'BeneficiarioCadastro' },
  ];

  return (
    <View style={styles.root}>
      <View style={styles.topbar}>
        <TouchableOpacity
          style={styles.userTrigger}
          onPress={() => setDropdownVisible(true)}
          activeOpacity={0.7}
        >
          <View style={styles.circle} />
          <Text style={styles.username}>{usuario?.username || 'Usuário'}</Text>
        </TouchableOpacity>
      </View>
      <Modal
        visible={dropdownVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setDropdownVisible(false)}
      >
        <TouchableOpacity
          style={styles.dropdownOverlay}
          activeOpacity={1}
          onPressOut={() => setDropdownVisible(false)}
        >
          <View style={styles.dropdown}>
            <TouchableOpacity
              onPress={() => {
                setDropdownVisible(false);
                navigation.navigate('Perfil');
              }}
              style={styles.dropdownItem}
            >
              <Text>👤 Perfil</Text>
            </TouchableOpacity>
            <View style={styles.separatorThin} />
            <TouchableOpacity
              onPress={() => {
                setDropdownVisible(false);
                onLogout && onLogout();
              }}
              style={styles.dropdownItem}
            >
              <Text>🚪 Logout</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.container}>
          <Text style={styles.sectionTitle}>Menu</Text>
          <View style={styles.cardsRow}>
            {cards.map((item, i) => (
              <TouchableOpacity
                key={i}
                style={styles.card}
                activeOpacity={0.8}
                onPress={() => navigation.navigate(item.nav)}
              >
                <Image source={item.img} style={styles.cardImg} />
                <Text style={styles.cardText}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
      <View style={styles.footer}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#fff" },
  topbar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3
  },
  userTrigger: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 10
  },
  circle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: "#e0e7ef",
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  username: {
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: Platform.OS === 'ios' ? 'Roboto' : undefined
  },
  dropdownOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.09)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  dropdown: {
    marginTop: 50,
    marginRight: 20,
    backgroundColor: '#fff',
    borderRadius: 6,
    minWidth: 140,
    padding: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.13,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  dropdownItem: {
    paddingVertical: 8,
    paddingHorizontal: 8,
    fontSize: 15,
    borderRadius: 4,
  },
  separatorThin: {
    height: 1,
    backgroundColor: '#e5e5e5',
    marginVertical: 3,
    borderRadius: 2,
  },
  container: {
    flex: 1,
    paddingBottom: 16,
    paddingTop: 12,
    paddingHorizontal: 10,
    backgroundColor: '#fff'
  },
  sectionTitle: {
    fontSize: 22,
    marginBottom: 14,
    fontWeight: 'bold',
    fontFamily: Platform.OS === 'ios' ? 'Roboto' : undefined
  },
  cardsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 18,
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  card: {
    width: 112,
    alignItems: 'center',
    backgroundColor: "#f7fafc",
    padding: 12,
    borderRadius: 12,
    marginRight: 10,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#6eb1ca',
    shadowOpacity: 0.09,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 5,
  },
  cardImg: {
    width: 70,
    height: 70,
    marginBottom: 10,
    borderRadius: 10,
    resizeMode: 'contain'
  },
  cardText: {
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'center'
  },
  footer: {
    height: 40,
    backgroundColor: '#6eb1ca',
    width: '100%',
  },
  scrollContent: {
    paddingBottom: 40
  }
});