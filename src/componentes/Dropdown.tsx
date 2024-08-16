import React, { useState } from "react";
import { Alert, FlatList, I18nManager, Image, Modal, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TouchableHighlight, View } from "react-native";
import Colors from "../constants/Colors";
import { TouchableOpacity, TouchableWithoutFeedback } from "react-native-gesture-handler";
import Button from "./Button";

const img_down = require('../assets/images/down.png');

const Dropdown = (props: any) => {
  const {
    items = [
      { label: 'Item 01', value: '01' }, { label: 'Item 02', value: '02' }, { label: 'Item 03', value: '03' }, { label: 'Item 04', value: '04' }, { label: 'Item 05', value: '05' }, 
      { label: 'Item 06', value: '06' }, { label: 'Item 07', value: '07' }, { label: 'Item 08', value: '08' }, { label: 'Item 09', value: '09' }, { label: 'Item 10', value: '10' }],
    selectedItem = null,
    placeholder = 'Selecione...',
    width = 200,
    height = 35,
    onChangeItem = null,
  } = props;

  const [isModalVisible, setModalVisible] = useState(false);
  const [currentValue, setCurrentValue] = useState(null);

  const _renderContentModal = () => {
    return (
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          {_renderListItens()}
        </View>
        <View style={styles.content}>
          <Button label="Fechar" onClick={() => setModalVisible(false)}></Button>
        </View>
      </View>
    );
  };

  const _renderListItens = () => {
    if (!isModalVisible) return;
    return (
      <ScrollView>
        {items.map((item: any) => { return (_renderItem(item)); })}
      </ScrollView>
    );
  }

  const _renderItem = (item: any) => {
    const isSelected = (currentValue === item.value);
    return (
      <Pressable key={item.value} onPress={() => _selectItem(item)}>
        <View style={StyleSheet.flatten([isSelected && styles.textItemSelected, styles.item])}>
          <Text style={StyleSheet.flatten([isSelected ? styles.textItemSelected : styles.textItem])}>{item.label}</Text>
        </View>
      </Pressable>
    );
  };

  const _selectItem = (item: any) => {
    setCurrentValue(item.value);
    onChangeItem(item);
    setModalVisible(false);
  };

  return (
    <View>

      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <View style={StyleSheet.flatten([styles.dropdown, { minWidth: width, height: height },])}>
          <Text style={styles.textItem}>
            {selectedItem !== null ? selectedItem.label : placeholder}
          </Text>
          <Image source={img_down} style={styles.icon} />
        </View>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        {_renderContentModal()}
      </Modal>
    </View>
  );

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: '#fff'
  },
  content: {
    marginVertical: 20,
    marginLeft: 10,
    marginRight: 10
  },
  modalContent: {
    width: '80%',
    height: '50%',
    backgroundColor: Colors.bgColorDropbox,
    borderRadius: 5,
    padding: 5,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalLista: {
    width: '100%',
  },
  dropdown: {
    flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.bgColorDropbox,
    padding: 5
  },
  textItem: {
    flex: 1,
    fontSize: 16,
    writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr',
    color: Colors.textColorDropbox,
  },
  textItemSelected: {
    flex: 1,
    fontSize: 16,
    writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr',
    color: Colors.textColorDropboxSelected,
    backgroundColor: Colors.bgColorDropboxSelected
  },
  textItemPlaceholder: {
    color: Colors.textColorDropbox
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: Colors.textColorDropbox
  },
  item: {
    padding: 10,
    flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#cecece'
  },
});
export default Dropdown;