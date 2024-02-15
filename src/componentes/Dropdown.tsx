import React, { useCallback, useEffect, useRef, useState } from "react";
import { FlatList, I18nManager, Image, Modal, StyleSheet, Text, TouchableHighlight, TouchableWithoutFeedback, View, ViewStyle } from "react-native";
import Colors from "../constants/Colors";
import { Int32 } from "react-native/Libraries/Types/CodegenTypes";

const img_down = require('../assets/images/down.png');

const _ = require('lodash');

const Dropdown = (props) => {
  const {
    data = [],
    labelField = "label",
    valueField = "value",
    valueItem = "",
    placeholder = 'Selecione...',
    width = 'auto',
    height = 35,
    onChange = null,
    dropdownPosition = true,
    activeColor = Colors.bgColorDropbox,
    renderItem,
    showsVerticalScrollIndicator = true,
    disable = false,
  } = props;

  // States
  const [visible, setVisible] = useState<boolean>(false);
  const [currentValue, setCurrentValue] = useState<any>(null);
  const [listData, setListData] = useState<any[]>(data);

  const ref = useRef<View>(null);
  const refList = useRef<FlatList>(null);

  const getValue = useCallback(() => {
    const defaultValue = typeof valueItem === 'object' ? _.get(valueItem, valueField) : valueItem;
    const getItem = data.filter((item: any) =>
      _.isEqual(defaultValue, _.get(item, valueField))
    );
    if (getItem.length > 0) {
      setCurrentValue(getItem[0]);
    } else {
      setCurrentValue(null);
    }
  }, [data, valueItem, valueField]);

  useEffect(() => {
    getValue();
  }, [valueItem, data, getValue]);

  const scrollIndex = useCallback(() => {
    if (data.length > 0 && listData.length === data.length) {
      setTimeout(() => {
        if (refList && refList?.current) {
          const defaultValue = typeof valueItem === 'object' ? _.get(valueItem, valueField) : valueItem;
          const index = _.findIndex(listData, (item: any) =>
            _.isEqual(defaultValue, _.get(item, valueField))
          );
          if (index > -1 && index <= listData.length - 1) {
            refList?.current?.scrollToIndex({
              index: index,
              animated: false,
            });
          }
        }
      }, 200);
    }
  }, [data.length, listData, valueItem, valueField]);

  const showOrClose = useCallback(() => {
    setVisible(!visible);
    setListData(data);
    scrollIndex();
  }, [visible, data, scrollIndex]);

  const eventClose = useCallback(() => {
    if (!disable) {
      setVisible(false);
    }
  }, [disable]);

  const _renderDropdown = () => {
    const isSelected = currentValue && _.get(currentValue, valueField);
    return (
      <TouchableWithoutFeedback onPress={showOrClose}>
        <View style={StyleSheet.flatten([styles.dropdown, { minWidth: width, height: height },])}>
          <Text style={styles.textItem}>
            {isSelected !== null ? _.get(currentValue, labelField) : placeholder}
          </Text>
          <Image source={img_down} style={styles.icon} />
        </View>
      </TouchableWithoutFeedback>
    );
  };

  const _renderItem = useCallback(
    ({ item, index }: { item: any; index: number }) => {
      const isSelected = currentValue && _.get(currentValue, valueField);
      const selected = _.isEqual(_.get(item, valueField), isSelected);
      _.assign(item, { _index: index });
      return (
        <TouchableHighlight key={index.toString()} underlayColor={activeColor} onPress={() => onSelect(item)}>
          <View style={StyleSheet.flatten([selected && styles.textItemSelected])}>
            {renderItem ? (renderItem(item, selected)) :
              (
                <View style={styles.item}>
                  <Text style={StyleSheet.flatten([selected ? styles.textItemSelected : styles.textItem])}>
                    {_.get(item, labelField)}
                  </Text>
                </View>
              )}
          </View>
        </TouchableHighlight>
      );
    },
    [activeColor, currentValue, labelField, renderItem, valueField]
  );

  const _renderList = useCallback(
    (isTopPosition: boolean) => {
      const _renderListHelper = () => {
        return (
          <FlatList
            keyboardShouldPersistTaps="handled"
            ref={refList}
            onScrollToIndexFailed={scrollIndex}
            data={listData}
            inverted={isTopPosition}
            renderItem={_renderItem}
            keyExtractor={(_item, index) => index.toString()}
            showsVerticalScrollIndicator={showsVerticalScrollIndicator}
          />
        );
      };

      return (
        <TouchableWithoutFeedback>
          <View style={styles.flexShrink}>
            {_renderListHelper()}
          </View>
        </TouchableWithoutFeedback>
      );
    }, [_renderItem, listData, scrollIndex, showsVerticalScrollIndicator,]
  );

  const onSelect = useCallback(
    (item: any) => {
      setCurrentValue(item);
      onChange(item);
      eventClose();
    },
    [eventClose, onChange]
  );

  const _renderModal = useCallback(() => {

    if (!visible) {
      return null;
    }

    const top = 50; 
    const bottom = 20;

    const onAutoPosition = () => {
      return bottom < 100;
    };

    const isTopPosition =
      dropdownPosition === 'auto' ? onAutoPosition() : dropdownPosition === 'top';

    let extendHeight = !isTopPosition ? top : bottom;

    return (
      <Modal
        transparent
        statusBarTranslucent
        visible={visible}
        supportedOrientations={['landscape', 'portrait']}
        onRequestClose={showOrClose}>
        <TouchableWithoutFeedback onPress={showOrClose}>
          <View style={StyleSheet.flatten([styles.modal])}>
            <View style={StyleSheet.flatten([styles.modal, !isTopPosition ? { paddingTop: extendHeight } : { justifyContent: 'flex-end', paddingBottom: extendHeight, }])}>
                {_renderList(isTopPosition)}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );

  }, [visible, dropdownPosition, showOrClose, _renderList,]);

  return (
    <View style={styles.main} ref={ref}>
      {_renderDropdown()}
      {_renderModal()}
    </View>
  );

};

const styles = StyleSheet.create({
  main: {
    justifyContent: 'center',
  },
  flexShrink: {
    flexShrink: 1,
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
    fontSize: 18,
    writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr',
    color: Colors.textColorDropbox,
  },
  textItemSelected: {
    flex: 1,
    fontSize: 18,
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
  modal: {
    flex: 1,
    backgroundColor: Colors.bgColorDropbox
  },
  fullScreen: {
    alignItems: 'center',
    justifyContent: 'center',
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