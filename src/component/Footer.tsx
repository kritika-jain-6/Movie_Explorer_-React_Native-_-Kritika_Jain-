import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';

const Footer = () => {
  return (
    <View style={styles.footer}>
     
      <Text style={styles.footerText} testID="footer-text">
        Follow Movie Explorer on social
      </Text>

      <View style={styles.iconContainer}>
        
        <Image
          source={{ uri: 'https://i.pinimg.com/736x/cd/ab/36/cdab36e9fa618a661e7c208efde0461c.jpg' }}
          style={styles.icon}
          testID="icon-1"
        />
        <Image
          source={{ uri: 'https://i.pinimg.com/736x/8c/98/fb/8c98fbcd5ae391c4f2fc47bef0be2b5f.jpg' }}
          style={styles.icon}
          testID="icon-2"
        />
        <Image
          source={{ uri: 'https://i.pinimg.com/736x/b2/68/83/b268838fe5a0c0ca504c2fc103843ae3.jpg' }}
          style={styles.icon}
          testID="icon-3"
        />
        <Image
          source={{ uri: 'https://i.pinimg.com/736x/4f/74/7e/4f747ed96769c0d8a939f98ad23f371b.jpg' }}
          style={styles.icon}
          testID="icon-4"
        />
      </View>
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  footer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  footerText: {
    color: '#ccc',
    fontWeight: 'bold',
    fontSize: 18,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  icon: {
    width: 50,
    height: 40,
    
  },
});
