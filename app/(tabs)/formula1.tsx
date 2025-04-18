import { StyleSheet, Image, View } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function TabThreeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#ECECEC', dark: '#202020' }}
      headerImage={
        <Image
          source={require('@/assets/images/f1-logo.png')}
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Fórmula 1</ThemedText>
      </ThemedView>
      <ThemedText>Listagem de equipes e pilotos da Temporada 2025</ThemedText>
      
      <Collapsible title="Ferrari">
        <View style={styles.container}>
          <View style={styles.leftContainer}>
            <Image source={require('@/assets/images/charles-leclerc.png')} style={styles.image} />
            <ThemedText style={styles.name} type="defaultSemiBold">Charles Leclerc</ThemedText>
          </View>

          <View style={styles.rightContainer}>
            <Image source={require('@/assets/images/lewis-hamilton.png')} style={styles.image} />
            <ThemedText style={styles.name} type="defaultSemiBold">Lewis Hamilton</ThemedText>
          </View>
        </View>
      </Collapsible>

      <Collapsible title="McLaren">
        <View style={styles.container}>
          <View style={styles.leftContainer}>
            <Image source={require('@/assets/images/lando-norris.png')} style={styles.image} />
            <ThemedText style={styles.name} type="defaultSemiBold">Lando Norris</ThemedText>
          </View>

          <View style={styles.rightContainer}>
            <Image source={require('@/assets/images/oscar-piastri.png')} style={styles.image} />
            <ThemedText style={styles.name} type="defaultSemiBold">Oscar Piastri</ThemedText>
          </View>
        </View>
      </Collapsible>

      <Collapsible title="Red Bull Racing">
        <View style={styles.container}>
          <View style={styles.leftContainer}>
            <Image source={require('@/assets/images/max-verstappen.png')} style={styles.image} />
            <ThemedText style={styles.name} type="defaultSemiBold">Max Verstappen</ThemedText>
          </View>

          <View style={styles.rightContainer}>
            <Image source={require('@/assets/images/yuki-tsunoda.png')} style={styles.image} />
            <ThemedText style={styles.name} type="defaultSemiBold">Yuki Tsunoda</ThemedText>
          </View>
        </View>
      </Collapsible>

      <Collapsible title="Mercedes">
        <View style={styles.container}>
          <View style={styles.leftContainer}>
            <Image source={require('@/assets/images/george-russell.png')} style={styles.image} />
            <ThemedText style={styles.name} type="defaultSemiBold">George Russell</ThemedText>
          </View>

          <View style={styles.rightContainer}>
            <Image source={require('@/assets/images/kimi-antonelli.png')} style={styles.image} />
            <ThemedText style={styles.name} type="defaultSemiBold">Kimi Antonelli</ThemedText>
          </View>
        </View>
      </Collapsible>

      <Collapsible title="Aston Martin">
        <View style={styles.container}>
          <View style={styles.leftContainer}>
            <Image source={require('@/assets/images/fernando-alonso.png')} style={styles.image} />
            <ThemedText style={styles.name} type="defaultSemiBold">Fernando Alonso</ThemedText>
          </View>

          <View style={styles.rightContainer}>
            <Image source={require('@/assets/images/lance-stroll.png')} style={styles.image} />
            <ThemedText style={styles.name} type="defaultSemiBold">Lance Stroll</ThemedText>
          </View>
        </View>
      </Collapsible>

      <Collapsible title="Alpine">
        <View style={styles.container}>
          <View style={styles.leftContainer}>
            <Image source={require('@/assets/images/pierre-gasly.png')} style={styles.image} />
            <ThemedText style={styles.name} type="defaultSemiBold">Pierre Gasly</ThemedText>
          </View>

          <View style={styles.rightContainer}>
            <Image source={require('@/assets/images/jack-doohan.png')} style={styles.image} />
            <ThemedText style={styles.name} type="defaultSemiBold">Jack Doohan</ThemedText>
          </View>
        </View>
      </Collapsible>

      <Collapsible title="Haas">
        <View style={styles.container}>
          <View style={styles.leftContainer}>
            <Image source={require('@/assets/images/esteban-ocon.png')} style={styles.image} />
            <ThemedText style={styles.name} type="defaultSemiBold">Esteban Ocon</ThemedText>
          </View>

          <View style={styles.rightContainer}>
            <Image source={require('@/assets/images/oliver-bearman.png')} style={styles.image} />
            <ThemedText style={styles.name} type="defaultSemiBold">Oliver Bearman</ThemedText>
          </View>
        </View>
      </Collapsible>

      <Collapsible title="RB">
        <View style={styles.container}>
          <View style={styles.leftContainer}>
            <Image source={require('@/assets/images/liam-lawson.png')} style={styles.image} />
            <ThemedText style={styles.name} type="defaultSemiBold">Liam Lawson</ThemedText>
          </View>

          <View style={styles.rightContainer}>
            <Image source={require('@/assets/images/isack-hadjar.png')} style={styles.image} />
            <ThemedText style={styles.name} type="defaultSemiBold">Isack Hadjar</ThemedText>
          </View>
        </View>
      </Collapsible>

      <Collapsible title="Williams">
        <View style={styles.container}>
          <View style={styles.leftContainer}>
            <Image source={require('@/assets/images/carlos-sainz.png')} style={styles.image} />
            <ThemedText style={styles.name} type="defaultSemiBold">Carlos Sainz</ThemedText>
          </View>

          <View style={styles.rightContainer}>
            <Image source={require('@/assets/images/alexander-albon.png')} style={styles.image} />
            <ThemedText style={styles.name} type="defaultSemiBold">Alexander Albon</ThemedText>
          </View>
        </View>
      </Collapsible>

      <Collapsible title="Sauber">
        <View style={styles.container}>
          <View style={styles.leftContainer}>
            <Image source={require('@/assets/images/gabriel-bortoleto.png')} style={styles.image} />
            <ThemedText style={styles.name} type="defaultSemiBold">Gabriel Bortoleto</ThemedText>
          </View>

          <View style={styles.rightContainer}>
            <Image source={require('@/assets/images/niko-hulkenberg.png')} style={styles.image} />
            <ThemedText style={styles.name} type="defaultSemiBold">Nico Hulkenberd</ThemedText>
          </View>
        </View>
      </Collapsible>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    bottom: 10,
    position: 'absolute',
    height: 50,
    width: 200
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginVertical: 10
  },
  leftContainer: {
    alignItems: 'center',
    width: '45%'
  },
  rightContainer: {
    alignItems: 'center',
    width: '45%'
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 60,
    marginBottom: 5
  },
  name: {
    textAlign: 'center'
  },
});
