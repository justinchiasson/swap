import { Input, Text, useTheme } from '@ui-kitten/components';
import React, { useState } from 'react';
import { Animated, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

import { countries, Country } from '../../utils/countries';

interface CountryCodeProps {
  /**
   * Function to set the country
   */
  setSelectedCallback: React.Dispatch<React.SetStateAction<string>>;
}

const CountryDropdown = ({ setSelectedCallback }: CountryCodeProps) => {
  const theme = useTheme();
  const [expanded, setExpanded] = useState(false);
  const [search, setSearch] = useState('');
  const [filteredCountries, setFilteredCountries] = useState(countries);
  const [selectedCountryName, setSelectedCountryName] = useState('');

  const slideAnim = React.useRef(new Animated.Value(90)).current;

  const styles = StyleSheet.create({
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '75%',
    },
    container: {
      width: '100%',
    },
    selectedContainer: {
      padding: 10,
      flexDirection: 'row',
      minWidth: '20%',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderWidth: 1,
      borderColor: theme['text-basic-color'],
      borderRadius: 8,
      backgroundColor: 'white',
    },
    valuesContainer: {
      borderColor: theme['text-basic-color'],
      borderTopWidth: 1,
      maxHeight: 235,
      minWidth: '100%',
      marginTop: 8,
    },
    countryContainer: {
      flexDirection: 'row',
      paddingHorizontal: 15,
      paddingVertical: 13,
      borderTopWidth: 1,
      borderColor: theme['text-basic-color'],
      alignItems: 'center',
    },
    countryContainerFirst: {
      flexDirection: 'row',
      paddingHorizontal: 15,
      paddingVertical: 13,
      alignItems: 'center',
    },
    countryFlag: {
      marginRight: 8,
      color: 'black',
    },
    countryText: {
      fontWeight: 'bold',
    },
    inputBoxContainer: {
      width: '100%',
      borderWidth: 1,
      borderColor: theme['text-basic-color'],
      borderRadius: 8,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    icon: {
      width: 10,
      height: 10,
    },
    card: {
      // backgroundColor: theme['color-basic-500'],
      // borderRadius: 10,
      // borderColor: theme['text-basic-color'],
      // borderWidth: 1,
      minWidth: '100%',
    },
    label: {
      color: theme['color-info-500'],
      marginTop: 15,
      marginLeft: 15,
    },
    input: {
      backgroundColor: theme['color-basic-500'],
      borderWidth: 0,
      marginHorizontal: 5,
      marginTop: -2,
    },
    inputText: {
      fontFamily: 'PlusJakartaSans_500Medium',
    },
  });

  const slideDown = () => {
    setExpanded(true);
    Animated.timing(slideAnim, {
      toValue: 250,
      duration: 1200,
      useNativeDriver: false,
    }).start();
  };

  const slideUp = () => {
    Animated.timing(slideAnim, {
      toValue: 90,
      duration: 600,
      useNativeDriver: false,
    }).start(() => setExpanded(false));
  };

  const searchCountry = (country: string) => {
    if (!expanded) {
      slideDown();
      setExpanded(true);
    }
    setSearch(country);
    filterCountries(country);
  };

  const filterCountries = (country: string) => {
    const listOfFilteredCountries = countries.filter((item) => {
      return item.name.includes(country);
    });
    setFilteredCountries(listOfFilteredCountries);
  };

  const onCardFocus = () => {
    filterCountries(search);
    slideDown();
  };

  const onInputBlur = () => {
    setSearch(selectedCountryName);
    slideUp();
  };

  const renderButton = () => {
    return (
      <Animated.View
        style={{
          maxHeight: slideAnim,
          width: '75%',
          marginBottom: 15,
          alignSelf: 'center',
          overflow: 'hidden',
          borderRadius: 10,
          borderColor: theme['text-basic-color'],
          borderWidth: 1,
        }}
      >
        <TouchableOpacity style={styles.card} onPress={() => onCardFocus()}>
          <Text category="h6" style={styles.label}>
            Location
          </Text>
          <Input
            onChangeText={searchCountry}
            value={search}
            placeholder="Search for a country"
            style={styles.input}
            textStyle={styles.inputText}
            selectionColor={theme['text-basic-color']}
            onFocus={() => onCardFocus()}
            onBlur={() => onInputBlur()}
          />
          {expanded && (
            <FlatList
              data={filteredCountries}
              style={styles.valuesContainer}
              showsVerticalScrollIndicator={false}
              renderItem={renderCountryItem}
              keyExtractor={(item) => item.code}
              ListEmptyComponent={
                <Text style={{ padding: 15, textAlign: 'center' }}>
                  No Result Found
                </Text>
              }
            />
          )}
        </TouchableOpacity>
      </Animated.View>
    );
  };

  const renderCountryItem = ({ item }: { item: Country }) => {
    const isFirst = filteredCountries.indexOf(item) === 0;

    return (
      <TouchableOpacity
        style={isFirst ? styles.countryContainerFirst : styles.countryContainer}
        key={item.code}
        onPress={() => {
          setSelectedCallback(item.code);
          setSelectedCountryName(item.name);
          setSearch(item.name);
          slideUp();
        }}
      >
        <Text style={styles.countryFlag}>{item?.flag}</Text>
        <Text style={styles.countryText}>{item?.name}</Text>
      </TouchableOpacity>
    );
  };

  return renderButton();
};

export default CountryDropdown;

/* MIT License

Copyright (c) 2023 mmusaib

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE. */

// The above license is sourced from https://github.com/mmusaib/react-native-dropdown-country-picker
// and applies solely to the code provided in this file.
